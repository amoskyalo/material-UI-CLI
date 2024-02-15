const path = require("path");
const createTheme = require("../templates/theme");
const fs = require('fs');
const chalk = require('chalk');
const { defaultColors } = require('../utils/constants');

function themeInit(options) {
    function updatePalette(color, value) {
        typeof color === "string" ? defaultColors[color] = value : null;
    }

    if (Object.entries(options).length > 0) {
        Object.entries(options).forEach(entry => updatePalette(entry[0], entry[1]));
    }

    const theme = createTheme(defaultColors);

    const themePath = path.join(process.cwd(), "theme.js");

    try {
        fs.writeFile(themePath, theme, (error, __) => {
            if (error) {
                console.log(chalk.red("Error while creating theme"), error);
            }

            console.log(chalk.green("Theme created successfully at"), themePath)
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports = themeInit;