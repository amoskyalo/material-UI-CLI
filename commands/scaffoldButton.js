const fs = require('fs').promises; // Use promise-based fs
const path = require('path');
const chalk = require('chalk');
const createButtonElement = require('../templates/button');
const { select, input } = require('@inquirer/prompts');

const booleanOptions = [{ name: "Yes", value: true }, { name: "No", value: false }];

async function promptButtonGenerate() {
    try {
        const buttonPath = await input({ message: "Enter button path" });

        const buttonType = await select({
            message: "Do you want to generate a reusable component or a specific instance component?",
            choices: [
                { name: "Reusable Component", value: "Reusable Component" },
                { name: "Instance Component", value: "Instance Component" },
            ]
        });

        let componentProps = {};

        if (buttonType === "Instance Component") {
            const prompts = [
                { type: input, name: 'text', message: "Please enter button text" },
                {
                    type: select, name: 'variant', message: "Button variant",
                    choices: [
                        { name: "Contained", value: "contained" },
                        { name: "Outlined", value: "outlined" }
                    ]
                },
                { type: input, name: 'color', message: "Enter button color" },
                {
                    type: select, name: 'size', message: "Select button size",
                    choices: [
                        { name: "Small", value: "small" },
                        { name: "Medium", value: "medium" },
                        { name: "Large", value: "large" }
                    ]
                },
                { type: select, name: 'disabled', message: "Button disabled", choices: booleanOptions },
                { type: select, name: 'disableElevation', message: "Disable button elevation", choices: booleanOptions },
                { type: select, name: 'disableFocusRipple', message: "Disable focus ripple", choices: booleanOptions },
                { type: select, name: 'disableRipple', message: "Disable ripple", choices: booleanOptions }
            ];

            const responses = await Promise.all(prompts.map(prompt => prompt.type(prompt)));

            responses.forEach(response => {
                componentProps = { ...componentProps, ...response };
            });
        }

        const component = createButtonElement(buttonType, componentProps);

        await fs.writeFile(path.join(process.cwd(), buttonPath), component);

        console.log(chalk.green("Button component created successfully!"));
    } catch (error) {
        console.log(chalk.red(error));
    }
}

module.exports = promptButtonGenerate;
