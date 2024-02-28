const { spawn } = require('child_process');
const { logger } = require('../utils/logger')
const CLI = require('clui');
const { installMUICommand } = require('../utils/constants')

Spinner = CLI.Spinner;

function runInstall(package, next) {
    logger.success(`Installing material UI using ${package}...\n`);

    const child = spawn(
        package,
        [['yarn', 'pnpm', 'bun'].includes(package) ? 'add' : 'install', installMUICommand],
        { stdio: 'inherit', shell: true }
    );

    child.on('error', error => {
        logger.error(error);
    }).on('close', () => {
        logger.success("Material UI installed successfully!\n");
        if (typeof next === "function") next();
    });
}

module.exports = runInstall