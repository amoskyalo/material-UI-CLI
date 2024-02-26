const fs = require('fs');
const { logger } = require('../utils/logger')
const promptInstall = require('./promptInstall');
const CLI = require('clui');

function validateMUI(action) {
    const packageJsonPath = "./package.json";

    try {
        fs.readFile(packageJsonPath, (error, data) => {
            if (error) {
                logger.error("Error while reading package.json", error);
            }
            const deps = JSON.parse(data).dependencies;

            return deps["@mui/material"] ? action() : promptInstall(action)
        })
    } catch (error) {
        console.log("error")
    }
}

module.exports = validateMUI;