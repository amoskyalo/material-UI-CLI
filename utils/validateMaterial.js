const fs = require('fs');
const chalk = require('chalk');
const promptInstall = require('./promptInstall')

function validateMUI(action) {
    const packageJsonPath = "./package.json";

    try {
        fs.readFile(packageJsonPath, (error, data) => {
            if (error) {
                console.log(chalk.red("Error while reading package.json"), error);
            }
            const deps = JSON.parse(data);

            return deps["@mui/material"] ? action() : promptInstall()
        })
    } catch (error) {
        console.log("error")
    }
}

module.exports = validateMUI;