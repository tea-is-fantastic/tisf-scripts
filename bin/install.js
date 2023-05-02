const path = require("path");
const {downloadAsTxt, url_gen, objify, regexReplace} = require("../utils/func");
const {dirs} = require("../utils/vars");
const fs = require("fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const argv = require('minimist')(process.argv.slice(2));

async function atom(p, a) {
    const single = a.split('XXXXXX').map(x => x.trim());
    await regexReplace(p, ...single);
}

async function molecule(p, f) {
    const single = f.split('======');
    for (const a of single) {
        await atom(p, a);
    }
}

async function edit(y, i, url) {
    const n = y.map(z => {
        if(z.indexOf('$') === 0) {
            return dirs[z.substring(1)]
        }
        return z
    })
    const pth = path.join(...n)
    const filecont = await downloadAsTxt(url + String(i));
    await molecule(pth, filecont)
}

async function install() {
    const arguments = argv._;
    const variables = arguments.slice(3);
    const url = url_gen('install', arguments[1]);
    const config = JSON.parse(await downloadAsTxt(url + `config`));

    const {stdout, stderr} = await exec(
        `yarn add ${config.package}`,
    );

    for(let i=0; i<config.edits.length; i++) {
        await edit(config.edits[i], i, url);
    }
}

module.exports = install;
