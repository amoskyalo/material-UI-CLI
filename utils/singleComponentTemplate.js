const { writeFile, readFile } = require('fs').promises;
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const { logger } = require('../utils/logger');

class ComponentGenerator {
    constructor(component, destinationPath) {
        this.component = component;
        this.destinationPath = destinationPath;
    }

    getComponentTemplate() {
        return path.join(__dirname, "..", 'templates', this.component.value.category, `${this.component.value.name}.ejs`);
    }

    async generateComponent() {
        try {
            const templatePath = this.getComponentTemplate();
            const filesPath = path.join(this.destinationPath, `${this.component.value.name}.jsx`);
            const template = await readFile(templatePath, 'utf8');
            const rendered = ejs.render(template);
            await writeFile(filesPath, rendered, 'utf8');
            logger.success(`Component ${this.component.name} generated successfully.`);
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ComponentGenerator;
