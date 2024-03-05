const { mkdir, writeFile, readFile } = require('fs').promises;
const { componentsCategories, projectStructure } = require('../utils/constants');
const { logger } = require('../utils/logger');
const path = require('path');
const ejs = require('ejs');
const themeInit = require('../commands/themeInit');
const getEntryPointContents = require('../templates/appJsContents');
const getAppCssContents = require('../templates/appCSSContents');

class ComponentGenerator {
    constructor(components, appName) {
        this.components = components;
        this.appName = appName;
    }

    getComponentTemplate(name, category) {
        return path.join(__dirname, "..", 'templates', category, `${name}.ejs`);
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
                logger.success("Project setup done successfully! Here is your App Structure!\n")
                logger.success(projectStructure);
            }).catch(error => {
                throw error
            });
    }
}

module.exports = ComponentGenerator