const fs = require('fs');
const {ensureFile} = require('fs-extra');
const util = require('util');
const stream = require('stream');
const axios = require("axios");
const {src} = require("./vars");
const pipeline = util.promisify(stream.pipeline);
const replace = require('replace-in-file');
const regexpTree = require('regexp-tree');


const downloadFile = async (loc, pth, responseType='stream') => {
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
  try {
    const request = await axios.get(loc, {
      responseType: 'text/plain',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    return request.data;
  } catch (error) {
    console.error('download pipeline failed', error);
  }
}
const projectDir = () => {
  try {
    process.chdir(src);
  } catch (error) {
    console.error('chdir failed', error);
  }
}

const url_gen = (repo, name) => `https://raw.githubusercontent.com/t-i-f/${repo}/main/${name}/`

const objify = (vars, vals) => {
  const output = {}
  for (let i= 0; i < vars.length; i++) {
    output[vars[i]] = vals[i];
  }
  return output;
}

async function regexReplace(files, re, rep, already, callback){
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

module.exports = {downloadFile, downloadAsTxt, projectDir, url_gen, objify, regexReplace};
