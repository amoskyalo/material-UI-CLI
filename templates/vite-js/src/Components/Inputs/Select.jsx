import { Select, OutlinedInput, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const SelectInput = ({options, name, label, error, helperText, size, ...otherProps}) => {
    return (
        <FormControl 
            sx={{ width: "100%" }} 
            size={size} 
            key={label}
        >
            <Select
                labelId={`${name}-label`}
                id={name}
                label={label}
                name={name}
                error={error}
                helperText={error && helperText}
                input={<OutlinedInput label={label} />}
                onChange={e => {
                    //onchange function here
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 300, // customize
                            overflowY: 'auto', // custmize
                        },
                    },
                }}
                {...otherProps}
            >
            {/* make sure to customize this section according to your data */}
            {options.map((option) => (
                <MenuItem key={option} value={option}>option</MenuItem>
            ))}
            </Select>
    </FormControl>
    )
};

export default SelectInput