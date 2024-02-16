const chalk = require("chalk");

function typographySchema(typography) {
    //OBJECTIVES:
    // 1. Validate font scalability; done
    // 2. Ensure all object properties are provided as objects; done
    // 3. Ensure all typographic fontSizes are in scalable units; done
    // 4. Ensure hierarchy in headings; done

    if (typeof typography !== 'object') {
        console.log(chalk.red(new Error('Typography validation failed: should be an object but got ' + typeof typography)))
    }

    const { h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, body1, body2, button, caption, overline, fontSize, inherit } = typography;

    const headings = [
        { name: 'h1', value: h1 },
        { name: 'h2', value: h2 },
        { name: 'h3', value: h3 },
        { name: 'h4', value: h4 },
        { name: 'h5', value: h5 },
        { name: 'h6', value: h6 }
    ]

    const objectProperties = [
        { name: "subtitle1", value: subtitle1 },
        { name: "subtitle2", value: subtitle2 },
        { name: 'body1', value: body1 },
        { name: 'body2', value: body2 },
        { name: 'button', value: button },
        { name: 'caption', value: caption },
        { name: 'overline', value: overline },
        { name: 'inherit', value: inherit },
        ...headings
    ];

    const warnings = {};
    const errors = {};

    function scalabilityUnits(font) {
        if (font && font.toString().includes('px')) {
            warnings.fontSize = "> Warning: To improve accessibility and responsiveness, consider using scalable units like 'rem' of '%'"
        }
    }

    function getFontSize(v) {
        const font = v.toString();

        switch (font) {
            case font.includes('px'): return font.slice(0, font.indexOf('p'));
            case font.includes('%'): return font.slice(0, font.indexOf('%'));
            case font.includes('rem'): return font.slice(0, font.indexOf('r'));
            default: return font
        }
    }

    function validateHeadingHierarchy(headings) {
        let previousSize = Infinity;
        let previousHeading = 'h1';

        for (let heading of headings) {
            if (heading && heading.value?.fontSize) {
                const currentSize = parseFloat(getFontSize(heading.value.fontSize));

                if (currentSize >= previousSize) {
                    warnings.hierachy = `> Warning: ${heading.name} in typography is not smaller than ${previousHeading}, breaking hierarchy.`
                }

                previousSize = currentSize;
                previousHeading = heading.name;
            }
        }
    }

    objectProperties.forEach(prop => {
        if (!prop.value) {
            warnings[prop.name] = `> Warning: ${prop.name}: not defined in your typography. But don't worry Material UI will use the default properties.`;
        }
        else {
            if (typeof prop.value !== 'object') {
                errors[prop.name] = `> Error: ${prop.name} in typography is expected to be an object but was provided as ${typeof prop.value}`;
            }

            scalabilityUnits(prop.fontSize)
        }
    });

    scalabilityUnits(fontSize);

    validateHeadingHierarchy(headings);

    return { warnings, errors };
}

module.exports = typographySchema;