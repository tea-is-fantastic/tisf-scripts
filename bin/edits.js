const path = require("path");
const {downloadAsTxt, normalizePath, projectDir} = require("../utils/func");
const {dirs} = require("../utils/vars");
const Handlebars = require("handlebars");
const fs = require("fs-extra");

async function atom(p, f) {
    try {
        await fs.ensureFile(p)
        await fs.writeFile(p, f);
    } catch (err) {
        console.error(err)
    }
}

async function molecule(y, i, url, vars) {
    const pth = normalizePath(y, vars);
    const filec = await downloadAsTxt(`${url}edit${i}`);
    const temp = Handlebars.compile(filec);
    const filecont = temp(vars);
    await atom(pth, filecont)
}

async function edits({config, args, url}) {
    await projectDir();
    for (let i = 0; i < config.edits.length; i++) {
        await molecule(config.edits[i], i, url, {args});
    }
}


module.exports = edits;
