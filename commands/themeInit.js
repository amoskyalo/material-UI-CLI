const path = require("path");
const createTheme = require("../templates/theme");
const fs = require('fs');
const chalk = require('chalk');

function themeInit(options) {
    const palette = {
        primary: "#90caf9",
        secondary: "#ce93d8",
        error: "#f44336",
        warning: "#ffa726",
        info: "#29b6f6",
        success: "#66bb6a"
    }

    function updatePalette(color, value) {
        typeof color === "string" ? palette[color] = value : null;
    }

    if (Object.entries(options).length > 0) {
        Object.entries(options).forEach(entry => updatePalette(entry[0], entry[1]));
    }

    const theme = createTheme(palette);

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