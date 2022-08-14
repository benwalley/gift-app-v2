import React, {useState} from 'react';
import useRecoilHook from "../../../hooks/useRecoilHook";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {wishlistByUserId} from "../../../state/selectors/wishlistByUserId";
import Divider from "@mui/material/Divider";




export default function UserAccordion(props) {
    const {user} = props
    const items = useRecoilHook(wishlistByUserId(user.id || ''))

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`${user.id}-content`}
                id={`${user.id}-header`}
            >
                {user.username}
            </AccordionSummary>
            <AccordionDetails>
                <Divider/>
                {items && items.map(item => {
                    return <div key={item.id}>{item.name}</div>
                })}
            </AccordionDetails>
        </Accordion>
    );
}

