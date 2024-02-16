const paletteSchema = require('../schemas/paletteSchema');
const typographySchema = require('../schemas/typographySchema');
const chalk = require('chalk');

const defaultOptions = [
    { name: 'palette', schema: paletteSchema },
    { name: 'typography', schema: typographySchema }
];

async function validator(options, themeFileUrl) {
    try {
        const themeErros = {};
        const themeWarnings = {};

        const themeModule = await import(themeFileUrl);
        const themeConfig = themeModule.default;

        for (let { name } of options) {
            const d = defaultOptions.find(option => option.name === name);

            if (d) {
                const { errors, warnings } = d.schema(themeConfig[name]);

                Object.entries(errors).forEach(([key, value]) => themeErros[key] = value);
                Object.entries(warnings).forEach(([key, value]) => themeWarnings[key] = value);
            }
        }

        const errorMessage = Object.values(themeErros).join("\n\t");
        const warningMessage = Object.values(themeWarnings).join("\n");

        const error = Boolean(Object.entries(themeErros).length > 0)

        error ? console.log(chalk.red("\nTheme validation failed due to the following error:\n\t" + errorMessage)) : console.log(chalk.green('Theme is valid!'));

        Boolean(warningMessage) ? console.log(chalk.yellow("\n" + warningMessage)) : null;

    } catch (error) {
        console.log(error);
    }
};

module.exports = validator;