#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));

const f = {
    gen: require("./bin/gen"),
}

async function setup() {
    if(argv?._) {
        f[argv._[0]]();
    }
}

setup();
