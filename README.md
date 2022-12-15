# CHECK BACK FOR A COMPLETE PICTURE WILL BE READY BY DEC 15TH EOD

# Infrastructure as code (IAC) is now a first class citizen in the development eco-system
by Ernest Aaron
## a look back...
When most organization think infrastructure as code, they think Terraform.
Terraform is great for managing simple to meduim size infrastructure, but it can be difficult to manage large, complex infrastructure; think multiple accounts, multiple regions, multiple resources, and testing all that infrastructure...

Terraform uses a declarative approach, which means that it defines the desired state of infrastructure and then automatically determines the necessary steps to reach that state. This can make it difficult to understand the sequence of events that will occur when applying changes, which can be challenging in complex environments thus making it difficult to manage large, complex infrastructure.

## better days...
Terraform CDK is here! It is an open-source toolkit for defining cloud infrastructure as code, in a safe and predictable way, using a familiar programming language such as TypeScript, JavaScript, Python, C#, and Java.

It offers several benefits over traditional infrastructure management methods. One of the main benefits is that it allows developers to use the same tools and processes they use for application development to manage and deploy their infrastructure. This makes it easier for teams to collaborate and ensures that infrastructure is treated like any other code, with version control, testing, continuous integration and deployment.

The goal of this demo application is to show whats possible with a high level of abstraction. It makes it easy to manage complex infrastructure without having to write/ worry about the underlying low-level code. This can save time and reduce the potential for errors, allowing us to move to some of the infrastructure management left.

Overall, this new approach offers a flexible and powerful way to manage cloud infrastructure using code and familiar programming languages. It can help organizations improve the reliability, scalability, and agility of their infrastructure.

### Use Cases

> The goal is to build an infrastructure framework that is highly abstracted, so  provising everyday resources, is seamless, yet easy to debug issues or add enhancments.

#### Use Case 1 
Cloud Engineer needs to create new vpcs across dev and prod accounts.

Using this IAC-framework, its as simple as providing the appropriate variables in `config/vpc`

`config/vpc/dev.ts`
```typescript
   {   
        ...defaultConfig,
        name: "dev-sandbox",
        tags: {
            ...defaultConfig.tags,
            Environment: "dev"
        },
        cidr: `${cidrPrefix}.0.0/16`,
        azs: [`${region.US_EAST_1}-1a`, `${region.US_EAST_1}-1b`, `${region.US_EAST_1}-1c`],
        private_subnets: [`${cidrPrefix}.1.0/24`, `${cidrPrefix}.1.0/24`, `${cidrPrefix}.1.0/24`],
        public_subnets: [`${cidrPrefix}.1.0/24`, `${cidrPrefix}.1.0/24`, `${cidrPrefix}.1.0/24`],
    } as VpcStackOptions
```
`config/vpc/prod.ts`
```typescript
  
  {
        ...defaultConfig,
        //override tags
        tags: {
            ...defaultConfig.tags,
            Environment: "prod"
        },
        name: "prod-core-vpc",
        region: region.US_EAST_1,
        cidr: `${cidrPrefix.US_EAST_1}.0.0/16`,
        azs: [`${region.US_EAST_1}-1a`, `${region.US_EAST_1}-1b`, `${region.US_EAST_1}-1c`],
        private_subnets: [`${cidrPrefix.US_EAST_1}.1.0/24`, `${cidrPrefix.US_EAST_1}.1.0/24`, `${cidrPrefix.US_EAST_1}.1.0/24`],
        public_subnets: [`${cidrPrefix.US_EAST_1}.1.0/24`, `${cidrPrefix.US_EAST_1}.1.0/24`, `${cidrPrefix.US_EAST_1}.1.0/24`],
    } as VpcStackOptions,
    {
        ...defaultConfig,
        name: "prod-database-vpc",
        //override tags
        tags: {
            ...defaultConfig.tags,
            Environment: "prod"
        },
        region: region.US_EAST_2,
        cidr: `${cidrPrefix.US_EAST_2}.0.0/16`,
        azs: [`${region.US_EAST_2}-1a`, `${region.US_EAST_2}-1b`, `${region.US_EAST_2}-1c`],
        private_subnets: [`${cidrPrefix.US_EAST_2}.1.0/24`, `${cidrPrefix.US_EAST_2}.1.0/24`, `${cidrPrefix.US_EAST_2}.1.0/24`],
        public_subnets: [`${cidrPrefix.US_EAST_2}.1.0/24`, `${cidrPrefix.US_EAST_2}.1.0/24`, `${cidrPrefix.US_EAST_2}.1.0/24`],

    } as VpcStackOptions
 ```
#### Use Case 2 
Provision databases in dev and prod accounts.

The dev database should be small and production database should be xlarge. With just a few override in config, this can be acheived. 

`config/database/default`
```typescript
{
  engine: "aurora-postgresql",
  engineVersion: "11.12",


  vpcId: "vpcid",
  dbSubnetGroupName: "vpc.db_subnet_group_name",
  createDbSubnetGroup: false,
  createSecurityGroup: true,
  allowedCidrBlocks: ["10.0.0.0/16"],
  securityGroupEgressRules: {
    to_cidrs: {
      cidr_blocks: ["10.33.0.0/28"],
      description: "Egress to data center"
    }
  },
  iamDatabaseAuthenticationEnabled: true,
  masterPassword: process.env.DBPASSWORD,
  applyImmediately: true,
  skipFinalSnapshot: true,

  createDbClusterParameterGroup: true,
  dbClusterDbInstanceParameterGroupName: "name",
  dbClusterParameterGroupFamily: "aurora-postgresql11",
  dbClusterParameterGroupDescription: "example cluster parameter group",
  dbClusterParameterGroupParameters: [
    {
      name: "log_min_duration_statement",
      value: "4000",
      apply_method: "immediate"
    }, {
      name: "rds.force_ssl",
      value: "1",
      apply_method: "immediate"
    }
  ],
  enabledCloudwatchLogsExports: ["postgresql"],
  tags: {
    ManagedByIac: "true",
  }
}
```

`config/database/dev`
```typescript
   {   
        ...defaultConfig,
        vpcId: "vpcid-dev",
        instanceClass: "db.t3.medium",
        dbSubnetGroupName: "dbSubnetGroupName-dev",
        allowedCidrBlocks: ["10.10.0.0/16"],
        region: region.US_EAST_1
    } as RdsAuroraStackOptions
```

`config/database/prod`
```typescript
   {   
        ...defaultConfig,
        name: "db-core",
        vpcId: "vpcid-prod",
        dbSubnetGroupName: "dbSubnetGroupName-prod",
        instanceClass: "db.r5.24xlarge",
        allowedCidrBlocks: ["10.12.0.0/16"],
        region: region.US_EAST_1
    } as RdsAuroraStackOptions,
    {   
        ...defaultConfig,
        name: "db-user-accounts",
        vpcId: "vpcid-prod",
        dbSubnetGroupName: "dbSubnetGroupName-dev",
        allowedCidrBlocks: ["10.12.0.0/16"],
        region: region.US_EAST_1
    } as RdsAuroraStackOptions
```
