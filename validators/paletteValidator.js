const chalk = require('chalk');
const paletteSchema = require('../schemas/paletteSchema');

async function paletteValidator(themeFileUrl) {
    try {
        const themeModule = await import(themeFileUrl);
        const themeConfig = themeModule.default;

        const { errors, warnings } = paletteSchema(themeConfig.palette);

        const errorMessage = Object.values(errors).join("\n\t");
        const warningMessage = Object.values(warnings).join("\n");

        const error = Boolean(Object.entries(errors).length > 0)

        error ? console.log(chalk.red("\nFailed to validate theme.\n\t" + errorMessage)) : console.log(chalk.green('Theme is valid!'));

        Boolean(warningMessage) ? console.log(chalk.yellow("\n" + warningMessage)) : null;

    } catch (error) {
        console.error(chalk.red(error));
    }
}

module.exports = paletteValidator