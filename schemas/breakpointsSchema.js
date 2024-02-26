//OBJECTIVES:
// 1. Validate breakpoints data type;
// 2. Validate screen values; 
// 3. Validate each preceeding value is greater than the previous value.

const getNumberFromUnitValues = require("../utils/getNumFromUnitValues");
const { logger } = require('../utils/logger')

function breakpointsSchema(breakpoints) {
    if (typeof breakpoints !== 'object') {
        logger.error(new Error('Breakpoints validation failed: should be an object but got ' + typeof breakpoints));
    }

    const errors = {};
    const warnings = {};

    const { values } = breakpoints;

    if (typeof values !== 'object') {
        logger.error(new Error('Breakpoints validation failed: values should be an object but got ' + typeof values));
    }

    const { xs, sm, md, lg, xl } = values;

    const b = [
        { name: "xs", value: xs, recommended: 0 },
        { name: "sm", value: sm, recommended: 600 },
        { name: "md", value: md, recommended: 900 },
        { name: "lg", value: lg, recommended: 1200 },
        { name: "xl", value: xl, recommended: 1536 }
    ]

    function validateBreakpoints() {
        let prevValue = 0;
        let prevScreen = 'xs';

        for (let { name, value, recommended } of b) {
            if (!value) {
                warnings[name] = `> Waning: ${name} is missing from the breakpoints values.`;
            } else {
                const valueInNumber = parseFloat(getNumberFromUnitValues(value));

                if (valueInNumber < recommended) {
                    warnings[name] = `> Waning: ${name} screen value '${valueInNumber}px' is less than the recommended breakpoint value, '${recommended}px'`;
                }

                if (valueInNumber < prevValue) {
                    errors[name] = `> Error: ${name} screen is less that ${prevScreen} screen, hence breaking the hierarchy.`
                }

                prevValue = valueInNumber;
                prevScreen = name;
            }
        }
    };

    validateBreakpoints();

    return { warnings, errors }
};

module.exports = breakpointsSchema;