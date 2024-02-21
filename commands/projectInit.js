const { exec, spawn } = require('child_process');
const { checkbox } = require('@inquirer/prompts');
const CLI = require('clui');
const runInstall = require('../utils/runInstall');
const chalk = require('chalk');
const ComponentGenerator = require('../utils/getComponentTemplate');

//OBJECTIVES.
// 1. Check if node is present;
// 2. Check the node version if its present and if its unrecommended version show warning;
// 3. Run create react app;
// 4. Install material UI, and material UI icons;
// 5. Create components folder and install all components;

async function projectInit(appName) {
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

    console.log(chalk.green("\nSetting up react project..."));

    const child = spawn('npx', ['create-react-app', appName], { shell: true, stdio: 'inherit' });

    child.on('close', () => {
        console.log("\n");

        try {
            process.chdir(appName);

            runInstall("npm", async () => {
                const answers = await checkbox({
                    message: "Which components would you want to install?",
                    choices: [
                        { name: "App Bar", value: { name: "AppBar", category: "Layouts" } },
                        { name: "AutoComplete", value: { name: "AutoComplete", category: "Inputs" } },
                        { name: "DataGrid", value: { name: "DataGrid", category: "DataDisplay" } },
                        { name: "Dates", value: { name: "Dates", category: "Inputs" } },
                        { name: "Select", value: { name: "Select", category: "Inputs" } },
                        { name: "Tabs", value: { name: "Tabs", category: "Navigation" } },
                        { name: "TextField", value: { name: "TextField", category: "Inputs" } }
                    ]
                });

                new ComponentGenerator(answers, appName).generateComponent();
            });

        } catch (error) {
            throw new Error(error);
        }
    });
}

module.exports = projectInit;