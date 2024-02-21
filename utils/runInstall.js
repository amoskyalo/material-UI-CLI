const { exec, spawn } = require('child_process');
const chalk = require('chalk');
const CLI = require('clui');
const { installMUICommand } = require('../utils/constants')

Spinner = CLI.Spinner;

function runInstall(package, next) {
    console.log(chalk.green("Installing material UI...\n"));

    const child = spawn(
        package,
        [package === 'yarn' ? 'add' : 'install', installMUICommand],
        { stdio: 'inherit', shell: true }
    );

    child.on('error', error => {
        console.log(chalk.red(error));
    }).on('close', () => {
        console.log(chalk.green("Material UI installed successfully!\n"))
        if (typeof next === "function") next();
    });
}

module.exports = runInstall