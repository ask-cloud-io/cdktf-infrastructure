import { VpcStackOptions } from "../../src/stacks/vpc";
import { region } from "../../utils/enums";
import {defaultConfig} from "./default";

const cidrPrefix = "10.10"
export default [
    {   
        ...defaultConfig,
        name: "dev-sandbox",
        tags: {
            ...defaultConfig.tags,
            Environment: "dev"
        },
        cidr: `${cidrPrefix}.0.0/16`,
        azs: [`${region.US_EAST_1}-1a`, `${region.US_EAST_1}-1b`, `${region.US_EAST_1}-1c`],
        private_subnets: [`${cidrPrefix}.1.0/24`, `${cidrPrefix}.1.0/24`, `${cidrPrefix}.1.0/24`],
        public_subnets: [`${cidrPrefix}.1.0/24`, `${cidrPrefix}.1.0/24`, `${cidrPrefix}.1.0/24`],
    } as VpcStackOptions
  ]