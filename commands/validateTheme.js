const path = require('path');
const { rename } = require('fs/promises');
const chalk = require('chalk');
const { pathToFileURL } = require('url');
const { input, confirm } = require('@inquirer/prompts');

function paletteValidatorSchema(palette) {
    const defaultColors = ['primary', 'secondary', 'error', 'warning', 'info'];

    const warnings = {};
    const errors = {};

    defaultColors.forEach(color => {
        if (!palette[color]) {
            warnings[color] = `Warning: The '${color}' color is missing from the palette. MUI will use default.`;
        }
    });

    Object.entries(palette).forEach(([key, { main }]) => {
        if (!main) {
            errors[key] = `Error: '${key}.main' is missing`
        }
    });

    return { warnings, errors };
};

async function validateTheme(options) {
    const { path: filePath } = options;

    async function validate(themeFileUrl) {
        try {
            const themeModule = await import(themeFileUrl);
            const themeConfig = themeModule.default;

            const { errors, warnings } = paletteValidatorSchema(themeConfig.palette);

            const errorMessage = Object.values(errors).join("\n\t");
            const warningMessage = Object.values(warnings).join("\n");

            const error = Boolean(Object.entries(errors).length > 0)

            error ? console.log(chalk.red("\nFailed to validate theme.\n\t" + errorMessage)) : console.log(chalk.green('Theme is valid!'));

            Boolean(warningMessage) ? console.log(chalk.yellow("\n" + warningMessage)) : null;

        } catch (error) {
            console.error(chalk.red(error));
        }
    }

    async function getFilePath(filePath) {
        let p;
        const x = filePath.split(".");

        if (x[1] === "js") {
            const answer = await confirm({ message: "Do you want to rename your file with .mjs extension?" });

            if (answer) {
                const f = `${x[0]}.mjs`
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
        validate(themeFileUrl);
    } else {
        const themeFileUrl = await getFilePath(filePath);
        validate(themeFileUrl);
    }
}

module.exports = validateTheme
