const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const CLI = require('clui');
const themeInit = require('../commands/themeInit');
const getEntryPointContents = require('../templates/appJsContents');
const getAppCssContents = require('../templates/appCSSContents');
const { componentsCategories, projectStructure } = require('../utils/constants');
const { logger } = require('../utils/logger');

Spinner = CLI.Spinner;

class ComponentGenerator {
    constructor(components, appName) {
        this.components = components;
        this.appName = appName;
    }

    getComponentTemplate(name, category) {
        return path.join(__dirname, "..", 'templates', category, `${name}.ejs`);
    }

    generateComponent() {
        // const spinner = new Spinner('Seting up components...', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

        // spinner.start();

        const componentsPath = path.join(process.cwd(), "src", "Components");
        const themePath = path.join(process.cwd(), "src", "Theme");
        const appJsEntryPath = path.join(process.cwd(), "src", "App.js");
        const appCSSPath = path.join(process.cwd(), "src", "App.css")

        function getCategory(c) {
            switch (c) {
                case 'Layouts': return 'Layouts';
                case 'Inputs': return 'Inputs';
                case 'DataDisplay': return 'DataDisplay';
                case 'Feedback': return 'Feedback';
                case 'Surfaces': return 'Surfaces';
                case 'Navigation': return 'Navigation';
                case 'Switch': return 'Switch';
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
                    // console.log(name, category)
                    const templatePath = this.getComponentTemplate(name, category);

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

        // create theme
        fs.mkdir(themePath, (error, __) => {
            if (error) {
                throw new Error(error);
            }

            themeInit({}, false);
        });

        // write new contents to app.js file
        fs.writeFile(appJsEntryPath, getEntryPointContents(), (error, __) => {
            if (error) {
                throw new Error(error);
            }
        });

        // write new content to app.css file
        fs.writeFile(appCSSPath, getAppCssContents(), (error, __) => {
            if (error) {
                throw new Error(error);
            }
        });

        // spinner.stop();

        logger.success("Project setup done successfully! Here is your App Structure!\n")

        logger.success(projectStructure)

    }
}

module.exports = ComponentGenerator