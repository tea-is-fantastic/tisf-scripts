const util = require('util');
const {projectDir} = require("../utils/func");
const exec = util.promisify(require('child_process').exec);

async function packages({config}) {
    await projectDir(config.scope);
    for (const i of config.packages) {
        let cmd = 'yarn add';
        let opt = ' ';
        if (i.indexOf('$') >= 0) {
            opt = ' -D '
        }
        if (i.indexOf('&') >= 0) {
            cmd = 'npm i';
        }
        const fin = `${cmd}${opt}${i}`;
        const {stdout, stderr} = await exec(
            fin,
        );
    }
}

module.exports = packages;
