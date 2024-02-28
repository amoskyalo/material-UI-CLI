#!/usr/bin/env node

const { program } = require('commander');
const { exec } = require('child_process');
const { checkbox } = require('@inquirer/prompts');
const ComponentGenerator = require('./utils/getComponentTemplate')
const themeInit = require('./commands/themeInit');
const validateMUI = require('./utils/validateMaterial');
const validateTheme = require('./commands/validateTheme');
const projectInit = require('./commands/projectInit');
const { logger } = require('./utils/logger');

program.version("0.0.1").description("Material UI CLI");

// generate theme template
program
    .command("theme-init")
    .description("Initialize theme")
    .option("-p, --primary [string], primary color option")
    .option("-s, --secondary [string], secondary color option")
    .option("-e, --error [string], error color option")
    .option("-w, --warning [string], warning color option")
    .option("-i, --info [string], info color option")
    .option("-x, --success [string], success color option")
    .action(options => validateMUI(() => themeInit(options)));

//validate theme;
program
    .command("theme-validate")
    .description("Validate theme")
    .option("-p, --palette [string], validate palette in theme")
    .option("-t, --typography [string], validate typography in theme")
    .option("-s, --spacing [string], validate spacing in theme")
    .option("-b, --breakpoints [string], validate breakpoints in theme")
    .option('-tr, --transitions [string], validate transitions in theme')
    .option('--path [string], path to theme file')
    .option('--ignore-warn [string], ignore warning in theme')
    .action(options => validateMUI(() => validateTheme(options)));


program.command('project-init').description("Create a new react project").action(() => {
    const appName = process.argv[3];

    if (!appName) {
        console.log()

        logger.error("Project name must be provided");

        process.exit(1);
    }

    projectInit(appName);
});

// program.command('test').action(async() => {
//     // const answers = await checkbox({
//     //     message: "Which components would you want to install?",
//     //     choices: [
//     //         { name: "App Bar", value: { name: "AppBar", category: "Layouts" } },
//     //         { name: "AutoComplete", value: { name: "AutoComplete", category: "Inputs" } },
//     //         { name: "DataGrid", value: { name: "DataGrid", category: "DataDisplay" } },
//     //         { name: "Dates", value: { name: "Dates", category: "Inputs" } },
//     //         { name: "Select", value: { name: "Select", category: "Inputs" } },
//     //         { name: "Tabs", value: { name: "Tabs", category: "Navigation" } },
//     //         { name: "TextField", value: { name: "TextField", category: "Inputs" } }
//     //     ]
//     // });

//     // console.log(answers)
//     new ComponentGenerator(["AppBar"], "appName").generateComponent();
// });

program.parse(process.argv);