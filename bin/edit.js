const {projectDir} = require("../utils/func");
const fs = require("fs-extra");

async function edit({config, pth}) {
    await fs.ensureFile(pth)
    await fs.writeFile(pth, config.data);
}


module.exports = edit;
