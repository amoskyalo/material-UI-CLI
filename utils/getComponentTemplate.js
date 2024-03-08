const { mkdir, writeFile, readFile, rename } = require('fs').promises;
const { componentsCategories } = require('../utils/constants');
const { logger } = require('../utils/logger');
const { exec } = require('child_process');
const CLI = require('clui');
const path = require('path');
const ejs = require('ejs');
const themeInit = require('../commands/themeInit');
const chalk = require('chalk');

Spinner = CLI.Spinner;

const spinner = new Spinner("Completing project setup. Please hold on, we're almost done!", ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
class ComponentGenerator {
    constructor(components, projectName, architecture, tool, monorepoName) {
        this.components = components;
        this.projectName = projectName;
        this.architecture = architecture;
        this.monorepoName = monorepoName;
        this.tool = tool;
    }

    getComponentTemplate(name, category) {
        return path.join(__dirname, "..", 'components', category, `${name}.ejs`);
    }

    finishProjectSetup() {
        if (this.architecture === 'mono-repo') {
            process.chdir("..");

            spinner.start();

            const moveProject = async () => {
                try {
                    await rename(path.join(process.cwd(), this.projectName), path.join(process.cwd(), "packages", this.projectName));
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

            Promise.all([moveProject(), lernaClean()]).then(() => {
                spinner.stop();
                console.log(chalk.green("success:"), "Your monorepo project was created successfully!");
                console.log("Run the following commands to get started:");
                logger.info(`\n\tcd ${this.monorepoName}\n\tnpm install\n\tlerna run start --scope <package name>\n`);
            }).catch((error) => {
                throw new Error(error);
            });
        }
        else {
            console.log(chalk.green("info"), "Project setup done successfully!");
            console.log("You can run the following commands to get started:");
            logger.info(`\n\tcd ${this.projectName}\n\tnpm install\n\t${this.tool === "cra" ? "npm start" : "npm run dev"}\n`)
        }
    }

    generateComponent() {
        const componentsPath = path.join(process.cwd(), "src", "Components");
        const themePath = path.join(process.cwd(), "src", "Theme");

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

        async function createTheme() {
            try {
                await mkdir(themePath);
                themeInit({}, false);
            } catch (error) {
                throw error
            }
        }

        Promise.all([createComponentsDir(), createTheme()]).then(() => {
            this.finishProjectSetup();
        }).catch(error => {
            throw error
        });
    }
}

module.exports = ComponentGenerator