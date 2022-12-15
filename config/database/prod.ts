import { RdsAuroraStackOptions } from "../../src/stacks/rds-aurora";
import { region } from "../../utils/enums";
import { defaultConfig } from "./default";
export default [
    {   
        ...defaultConfig,
        name: "db-core",
        vpcId: "vpcid-prod",
        dbSubnetGroupName: "dbSubnetGroupName-dev",
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
  ]