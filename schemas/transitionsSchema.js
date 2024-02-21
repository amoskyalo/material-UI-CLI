//OBJECTIVES
// 1. Validate transtions is of type object;
// 2. Validate Validate durations is of type object;
// 3. Validate duration values are of type string or number;
// 4. Validate predefined durations: (short, shorter, shortest, standard, complex, enteringScreen, leavingScreen);

const chalk = require('chalk');
const { durationValidators } = require('../utils/constants');

function transitionSchema(transition) {
    if (typeof transition !== 'object') {
        console.log(chalk.red(new Error('Transition validation failed: should be an object but got ' + typeof transition)))
    }

    const { duration } = transition;

    const errors = {};
    const warnings = {};

    if (duration) {
        const { shortest, shorter, short, standard, complex, enteringScreen, leavingScreen } = duration;

        for (let [key, value] of Object.entries(duration)) {
            if (typeof value !== 'string' && typeof value !== 'number') {
                errors[key] = `> ${key} Duration values are defined in milliseconds (as numbers) or as strings that MUI recognizes and can parse, but found ${typeof value}`
            }
        }

        const durationValuesArray = [
            { name: 'shortest', value: shortest },
            { name: 'shorter', value: shorter },
            { name: 'short', value: short },
            { name: 'standard', value: standard },
            { name: 'complex', value: complex },
            { name: 'enteringScreen', value: enteringScreen },
            { name: 'leavingScreen', value: leavingScreen }
        ];

        for (let { name, value } of durationValuesArray) {
            if (!value) {
                warnings[name] = `MUI standard duration, ${name} is not present in your durations object`
            } else {
                const {
                    high: { value: highValue, message: highMessage },
                    low: { value: lowValue, message: lowMessage }
                } = durationValidators.find(v => v.name === name);

                if (value >= highValue) {
                    errors[name] = `> Error: ${name} has a high value, '${value}', ${highMessage}`
                }

                if (value <= lowValue) {
                    warnings[name] = `> Warning: ${name} has a low value, '${value}', ${lowMessage}`
                }
            }
        }
    }

    return { errors, warnings }
}

module.exports = transitionSchema;