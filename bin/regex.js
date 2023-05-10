const {regexReplace, projectDir} = require("../utils/func");

async function regex({config, pth}) {
    for (const a of config.data) {
        await regexReplace(
            pth,
            a.find && a.find.trim(),
            a.replace && a.replace.trim(),
            a.already && a.already.trim()
        );
    }
}

module.exports = regex;
