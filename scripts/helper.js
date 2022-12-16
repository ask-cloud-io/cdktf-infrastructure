// import exec method from child_process module
const { execSync } = require("child_process");

const csdtfCommandPrefix = `INFRA_ENV=${process.argv[3]} ./node_modules/.bin/cdktf`
const csdtfCommandSuffix = `--app 'npx ts-node ./main.ts'`

const runExecCommand = (command) => {
    execSync(`echo ${command} && ${command}`, {
        // setting environment variable 😁
        stdio: "inherit"
    });
}

const runSynth = () => {
    runExecCommand(`${csdtfCommandPrefix} synth ${csdtfCommandSuffix}`)
}

const runDiff = () => {
    runExecCommand(`${csdtfCommandPrefix} diff ${process.argv[4]} ${csdtfCommandSuffix}`)
}

if (process.argv[2].startsWith("synth")) {
    runSynth()
} else if (process.argv[2].startsWith("diff")) {
    runDiff()
}

