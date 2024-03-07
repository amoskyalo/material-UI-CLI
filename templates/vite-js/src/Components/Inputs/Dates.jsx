import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl } from '@mui/material';

const DatesField = ({ size, name, label }) => {
    return (
        <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    size={size}
                    name={name}
                    label={label}
                    //onChange={} 
                   {...otherProps}
                />
            </LocalizationProvider>
        </FormControl>
    )
}

export default DatesField