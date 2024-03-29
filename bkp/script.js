const {downloadAsTxt, url_gen} = require("../utils/func");
const edits = require("./edits");
const regex = require("./regex");
const packages = require("./packages");
const scripts = require("./scripts");

const argv = require('minimist')(process.argv.slice(2));

async function script() {
    const arguments = argv._;
    const args = arguments.slice(1);
    const url = url_gen('scripts', arguments[0]);
    const config = JSON.parse(await downloadAsTxt(url + `config`));
    const vars = {config, args, url};
    if (config.scripts && config.scripts.length > 0) {
        await scripts(vars);
    }
    if (config.packages && config.packages.length > 0) {
        await packages(vars);
    }
    if (config.edits && config.edits.length > 0) {
        await edits(vars);
    }
    if (config.regex && config.regex.length > 0) {
        await regex(vars);
    }
}


module.exports = script;
