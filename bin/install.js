const util = require('util');
const {projectDir, url_gen, downloadAsTxt} = require("../utils/func");
const exec = util.promisify(require('child_process').exec);

async function install({config, pth}) {
    await projectDir(pth);
    for (const i of config.data) {
        const {cmd='yarn add', dep, opt=' '} = i;
        const {stdout, stderr} = await exec(
            `${cmd}${opt}${dep}`,
        );
        console.log(stderr, stdout);
    }
}

module.exports = install;
