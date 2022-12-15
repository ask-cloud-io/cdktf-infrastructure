# CHECK BACK FOR A COMPLETE PICTURE WILL BE READY BY DEC 15TH EOD

# Infrastructure as code (IAC) is now a first class citizen in the development eco-system
by Ernest Aaron
## a look back...
When most organization think infrastructure as code, they think Terraform.
Terraform is great for managing simple to meduim size infrastructure, but it can be difficult to manage large, complex infrastructure; think multiple accounts, multiple regions, multiple resources, and testing all that infrastructure...

Terraform uses a declarative approach, which means that it defines the desired state of infrastructure and then automatically determines the necessary steps to reach that state. This can make it difficult to understand the sequence of events that will occur when applying changes, which can be challenging in complex environments thus making it difficult to manage large, complex infrastructure.

## better days...
Terraform CDK is here! It is an open-source toolkit for defining cloud infrastructure as code, to define cloud infrastructure in a safe and predictable way, using a familiar programming language such as TypeScript, JavaScript, Python, C#, and Java.

It offers several benefits over traditional infrastructure management methods. One of the main benefits is that it allows developers to use the same tools and processes they use for application development to manage and deploy their infrastructure. This makes it easier for teams to collaborate and ensures that infrastructure is treated like any other code, with version control, testing, and continuous integration and deployment.

The goal of this demo application shows whats possible with a high level of abstraction, which makes it easy to manage complex infrastructure without having to write/ worry about the underlying low-level code. This can save time and reduce the potential for errors, allowing us to move to some of the infrastructure management left.

Overall, this new approach offers a flexible and powerful way to manage cloud infrastructure using code and familiar programming languages, which can help organizations improve the reliability, scalability, and agility of their infrastructure.

### Use Cases

> The goal is to build an infrastructure framework that is highly abstracted, so  provising everyday resources, is seamless. However easy to debug the underlying framework and add enhances or fix issues that may arise.

#### Use Case 1 
Cloud Engineer needs to create new vpcs across dev and prod accounts.

Using this IAC-framework, its as simple as providing the appropriate variables in `config/vpc`

`config/vpc/dev.ts`
```typescript
   {   
        ...defaultConfig,
        name: "dev-sanbox",
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
