const { mkdir, writeFile, readFile, rename } = require('fs').promises;
const { componentsCategories, projectStructure } = require('../utils/constants');
const { logger } = require('../utils/logger');
const { exec } = require('child_process');
const CLI = require('clui');
const path = require('path');
const ejs = require('ejs');
const themeInit = require('../commands/themeInit');
const getEntryPointContents = require('../templates/Landing/ReactJsContents');
const getAppCssContents = require('../templates/Landing/ReactCSSContents');

Spinner = CLI.Spinner;

const spinner = new Spinner("Completing project setup. Please hold on, we're almost done!", ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
class ComponentGenerator {
    constructor(components, appName, tool, architecture) {
        this.components = components;
        this.appName = appName;
        this.architecture = architecture;
        this.tool = tool;
    }

    getComponentTemplate(name, category) {
        return path.join(__dirname, "..", 'templates', category, `${name}.ejs`);
    }

    finishProjectSetup() {
        if (this.architecture === 'mono-repo') {
            process.chdir("..");

            spinner.start();

            const moveProject = async () => {
                try {
                    await rename(path.join(process.cwd(), this.appName), path.join(process.cwd(), "packages", this.appName));
                } catch (error) {
                    throw error;
                }
            }

            function lernaClean() {
                return new Promise((resolve, reject) => {
                    exec('lerna clean -y', (error) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve();
                        }
                    });
                })
            }

            function installModules() {
                return new Promise((resolve, reject) => {
                    exec('npm install', (error) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve();
                        }
                    })
                });
            }

            Promise.all([moveProject(), lernaClean(), installModules()]).then(() => {
                spinner.stop();
                logger.info("Your monorepo project was created successfully!")
            }).catch((error) => {
                throw new Error(error);
            });
        }
        else {
            logger.success("Project setup done successfully!");
        }
    }

    generateComponent() {
        const componentsPath = path.join(process.cwd(), "src", "Components");
        const themePath = path.join(process.cwd(), "src", "Theme");
        const appJsEntryPath = path.join(process.cwd(), "src", "App.js");
        const appCSSPath = path.join(process.cwd(), "src", "App.css");

        const createComponentsDir = async () => {
            async function createCategory(category) {
                const categoryPath = path.join(componentsPath, category);
                try {
                    await mkdir(categoryPath, { recursive: true });
                } catch (error) {
                    throw error;
                }
            }

            const createComponentTemplate = async (name, category) => {
                const categoryPath = path.join(componentsPath, category);
                const templatePath = this.getComponentTemplate(name, category);
                const filesPath = path.join(categoryPath, `${name}.jsx`);

                async function templateRender() {
                    try {
                        const template = await readFile(templatePath, 'utf8');
                        const rendered = ejs.render(template);
                        return await writeFile(filesPath, rendered, 'utf8');
                    } catch (error) {
                        throw error;
                    }
                }

                return templateRender();
            }

            const componentsPromises = this.components.map(c => createComponentTemplate(c.name, c.category));
            const categoriesPromises = componentsCategories.map(c => createCategory(c))

            return Promise.all([...categoriesPromises, ...componentsPromises])
        }

        // create theme
        async function createTheme() {
            try {
                await mkdir(themePath);
                themeInit({}, false);
            } catch (error) {
                throw error
            }
        }

        // write new contents to app.js file
        async function updateEntryPath() {
            try {
                await writeFile(appJsEntryPath, getEntryPointContents())
            } catch (error) {
                throw error
            }
        }

        // write new content to app.css file
        async function updateEntryCSS() {
            try {
                await writeFile(appCSSPath, getAppCssContents());
            } catch (error) {
                throw error
            }
        }

        Promise.all([createComponentsDir(), createTheme(), updateEntryCSS(), updateEntryPath()])
            .then(() => {
                this.finishProjectSetup();
            }).catch(error => {
                throw error
            });
    }
}

module.exports = ComponentGenerator