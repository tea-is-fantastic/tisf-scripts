const util = require('util');
const {projectDir, normalize, normalizePath} = require("../utils/func");
const exec = util.promisify(require('child_process').exec);

async function script({config, pth}) {
    await projectDir(pth);
    for (const i of config.data) {
        const {stdout, stderr} = await exec(i);
        console.log(stdout);
        console.log(stderr);
    }
}

module.exports = script;
