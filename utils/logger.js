const chalk = require('chalk');

const logger = {
    log: (...args) => {
        console.log(...args)
    },
    info: (...args) => {
        console.log(chalk.cyan(...args))
    },
    success: (...args) => {
        console.log(chalk.green(...args))
    },
    warn: (...args) => {
        console.log(chalk.yellow(...args))
    },
    error: (...args) => {
        console.log(chalk.red(...args))
    }

};

module.exports = {
    logger
}