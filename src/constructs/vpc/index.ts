import { BaseConstruct } from "../base";
import { Vpc as mVpc, VpcOptions as mVpcOptions } from "../../../.gen/modules/vpc";

export interface VpcOptions extends mVpcOptions { }

export class Vpc extends BaseConstruct {
    constructor(scope: BaseConstruct, name: string, options: VpcOptions) {
        super(scope, name)

        new mVpc(this, name, options)
    }
}
