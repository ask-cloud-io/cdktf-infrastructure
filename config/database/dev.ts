import { RdsAuroraStackOptions } from "../../src/stacks/rds-aurora";
import { region } from "../../utils/enums";
import { defaultConfig } from "./default";
export default [
    {   
        ...defaultConfig,
        vpcId: "vpcid-dev",
        dbSubnetGroupName: "dbSubnetGroupName-dev",
        allowedCidrBlocks: ["10.10.0.0/16"],
        region: region.US_EAST_1,
        instanceClass: "db.t3.medium"
    } as RdsAuroraStackOptions
  ]