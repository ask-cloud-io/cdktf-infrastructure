import { Construct } from "constructs";
import { RdsAurora, RdsAuroraOptions } from "../../constructs/rds-aurora";
import { BaseStack } from "../base";

export interface RdsAuroraStackOptions extends RdsAuroraOptions{}

export class RdsAuroraStack extends BaseStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        new RdsAurora(this,`${id}-rds-aurora`,{})
    }
}