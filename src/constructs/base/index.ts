import { Construct } from "constructs";

export interface BaseConstructOptions {}

export class BaseConstruct extends Construct {
    constructor(scope: Construct, name: string, options: BaseConstructOptions = {}) {
        super(scope, name)

        const {} = options
        
        new Construct(this, "this")
    }
}
