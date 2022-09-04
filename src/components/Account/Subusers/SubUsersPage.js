import styled from "@emotion/styled";
import SubUser from "./SubUser";
import {subUsers, updateSubUsers} from "../../../state/selectors/subUsers";
import useRecoilHook from "../../../hooks/useRecoilHook";
import AddSubuserForm from "./AddSubuserForm";
import List from "@mui/material/List";
import {useSetRecoilState} from "recoil";
import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

const ContainerEl = styled.div`
    padding: var(--mobile-page-margin);
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    grid-template-rows: auto auto 1fr;
    background: var(--background-color);
    max-width: var(--max-content-width);
  margin: 0 auto;
    
    @media only screen and (min-width: 1000px) {
        padding: var(--desktop-page-margin);
    }
`

const listStyles = {
    background: 'white',
    padding: 'var(--tile-padding)',
    borderRadius: '10px',
    boxShadow: 'var(--tile-box-shadow)'
}

export default function SubUsersPage(props) {
    const subusers = useRecoilHook(subUsers)
    const update = useSetRecoilState(updateSubUsers)
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        update(0)
    }, [update]);

    return (
        <ContainerEl>
            <Accordion sx={{borderRadius: '20px !important', overflow: 'auto'}} expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h3>{expanded ? "Hide Instructions" : "Show Instructions"}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider></Divider>
                    <p>Sub-lists allow you to create additional wishlists in addition to your main list.</p>
                    <h3>Subusers</h3>
                    <p>Create a sub-list for other users who don't have an email address or don't want to create an account.</p>
                    <p>You will be able </p>
                    <p>Turn on the<em>Is User</em> toggle.
                        This allows you to to add and edit items in their list, and will allow you to see what people are getting them.</p>
                    <h3>Personal Lists</h3>
                    <p>To create an additional list for yourself, don't turn on <em>Is User</em>.
                        This will prevent you from seeing what people are getting you from that list.</p>
                </AccordionDetails>
            </Accordion>
            <AddSubuserForm/>
            <List dense disablePadding={true} sx={listStyles}>
                {subusers && subusers.map(user => {
                    return <SubUser key={user?.id} user={user}/>
                })}
            </List>
        </ContainerEl>
    );
}

