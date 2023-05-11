#!/usr/bin/env node
const YAML = require("yaml");
const {url_gen, downloadAsTxt, normalize, normalizePath} = require("./utils/func");
const argv = require('minimist')(process.argv.slice(2));
const path = require("path");
const fs = require("fs-extra");
const {dirs} = require("./utils/vars");

const f = {
    edit: require("./bin/edit"),
    regex: require("./bin/regex"),
    script: require("./bin/script"),
    install: require("./bin/install"),
}

async function setup() {
    const arguments = argv._;
    let args = arguments.slice(1);
    let name = arguments[0];
    if(name === 'args') {
        args = YAML.parse(await fs.readFile(path.join(dirs.src, 'args.yml'), 'utf8'));
        name = args.script;
    }
    const url = url_gen('scripts', name);
    const conf = YAML.parse(await downloadAsTxt(url + `config`));

    for (const i of conf.files) {
        const temp = normalize(await downloadAsTxt(url + i), {args});
        const config = YAML.parse(temp);
        const pth = normalizePath(config.path);
        const vars = {config, args, pth, url};
        f[config.type](vars);
    }
}

setup();
