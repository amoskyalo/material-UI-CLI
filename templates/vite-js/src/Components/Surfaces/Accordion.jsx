import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CustomAccordion = ({accordionsData}) => {
  return (
    <Box>
      {/* customize this according to your data */}
      {accordionsData.map((summary, details) => (
        <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls=`${summary}-content`
              id=`${summary}-header`
            >
              <Typography>{summary}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{details}</Typography>
            </AccordionDetails>
          </Accordion>
      ))}
    </Box>
  );
}

export default CustomAccordion