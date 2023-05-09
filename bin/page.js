const path = require("path");
const {downloadAsTxt, url_gen, objify, regexReplace} = require("../utils/func");
const {dirs} = require("../utils/vars");
const Handlebars = require("handlebars");
const fse = require("fs-extra");

const argv = require('minimist')(process.argv.slice(2));

async function molecule(p, f) {
    try {
        await fse.ensureFile(p)
        await fse.write(p, f);
    } catch (err) {
        console.error(err)
    }
}

async function edit(y, i, url, vars) {
    const n = y.map(z => {
        let x = z;
        if (z.indexOf('$') === 0) {
            x = dirs[z.substring(1)]
        }
        if (z.indexOf('{{') >= 0) {
            const temp = Handlebars.compile(z);
            x = temp(vars)
        }
        return x;
    })
    const pth = path.join(...n)
    const filec = await downloadAsTxt(url + String(i));
    const temp = Handlebars.compile(filec);
    const filecont = temp(vars);
    await molecule(pth, filecont)
}

async function page() {
    const arguments = argv._;
    const variables = arguments.slice(3);
    const url = url_gen('pages', arguments[1]);
    const config = JSON.parse(await downloadAsTxt(url + `config`));
    for (let i = 0; i < config.edits.length; i++) {
        await edit(config.edits[i], i, url, {args: variables});
    }
}


module.exports = page;
