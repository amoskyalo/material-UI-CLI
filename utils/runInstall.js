const { exec } = require('child_process');
const chalk = require('chalk');
const CLI = require('clui');

Spinner = CLI.Spinner;

function runInstall(package) {
    const spinner = new Spinner('Installing materila UI...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

    spinner.start();

    const command = "@mui/material @emotion/react @emotion/styled";

    const c = package === "yarn" ? `yarn add ${command}` : `npm install ${command}`;

    exec(c, (error, stdout, __) => {
        if (error) {
            spinner.stop();
            console.log(chalk.red("Error while installing material UI", error))
        }

        spinner.stop();
        console.log(stdout);
        console.log(chalk.green("Material UI installed successfully!"))
    });
}

module.exports = runInstall