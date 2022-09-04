import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import endOfList from '../../images/endOfList.png'
import inspect from '../../images/inspect.png'
import console from '../../images/console.png'
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

export default function HowToUse() {
    const [expanded, setExpanded] = useState(false);

    const copyCopyCode = () => {
        navigator.clipboard.writeText("document.addEventListener('click', () => {\n" +
            "        setTimeout(() => {\n" +
            "            const html = document.body.innerHTML\n" +
            "            navigator.clipboard.writeText(html);\n" +
            "        }, 100)\n" +
            "    })")
    }

    return (
        <Accordion sx={{borderRadius: '20px !important', overflow: 'auto'}} expanded={expanded} onChange={() => setExpanded(!expanded)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <h3>{expanded ? "Hide Instructions" : "Show Instructions"}</h3>
            </AccordionSummary>
            <AccordionDetails>
                <Divider sx={{margin: '0 0 20px 0'}}/>
                <i>Sorry this is so complicated.</i>
                <p>Amazon will only load a few products until you scroll down on the page. So to copy the source for lots it items you will have to scroll down to make sure it loads them all</p>
                <p>Start by clicking this button.</p>
                <Button variant={"contained"} onClick={copyCopyCode}>Click me to copy the code which will copy the page source</Button>
                <p>Then go to the Amazon wishlist you want to import, and scroll all the way down on the page, until it stops loading more items and says "end of list".
                    This will make sure you get all of the items</p>
                <img width={"600px"} height={"365px"} src={endOfList} alt="End Of List"/>
                <p>Then right click, and click "inspect</p>
                <img width={"600px"} height={"365px"} src={inspect} alt="Inspect"/>
                <p>Click the console tab at the top</p>
                <img width={"600px"} height={"365px"} src={console} alt="Console"/>
                <p>Paste the code into the field by pressing CTRL + v (or CMD + V on Mac) or right clicking and clicking paste.
                It should paste this code.</p>
                <code>
                    {"document.addEventListener('click', () => {\n" +
                        "        setTimeout(() => {\n" +
                        "            const html = document.body.innerHTML\n" +
                        "            navigator.clipboard.writeText(html);\n" +
                        "        }, 100)\n" +
                        "    })"}
                </code>
                <p>Click enter, then click somewhere on the amazon wishlist page. That will copy the source code to your clipboard.</p>
                <p>Paste that content into the "Amazon wishlist page source" field on this page with either right click and click paste,
                    or using the hotkey CTRL + v (or CMD + v on Mac). Then click <b>"Get Wishlist Items"</b></p>
            </AccordionDetails>
        </Accordion>

    );
}

