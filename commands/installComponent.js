const { input } = require('@inquirer/prompts');
const { logger } = require('../utils/logger');
const { componentChoices } = require('../utils/constants');
const path = require('path');
const fs = require('fs-extra');
const ComponentGenerator = require('../utils/singleComponentTemplate');

async function installComponent(componentName) {
    try {
        const component = componentChoices.find(c => c.value.name.toLowerCase() === componentName.toLowerCase());
        if (!component) {
            logger.error(`Component ${componentName} not found.`);
            return;
        }

        const destinationPath = await input({
            message: "Enter the path where you want the component to be scaffolded: Example ./src/components",
        });

        const resolvedPath = path.resolve(destinationPath);

        await fs.ensureDir(resolvedPath);
        logger.success(`Ensured directory at ${resolvedPath}`);

        const componentGenerator = new ComponentGenerator(component, resolvedPath);
        await componentGenerator.generateComponent();
        logger.success(`Successfully scaffolded ${component.value.name} at ${resolvedPath}`);
    } catch (error) {
        logger.error('An error occurred while scaffolding the component: ', error);
    }
}

module.exports = installComponent;
