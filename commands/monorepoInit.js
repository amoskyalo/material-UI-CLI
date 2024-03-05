const { spawn } = require('child_process');
const { join } = require('path');
const { logger } = require('../utils/logger');
const { mkdir, writeFile } = require('fs').promises;

const lernaJsonContent = `{
    "$schema": "node_modules/lerna/schemas/lerna-schema.json",
    "version": "0.1.0",
    "npmClient": "yarn"
  }`

function monorepoInit(monorepoName, next) {
    logger.info("Setting your project with lerna init...");

    async function createMonorepoApp() {
        try {
            await mkdir(monorepoName);
        } catch (error) {
            throw new Error(error);
        }
    }

    Promise.all([createMonorepoApp()]).then(() => {
        process.chdir(monorepoName);

        const lerna_child_process = spawn('lerna', ['init'], { shell: true, stdio: 'inherit' });

        lerna_child_process.on('close', async () => {
            async function createPackagesFolder() {
                try {
                    await mkdir(join(process.cwd(), "packages"));
                } catch (error) {
                    throw error;
                }
            }

            async function updateLernaJson() {
                try {
                    await writeFile(join(process.cwd(), "lerna.json"), lernaJsonContent);
                } catch (error) {
                    throw error;
                }
            }

            Promise.all([createPackagesFolder(), updateLernaJson()]).then(() => {
                process.chdir('packages');

                next();
            }).catch((error) => { throw error });
        })
    }).catch((error) => { throw error });
};

module.exports = monorepoInit;