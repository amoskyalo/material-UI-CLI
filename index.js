#!/usr/bin/env node

const { program } = require('commander');
const { getPackageManager } = require('./utils/getPackageManager');
const { logger } = require('./utils/logger');
const themeInit = require('./commands/themeInit');
const validateMUI = require('./utils/validateMaterial');
const validateTheme = require('./commands/validateTheme');
const projectInit = require('./commands/projectInit');

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


program.command('project-init')
    .option('-a, --all, Install all components')
    .description("Create a new react project")
    .action((options) => {
        const appName = process.argv[3];

        if (!appName) {
            logger.error("Project name must be provided");

            process.exit(1);
        }

        projectInit(appName, options.all || false);
    });

program.command("package").action(() => console.log(getPackageManager()));

program.parse(process.argv);