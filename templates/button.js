function createButtonElement(componentType, buttonProps) {
    const { text, variant, color, ...otherButtonProps } = buttonProps || {};

    const otherPropsString = Object.entries(otherButtonProps)
        .map(([key, value]) => {
            if (value === true) {
                return `${key}`;
            } else if (value !== false) {
                return `${key}={"${value}"}`
            }
        })
        .join('\n            ');

    console.log(otherButtonProps)

    const reusableComponent = `
    import { Button } from '@mui/material';

    const CustomButton = ({ text, variant, color = "primary", ...props }) => (
        <Button 
            variant={variant} 
            color={color}
            {...props}
        >
            {text}
        </Button>
    )

    export default CustomButton
    `;

    const specificInstanceComponent = `
    import { Button } from '@mui/material';

    const CustomButton = () => (
        <Button 
            variant="${variant}"
            color="${color || 'primary'}"
            ${otherPropsString && `${otherPropsString}`}
        >
            ${text}
        </Button>
    )

    export default CustomButton
    `;

    return componentType === "Reusable Component" ? reusableComponent : specificInstanceComponent;
}

module.exports = createButtonElement;
