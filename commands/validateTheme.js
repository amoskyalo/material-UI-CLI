const path = require('path');
const { rename } = require('fs/promises');
const { pathToFileURL } = require('url');
const { input, confirm } = require('@inquirer/prompts');
const paletteValidator = require('../validators/paletteValidator')

async function validateTheme(options) {
    const { path: filePath } = options;

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
        paletteValidator(themeFileUrl);
    } else {
        const themeFileUrl = await getFilePath(filePath);
        paletteValidator(themeFileUrl);
    }
}

module.exports = validateTheme
