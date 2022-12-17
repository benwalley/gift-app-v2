import React from 'react';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";



export default function CustomAccordion(props) {
    const {title, children, expandIcon, containerSx, summarySx, detailsSx} = props

    return (
        <Accordion sx={containerSx} disableGutters={true}>
            <AccordionSummary
                sx={summarySx}
                expandIcon={expandIcon || <ExpandMoreIcon />}
            >
                {title || "Expand"}
            </AccordionSummary>
            <AccordionDetails sx={detailsSx}>
                {children || <span></span>}
            </AccordionDetails>
        </Accordion>
    );
}

