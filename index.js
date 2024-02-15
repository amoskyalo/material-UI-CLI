const { program } = require('commander');
const themeInit = require('./commands/themeInit');
const validateMUI = require('./utils/validateMaterial');
const validateTheme = require('./commands/validateTheme');

program.version("0.0.1").description("Material UI CLI");

// generate theme template
program
    .command("init-theme")
    .description("Initialize theme")
    .option("-p, --primary [string], primary color option")
    .option("-s, --secondary [string], secondary color option")
    .option("-e, --error [string], error color option")
    .option("-w, --warning [string], warning color option")
    .option("-i, --info [string], info color option")
    .option("-x, --success [string], success color option")
    .action(options => validateMUI(() => themeInit(options)));

//validate theme;
program
    .command("theme-validate")
    .description("Validate theme")
    .option("-p, --palette [string], validate palette in theme")
    .option("-t, --typography [string], validate typography in theme")
    .option("-s, --spacing [string], validate spacing in theme")
    .option("-b, --breakpoints [string], validate breakpoints in theme")
    .option('-tr, --transition [string], validate transition in theme')
    .option('--path [string], path to theme file')
    .action(options => validateMUI(() => validateTheme(options)));

program.parse(process.argv);