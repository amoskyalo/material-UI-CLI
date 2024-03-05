#!/usr/bin/env node

const { exec } = require('child_process')
const { program } = require('commander');
const { getPackageManager } = require('./utils/getPackageManager');
const { logger } = require('./utils/logger');
const { select, confirm, input } = require('@inquirer/prompts');
const CLI = require('clui');
const boxen = require('boxen');
const themeInit = require('./commands/themeInit');
const validateMUI = require('./utils/validateMaterial');
const validateTheme = require('./commands/validateTheme');
const projectInit = require('./commands/projectInit');
const monorepoInit = require('./commands/monorepoInit');

Spinner = CLI.Spinner;

const lerna_spinner = new Spinner('Installing lerna...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

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
    .action(async (options) => {
        const appName = process.argv[3];

        if (!appName) {
            logger.error("Project name must be provided");

            process.exit(1);
        }

        const tool = await select({
            message: "Choose your preferred tool for your project:",
            choices: [
                { name: "CRA", value: "cra" },
                { name: "Vite", value: "vite" },
                { name: "Next.js", value: "next.js" }
            ]
        });

        const architecture = await select({
            message: "Choose your preferred project architecture:",
            choices: [
                { name: "Monorepo", value: "mono-repo" },
                { name: "Polyrepo", value: "poly-repo" }
            ]
        });

        if (architecture === "mono-repo") {
            logger.info(boxen(`Since you've chosen a monorepo setup, we'll use Lerna to manage our packages. Lerna is ideal for monorepo management, simplifying tasks like versioning and publishing. Check out the docs: https://lerna.js.org/docs/getting-started`, { padding: 1 }))

            const monorepoName = await input({ message: "Enter your monorepo app name" });

            const useWorkspaces = await confirm({ message: "Would you like to integrate Yarn Workspaces with Lerna for better dependency management?" });

            if (useWorkspaces) {
                exec("lerna --version", async (error, stdout, stderr) => {
                    if (error && error.message.includes("'lerna' is not recognized")) {
                        const installLerna = await confirm({ message: "Lerna could not be found in your machine. Would you like to install it?" });
                        if (installLerna) {
                            lerna_spinner.start();
                            exec('npm install -g lerna', (error, stdout, stderr) => {
                                if (error) {
                                    throw new Error(error);
                                }

                                logger.info(stdout);
                                lerna_spinner.stop();

                                monorepoInit(monorepoName, () => projectInit(appName, options.all || false, architecture));
                            })
                        }
                    }

                    monorepoInit(monorepoName, () => projectInit(appName, options.all || false, architecture));
                })
            }
        } else {
            projectInit(appName, options.all || false, architecture);
        }
    });

program.command("package").action(() => console.log(getPackageManager()));

program.parse(process.argv);