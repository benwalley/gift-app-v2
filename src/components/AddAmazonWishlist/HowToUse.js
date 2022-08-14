import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import viewSource from '../../images/viewSource.png'
import Divider from "@mui/material/Divider";

export default function HowToUse() {
    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion sx={{borderRadius: '20px !important'}} expanded={expanded} onChange={() => setExpanded(!expanded)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <h3>{expanded ? "Hide Instructions" : "Show Instructions"}</h3>
            </AccordionSummary>
            <AccordionDetails>
                <Divider sx={{margin: '0 0 20px 0'}}/>
                <p>Find the amazon wishlist you want to import, and right click somewhere on the page. Then click "View Source"</p>
                <img width={"600px"} height={"365px"} src={viewSource} alt="How to View source"/>
                <p>That will open a page with lots of text/code. press CTRL + a (or CMD + a on Mac) to select everything.</p>
                <p>Copy the content by either right clicking and clicking copy, or using the hotkey CTRL + c (or CMD + c on Mac)</p>
                <p>Paste that content into the "Amazon wishlist page source" field on this page with either right click and click paste,
                    or using the hotkey CTRL + v (or CMD + v on Mac). Then click <b>"Get Wishlist Items"</b></p>
            </AccordionDetails>
        </Accordion>

    );
}

