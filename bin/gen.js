const path = require("path");
const {downloadAsTxt, url_gen, objify} = require("../utils/func");
const {src} = require("../utils/vars");
const fs = require("fs");
const Handlebars = require("handlebars");

const argv = require('minimist')(process.argv.slice(2));

async function gen() {
    const arguments = argv._;
    console.log(arguments);
    const variables = arguments.slice(3);
    console.log(variables);
    const url = url_gen(arguments[1], arguments[2]);
    console.log(arguments[1], arguments[2]);
    console.log(url);
    const config = JSON.parse(await downloadAsTxt(url + `config`));
    console.log(config);
    const temp = await downloadAsTxt(url + `template`);
    const template = Handlebars.compile(temp);
    console.log(template());
    const vars = objify(config.variables, variables);
    console.log(vars);
    const modified = template(vars);
    await fs.promises.writeFile(path.join(src, config.file), modified);
}

module.exports = gen;
