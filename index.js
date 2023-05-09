#!/usr/bin/env node
const script = require("./bin/script");
const argv = require('minimist')(process.argv.slice(2));

const f = {
    // gen: require("./bin/gen"),
    // install: require("./bin/install"),
    // page: require("./bin/page"),
}

async function setup() {
    // if(argv?._) {
    //     f[argv._[0]]();
    // }

    if(argv?.s) {
        f[argv.s]();
        return
    }
    await script();
}

setup();
