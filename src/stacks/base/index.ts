import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class BaseStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

    }
}