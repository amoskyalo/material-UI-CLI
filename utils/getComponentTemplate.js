const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const chalk = require('chalk');
const CLI = require('clui');
const themeInit = require('../commands/themeInit');
const { componentsCategories, projectStructure } = require('../utils/constants');

Spinner = CLI.Spinner;

class ComponentGenerator {
    constructor(components, appName) {
        this.components = components;
        this.appName = appName;
    }

    getComponentTemplate(name) {
        return path.join(__dirname, "..", 'templates', `${name}.ejs`);
    }

    generateComponent() {
        // const spinner = new Spinner('Seting up components...', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

        // spinner.start();

        const componentsPath = path.join(process.cwd(), "src", "Components");
        const themePath = path.join(process.cwd(), "src", "theme");

        function getCategory(c) {
            switch (c) {
                case 'Layouts': return 'Layouts';
                case 'Inputs': return 'Inputs';
                case 'DataDisplay': return 'DataDisplay';
                case 'Feedback': return 'Feedback';
                case 'Surfaces': return 'Surfaces';
                case 'Navigation': return 'Navigation';
            }
        }

        fs.mkdir(componentsPath, (error, __) => {
            if (error) {
                throw new Error(err);
            }

            for (let componentCategory of componentsCategories) {

                fs.mkdir(path.join(componentsPath, componentCategory), (error, __) => {
                    if (error) {
                        throw new Error(err);
                    }
                })

                this.components.forEach(({ name, category }) => {
                    const templatePath = this.getComponentTemplate(name);

                    const filesPath = path.join(componentsPath, getCategory(category), `${name}.jsx`);

                    fs.readFile(templatePath, 'utf8', (err, template) => {
                        if (err) {
                            throw new Error(err);
                        }

                        const rendered = ejs.render(template);

                        fs.writeFile(filesPath, rendered, 'utf8', (err) => {
                            if (err) {
                                throw new Error(err);
                            }
                        });
                    });
                });

            }
        });

        fs.mkdir(themePath, (error, __) => {
            if (error) {
                throw new Error(error);
            }

            themeInit({}, false);
        })

        // spinner.stop();

        console.log(chalk.green("Project setup done successfully! Here is your App Structure!\n"));

        console.log(chalk.green(projectStructure))

    }
}

module.exports = ComponentGenerator