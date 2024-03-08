const { exec } = require('child_process');
const { checkbox } = require('@inquirer/prompts');
const { componentChoices } = require('../utils/constants')
const chalk = require('chalk');
const ComponentGenerator = require('../utils/getComponentTemplate');

async function projectInit(projectName, installAll, architecture, tool, monorepoName) {
    function getTemplateUrl() {
        switch (tool) {
            case 'cra': return "https://github.com/amoskyalo/mui-cra-template";
            case 'vite': return "https://github.com/amoskyalo/vite-template"
            default: return null;
        }
    }

    console.log(chalk.green("info"), "Applying the following file system updates:");
    console.log(chalk.green("CREATE"), `${projectName} at`, chalk.green(`${process.cwd()}`));

    exec(`git clone ${getTemplateUrl()} ${projectName}`, (error) => {
        if (error) {
            throw new Error(error);
        }

        console.log(chalk.green("info"), "Done!");

        try {
            process.chdir(projectName);

            (async () => {
                const components = installAll ?
                    componentChoices.map(c => c.value) :
                    await checkbox({
                        message: "Which components would you like to install to your project?",
                        choices: componentChoices,
                        required: true,
                        pageSize: 10
                    });

                new ComponentGenerator(components, projectName, architecture, tool, monorepoName).generateComponent();
            })()

        } catch (error) {
            throw new Error(error);
        }
    })
}

module.exports = projectInit;