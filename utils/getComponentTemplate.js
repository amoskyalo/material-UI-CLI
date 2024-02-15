const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { stdout } = require('process');

class ComponentGenerator {
    constructor(isDisplay, childrenProp, importStatement, componentType, props, writePath) {
        this.componentType = componentType;
        this.props = props;
        this.importStatement = importStatement;
        this.isDisplay = isDisplay;
        this.childrenProp = childrenProp;
        this.writePath = writePath;
    }

    generatePropsString() {
        const propsCopy = { ...this.props };
        delete propsCopy.componentType;
        delete propsCopy[this.childrenProp]
        return Object.entries(propsCopy)
            .map(([key, value]) => {
                if (value === true) {
                    return `${key}`;
                } else if (value !== false) {
                    return `${key}={"${value}"}`;
                }
                return '';
            })
            .filter(entry => entry)
            .join('\n                ');
    }

    scaffoldComponent() {
        const propsString = this.generatePropsString();
        const isDisplay = this.isDisplay;
        const cp = this.childrenProp;
        const propsCopy = { ...this.props };

        let componentTemplate;

        if (!isDisplay) {
            componentTemplate = `
                ${this.importStatement}
                
                const Custom${this.componentType} = (props) => (
                    <${this.componentType} 
                        ${propsString}
                    >
                        ${propsCopy[cp]}
                    </${this.componentType}>
                );
                
                export default Custom${this.componentType};
                `.trim();
        }
        return componentTemplate;
    }

    generateComponentTemplate() {
        const component = this.scaffoldComponent();

        try {
            fs.writeFile(path.join(process.cwd(), this.writePath), component, (error, data) => {
                if (!error && data) {
                    stdout.write(chalk.green("Component created successfully!"))
                }
            })
        } catch (error) {
            stdout.write(error)
        }
    }
}

module.exports = ComponentGenerator