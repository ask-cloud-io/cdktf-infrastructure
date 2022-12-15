import { Construct } from "constructs";
import { Vpc, VpcOptions } from "../../constructs/vpc";
import { BaseStack } from "../base";

export interface VpcStackOptions extends VpcOptions{}

export class VpcStack extends BaseStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        new Vpc(this,`${id}-vpc`,{})
    }
}