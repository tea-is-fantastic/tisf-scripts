const fs = require('fs');
const {ensureFile} = require('fs-extra');
const util = require('util');
const stream = require('stream');
const axios = require("axios");
const {dirs} = require("./vars");
const pipeline = util.promisify(stream.pipeline);
const replace = require('replace-in-file');
const regexpTree = require('regexp-tree');
const Handlebars = require("handlebars");
const path = require("path");


const downloadFile = async (loc, pth, responseType = 'stream') => {
    try {
        await ensureFile(pth);
        const request = await axios.get(loc, {
            responseType,
        });
        await pipeline(request.data, fs.createWriteStream(pth));
        console.log(`download ${loc} successful`);
    } catch (error) {
        console.error('download pipeline failed', error);
    }
}
const downloadAsTxt = async (loc) => {
    const request = await axios.get(loc, {
        responseType: 'text/plain',
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    });
    return request.data;
}

const projectDir = (where = 'src') => {
    try {
        process.chdir(dirs[where]);
    } catch (error) {
        console.error('chdir failed', error);
    }
}

const url_gen = (repo, name) => `https://raw.githubusercontent.com/t-i-f/${repo}/main/${name}/`

const objify = (vars, vals) => {
    const output = {}
    for (let i = 0; i < vars.length; i++) {
        output[vars[i]] = vals[i];
    }
    return output;
}

async function regexReplace(files, re, rep, already, callback) {
    try {
        const filecont = await fs.promises.readFile(files, 'utf-8');
        if (already && filecont.includes(already)) {
            return;
        }
        const reg = regexpTree.toRegExp(re);
        let to = rep;
        if (callback) {
            to = input => callback(input.replace(reg, rep));
        }
        const results = await replace({
            files,
            from: reg,
            to,
        });
        console.log('Replacement results:', results);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

const normalize = (z, vars) => {
    if (z.indexOf('{{') >= 0) {
        const temp = Handlebars.compile(z);
        return temp(vars)
    }
    return z;
}

const normalizePath = (y) => {
    const n = y.map(z => {
        if (z.indexOf('$') === 0) {
            return dirs[z.substring(1)]
        }
        return z;
    })
    return path.join(...n);
}


module.exports = {downloadFile, downloadAsTxt, projectDir, url_gen, objify, regexReplace, normalize, normalizePath};