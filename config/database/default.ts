import { RdsAuroraStackOptions } from "../../src/stacks/rds-aurora";
export const defaultConfig: RdsAuroraStackOptions = {
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