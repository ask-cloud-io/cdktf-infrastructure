import { BaseConstruct } from "../base";
import { RdsAurora as mRdsAurora, RdsAuroraOptions as mRdsAuroraOptions  } from "../../../.gen/modules/rds-aurora";

export interface RdsAuroraOptions extends mRdsAuroraOptions { }

export class RdsAurora extends BaseConstruct {
    constructor(scope: BaseConstruct, name: string, options: RdsAuroraOptions) {
        super(scope, name)

        new mRdsAurora(this, name, options)
    }
}
