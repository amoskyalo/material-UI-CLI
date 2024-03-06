const { spawn } = require('child_process');
const { checkbox } = require('@inquirer/prompts');
const { componentChoices } = require('../utils/constants')
const { logger } = require('../utils/logger');
const { getPackageManager } = require('../utils/getPackageManager');
const runInstall = require('../utils/runInstall');
const ComponentGenerator = require('../utils/getComponentTemplate');

//OBJECTIVES.
// 1. Check if node is present;
// 2. Check the node version if its present and if its unrecommended version show warning;
// 3. Run create react app;
// 4. Install material UI, and material UI icons;
// 5. Create components folder and install all components;

async function projectInit(appName, installAll, architecture) {
    // exec('node -v', (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(error);
    //     }

    //     if (stderr) {
    //         console.error();
    //     }

    //     // const v = stdout.toString();
    //     // const x = parseInt(v.slice(v.indexOf(1)));

    //     // if(x < 16){
    //     //     console.log(chalk.yellow(''))
    //     // }

    //     exec('npx create-react-app my-react-app', (error, stdout, stderr) => {
    //         if(error){
    //             console.log(error)
    //         }

    //         if(stderr){
    //             console.log(stderr)
    //         }

    //         console.log(stdout)
    //     })
    // });

    function getCommand() {
        switch (architecture) {
            case 'mono-repo': return { command: "yarn", args: ["create", "react-app", appName] };
            default: return { command: "npx", args: ["create-react-app", appName] }
        }
    }

    const { command, args } = getCommand();

    logger.success("\nSetting up react project...")

    const child = spawn("npx", ["create-react-app", appName], { shell: true, stdio: 'inherit' });

    child.on("error", error => {
        throw new Error(error);
    });

    child.on('close', () => {
        console.log("\n");

        try {
            process.chdir(appName);

            runInstall(getPackageManager(), async () => {
                const answers = installAll ?
                    componentChoices.map(c => c.value) :
                    await checkbox({
                        message: "Which components would you like to install to your project?",
                        choices: componentChoices
                    });

                new ComponentGenerator(answers, appName, architecture).generateComponent();
            });

        } catch (error) {
            throw new Error(error);
        }
    });

}

module.exports = projectInit;