const { confirm, select } = require('@inquirer/prompts');
const { logger } = require('../utils/logger');
const { getPackageManager } = require('../utils/getPackageManager');
const runInstall = require('./runInstall');

async function promptInstall(next) {
    const install = await confirm({ message: "Looks like material ui is not installed in your project. Do you want to install it?" });

    if (install) {
        // const package = await select({
        //     message: "Choose the package to use",
        //     choices: [
        //         {
        //             name: "npm",
        //             value: "npm"
        //         },
        //         {
        //             name: "yarn",
        //             value: "yarn"
        //         }
        //     ]
        // });
        
        const package = getPackageManager()

        runInstall(package, next);

    } else {
        logger.warn("Material UI needs to be installed in your project.");
        process.exit(0);
    }
}

module.exports = promptInstall;

