const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { logger } = require('../utils/logger');
const ComponentGenerator = require('../utils/getComponentTemplate');

async function installComponent() {
    try {
        const categories = fs.readdirSync(path.join(__dirname, '..', 'templates')).filter(file => fs.statSync(path.join(__dirname, '..', 'templates', file)).isDirectory());

        const { category } = await inquirer.prompt([
            {
                type: 'list',
                name: 'category',
                message: 'Select the category for the component:',
                choices: categories,
            }
        ]);

        const components = fs.readdirSync(path.join(__dirname, '..', 'templates', category)).map(file => file.replace('.ejs', ''));

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'component',
                message: 'Select the component to install:',
                choices: components,
            },
            {
                type: 'input',
                name: 'path',
                message: 'Enter the path where you want to scaffold the component:',
                default: `./src/components/${category}`,
                validate: input => {
                    if (path.isAbsolute(input) || input.includes("..")) {
                        return 'Please enter a valid relative path from the project root.';
                    }
                    return true;
                }
            }
        ]);

        const targetPath = path.resolve(process.cwd(), answers.path, answers.component);
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
            new ComponentGenerator([{ name: answers.component, category }], targetPath).generateComponent();
            logger.success(`Component ${answers.component} has been scaffolded to ${targetPath}`);
        } else {
            logger.error(`Component ${answers.component} already exists at ${targetPath}`);
        }
    } catch (error) {
        logger.error('An error occurred while scaffolding the component: ', error);
    }
}

module.exports = installComponent;
