const util = require('util');
const {projectDir, url_gen, downloadAsTxt, normalize} = require("../utils/func");
const exec = util.promisify(require('child_process').exec);

async function scripts({config, args}) {
    for (const i of config.scripts) {
        await projectDir(i[1]);
        const x = normalize(i[0], {args})
        const {stdout, stderr} = await exec(x);
        console.log(stdout);
        console.log(stderr);
    }
}

module.exports = scripts;
