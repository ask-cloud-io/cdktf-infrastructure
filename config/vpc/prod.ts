import { VpcStackOptions } from "../../src/stacks/vpc";
import { defaultConfig } from "./default";
import { region } from "../../utils/enums";

const cidrPrefix = {
    US_EAST_1: "10.11",
    US_EAST_2: "10.12",
}

export default [
    {
        ...defaultConfig,
        //override tags
        tags: {
            ...defaultConfig.tags,
            Environment: "prod"
        },
        name: "prod-core-vpc",
        region: region.US_EAST_1,
        cidr: `${cidrPrefix.US_EAST_1}.0.0/16`,
        azs: [`${region.US_EAST_1}-1a`, `${region.US_EAST_1}-1b`, `${region.US_EAST_1}-1c`],
        private_subnets: [`${cidrPrefix.US_EAST_1}.1.0/24`, `${cidrPrefix.US_EAST_1}.1.0/24`, `${cidrPrefix.US_EAST_1}.1.0/24`],
        public_subnets: [`${cidrPrefix.US_EAST_1}.1.0/24`, `${cidrPrefix.US_EAST_1}.1.0/24`, `${cidrPrefix.US_EAST_1}.1.0/24`],
    } as VpcStackOptions,
    {
        ...defaultConfig,
        name: "prod-database-vpc",
        //override tags
        tags: {
            ...defaultConfig.tags,
            Environment: "prod"
        },
        region: region.US_EAST_2,
        cidr: `${cidrPrefix.US_EAST_2}.0.0/16`,
        azs: [`${region.US_EAST_2}-1a`, `${region.US_EAST_2}-1b`, `${region.US_EAST_2}-1c`],
        private_subnets: [`${cidrPrefix.US_EAST_2}.1.0/24`, `${cidrPrefix.US_EAST_2}.1.0/24`, `${cidrPrefix.US_EAST_2}.1.0/24`],
        public_subnets: [`${cidrPrefix.US_EAST_2}.1.0/24`, `${cidrPrefix.US_EAST_2}.1.0/24`, `${cidrPrefix.US_EAST_2}.1.0/24`],

    } as VpcStackOptions
]