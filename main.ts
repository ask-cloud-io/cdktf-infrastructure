import { Construct } from "constructs";
import { App } from "cdktf";

import { VpcStack } from "./src/stacks/vpc";

const getServiceStacksConfigs = (service: string, env: any) => {
  const configs = require(`./config/${service}/${env}`)
  console.log(configs)
  return configs
}

const createStacks = (app: Construct, env: string = "dev") => {

  let stacks: any = [];

  const vpcStackConfigs = getServiceStacksConfigs("vpc", env)


  vpcStackConfigs.default.forEach((config: any) => {
    stacks.push(new VpcStack(app, config.name))
  });

  return stacks
}

const app = new App();
createStacks(app, process.env.INFRA_ENV)

app.synth();
