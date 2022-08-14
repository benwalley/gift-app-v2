import React, {useState} from 'react';
import styled from "@emotion/styled";

import {currentUser} from "../../../state/selectors/currentUser";
import useRecoilHook from "../../../hooks/useRecoilHook";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {subUsers} from "../../../state/selectors/subUsers";
import UserAccordion from "./UserAccordion";

const ContainerEl = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    background: white;
   
`


export default function ProductPicker(props) {
    const {afterSubmit} = props
    const user = useRecoilHook(currentUser)
    const [selectedProducts, setSelectedProducts] = useState([]);
    const subusers = useRecoilHook(subUsers)

    const handleSubmit = (e) => {
        e.preventDefault();
        afterSubmit()
    }




    return (
        <ContainerEl onSubmit={(e) => handleSubmit(e, selectedProducts)}>
            <h2>Select products to add to this group</h2>
            <UserAccordion user={user}/>
            {subusers && subusers.map(subuser => {
                return <UserAccordion key={subuser.id} user={subuser}/>
            })}

            <Button variant={"contained"} type={"submit"}>Add Products</Button>
        </ContainerEl>
    );
}

