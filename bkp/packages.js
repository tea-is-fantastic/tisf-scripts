const util = require('util');
const {projectDir, url_gen, downloadAsTxt} = require("../utils/func");
const exec = util.promisify(require('child_process').exec);

async function molecule(i) {
    await projectDir(i[1]);
    const cmd = i[2] || 'yarn add';
    const {stdout, stderr} = await exec(
            `${cmd} ${i[0]}`,
    );
    console.log(stderr, stdout);
}

async function packages({config}) {
    for (let i of config.packages) {
        await molecule(i)
    }
}

module.exports = packages;
