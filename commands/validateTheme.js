const path = require('path');
const validator = require('../validators');
const { rename } = require('fs/promises');
const { pathToFileURL } = require('url');
const { input, confirm } = require('@inquirer/prompts');

async function validateTheme(options) {
    const { path: filePath, palette, typography, spacing, breakpoints, transitions, ignoreWarn } = options;

    const optionsArr = [
        { name: 'palette', value: palette },
        { name: "typography", value: typography },
        { name: "spacing", value: spacing },
        { name: "breakpoints", value: breakpoints },
        { name: "transitions", value: transitions }
    ].filter(v => v.value);

    // async function getFilePath(filePath) {
    //     let p;

    //     const [file, extension] = filePath.split(".");

    //     if (extension === "js") {
    //         const answer = await confirm({ message: "Do you want to rename your file with .mjs extension?" });

    //         if (answer) {
    //             const f = `${file}.mjs`
    //             try {
    //                 await rename(path.join(process.cwd(), filePath), path.join(process.cwd(), f));
    //                 p = f;
    //             } catch (error) {
    //                 console.error(error)
    //             }
    //         } else {
    //             process.exit(0);
    //         }
    //     } else {
    //         p = filePath;
    //     }

    //     const themePath = path.join(process.cwd(), p);

    //     return pathToFileURL(themePath).href;
    // }

    if (!filePath) {
        const filePath = await input({ message: "Provide path to your theme file. Example: './theme/index.js" });
        // const themeFileUrl = await getFilePath(filePath);
        validator(optionsArr, ignoreWarn, filePath);
    } else {
        // const themeFileUrl = await getFilePath(filePath);
        validator(optionsArr, ignoreWarn, filePath);
    }
}

module.exports = validateTheme
