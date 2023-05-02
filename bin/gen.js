const path = require("path");
const {downloadAsTxt, url_gen, objify} = require("../utils/func");
const {dirs} = require("../utils/vars");
const fs = require("fs");
const Handlebars = require("handlebars");

const argv = require('minimist')(process.argv.slice(2));

async function gen() {
    const arguments = argv._;
    const variables = arguments.slice(3);
    const url = url_gen('generators', arguments[1]);
    const config = JSON.parse(await downloadAsTxt(url + `config`));
    const temp = await downloadAsTxt(url + `template`);
    const template = Handlebars.compile(temp);
    const vars = objify(config.variables, variables);
    const modified = template(vars);
    await fs.promises.writeFile(path.join(dirs.src, config.file), modified);
}

module.exports = gen;
