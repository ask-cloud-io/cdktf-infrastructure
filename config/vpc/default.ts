import { VpcStackOptions } from "../../src/stacks/vpc";
export const defaultConfig = {
  enable_nat_gateway: true,
  enable_vpn_gateway: true,
  tags: {
    ManagedByIac: "true",
  }
} as VpcStackOptions