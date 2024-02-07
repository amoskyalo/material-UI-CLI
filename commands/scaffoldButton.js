const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');
const createButtonElement = require('../templates/button');
const { select, input } = require('@inquirer/prompts');

const booleanOptions = [{ name: "Yes", value: true }, { name: "No", value: false }];

async function promptButtonGenerate() {
    try {
        const buttonType = await select({
            message: "Do you want to generate a reusable component or a specific instance component?",
            choices: [
                { name: "Reusable Component", value: "Reusable Component" },
                { name: "Instance Component", value: "Instance Component" },
            ]
        });

        let componentProps;

        if (buttonType === "Instance Component") {
            const text = await input({ message: "Please enter button text" });
            const variant = await select({
                message: "Button variant",
                choices: [
                    { name: "Contained", value: "contained" },
                    { name: "Outlined", value: "outlined" }
                ]
            });
            const color = await input({ message: "Enter button color" })
            const size = await select({
                message: "Select button size",
                choices: [
                    { name: "Small", value: "small" },
                    { name: "Medium", value: "medium" },
                    { name: "Large", value: "large" }
                ]
            });
            const disabled = await select({ message: "Button disabled", choices: booleanOptions });
            const disableElevation = await select({ message: "Disable button elevation", choices: booleanOptions });
            const disableFocusRipple = await select({ message: "Disable focus ripple", choices: booleanOptions });
            const disableRipple = await select({ message: "Disable ripple", choices: booleanOptions })

            componentProps = { text, variant, color, size, disabled, disableElevation, disableFocusRipple, disableRipple }
        }

        const component = createButtonElement(buttonType, componentProps);

        const outputMethod = await select({
            message: "How would you like to output the generated button component?",
            choices: [
                { name: "Display in terminal", value: "terminal" },
                { name: "Write to a file", value: "file" },
            ]
        });

        if (outputMethod === "terminal") {
            console.log(boxen(component, { title: 'Button Component', titleAlignment: 'center', margin: 2, padding: 1 }));
            console.log(chalk.green("Button component created successfully!"));
        } else if (outputMethod === "file") {
            const buttonPath = await input({ message: "Enter button path" });

            await fs.writeFile(path.join(process.cwd(), buttonPath), component);

            console.log(chalk.green("Button component created successfully!"));
        }
    } catch (error) {
        console.log(chalk.red(error));
    }
}

module.exports = promptButtonGenerate;
