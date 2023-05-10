const {downloadAsTxt, regexReplace, normalizePath, projectDir} = require("../utils/func");
const Handlebars = require("handlebars");
const YAML = require("yaml");

async function atom(p, f) {
    const x = YAML.parse(f);
    const single = x.regex;
    for (const a of single) {
        await regexReplace(
            p,
            a.find && a.find.trim(),
            a.replace && a.replace.trim(),
            a.already && a.already.trim()
        );
    }
}

async function molecule(y, i, url, vars) {
    const pth = normalizePath(y, vars);
    const filec = await downloadAsTxt(`${url}regex${i}`);
    const temp = Handlebars.compile(filec);
    const filecont = temp(vars);
    await atom(pth, filecont)
}


async function regex({config, url, args}) {
    await projectDir();
    for (let i = 0; i < config.regex.length; i++) {
        await molecule(config.regex[i], i, url, {args});
    }
}

module.exports = regex;
