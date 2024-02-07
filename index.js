const { program } = require('commander');
const themeInit = require('./commands/themeInit');
const validateMUI = require('./utils/validateMaterial')

program.version("0.0.1").description("Material UI CLI");

//generate theme template
program
    .command("init-theme")
    .description("Initialize theme")
    .option("-p, --primary [string], primary color option")
    .option("-s, --secondary [string], secondary color option")
    .option("-e, --error [string], error color option")
    .option("-w, --warning [string], warning color option")
    .option("-i, --info [string], info color option")
    .option("-x, --success [string], success color option")
    .action(options => validateMUI(() => themeInit(options)))

program.parse(process.argv)