const paletteSchema = require('../schemas/paletteSchema');
const typographySchema = require('../schemas/typographySchema');
const breakpointsSchema = require('../schemas/breakpointsSchema');
const transitionSchema = require('../schemas/transitionsSchema');
const vm = require('vm');
const { createReadStream } = require('fs');
const { logger } = require('../utils/logger');
const { createInterface } = require('readline');
const { join } = require('path');

const defaultOptions = [
    { name: 'palette', schema: paletteSchema },
    { name: 'typography', schema: typographySchema },
    { name: 'breakpoints', schema: breakpointsSchema },
    { name: 'transitions', schema: transitionSchema }
];

function validator(options, ignoreWarn, filePath) {
    const themeErros = {};
    const themeWarnings = {};
    const fileOutput = [];
    let functionName;

    const stream = createReadStream(join(process.cwd(), filePath));
    const rl = createInterface({ input: stream, crlfDelay: Infinity });
    const context = vm.createContext();

    function p(errors, warnings) {
        Object.entries(errors).forEach(([key, value]) => themeErros[key] = value);
        Object.entries(warnings).forEach(([key, value]) => themeWarnings[key] = value);
    }

    rl.on('line', line => {
        if (line.includes('export')) {
            functionName = line.split(' ')[2];
        } else {
            fileOutput.push(line);
        }
    }).on('close', () => {
        const codeString = fileOutput.join('\n');

        function runCode() {
            const code = `${codeString}; ${functionName}();`;
            const results = vm.runInContext(code, context);
            return results;
        }

        const themeConfig = runCode();

        if (options.length !== 0) {
            for (let { name } of options) {
                if (themeConfig[name]) {
                    const d = defaultOptions.find(option => option.name === name);

                    if (d) {
                        const { errors, warnings } = d.schema(themeConfig[name]);
                        p(errors, warnings)
                    }
                } else {
                    logger.error(`${name.charAt(0).toUpperCase() + name.slice(1)} property not found in your theme.`);
                    process.exit(0);
                }
            }
        } else {
            for (let { name, schema } of defaultOptions) {
                if (themeConfig[name]) {
                    const { errors, warnings } = schema(themeConfig[name]);
                    p(errors, warnings)
                }
            }
        }

        const errorMessage = Object.values(themeErros).join("\n\t");
        const warningMessage = Object.values(themeWarnings).join("\n");

        const error = Boolean(Object.entries(themeErros).length > 0)

        error ? logger.error("\nTheme validation failed due to the following errors:\n\t" + errorMessage) : logger.success('Theme is valid!');

        Boolean(warningMessage) && !ignoreWarn ? logger.warn("\n" + warningMessage) : null;
    });
};

module.exports = validator;