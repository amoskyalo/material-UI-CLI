const path = require('path');
const validator = require('../validators');
const { rename } = require('fs/promises');
const { pathToFileURL } = require('url');
const { input, confirm } = require('@inquirer/prompts');

async function validateTheme(options) {
    const { path: filePath, palette, typography, spacing, breakpoints, transition } = options;

    const optionsArr = [
        { name: 'palette', value: palette },
        { name: "typography", value: typography },
        { name: "spacing", value: spacing },
        { name: "breakpoints", value: breakpoints },
        { name: "transition", value: transition }
    ].filter(v => v.value);

    // console.log(optionsArr);

    async function getFilePath(filePath) {
        let p;

        const [file, extension] = filePath.split(".");

        if (extension === "js") {
            const answer = await confirm({ message: "Do you want to rename your file with .mjs extension?" });

            if (answer) {
                const f = `${file}.mjs`
                try {
                    await rename(path.join(process.cwd(), filePath), path.join(process.cwd(), f));
                    p = f;
                } catch (error) {
                    console.error(error)
                }
            } else {
                process.exit(0);
            }
        } else {
            p = filePath;
        }

        const themePath = path.join(__dirname, '..', p);

        return pathToFileURL(themePath).href;
    }

    if (!filePath) {
        const filePath = await input({ message: "Provide path to your theme file. Example: './theme/index.js" });
        const themeFileUrl = await getFilePath(filePath);
        validator(optionsArr, themeFileUrl);
    } else {
        const themeFileUrl = await getFilePath(filePath);
        validator(optionsArr, themeFileUrl);
    }
}

module.exports = validateTheme
