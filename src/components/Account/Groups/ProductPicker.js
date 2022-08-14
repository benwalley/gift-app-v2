import React, {useState} from 'react';
import styled from "@emotion/styled";
import {currentUser} from "../../../state/selectors/currentUser";
import useRecoilHook from "../../../hooks/useRecoilHook";
import Button from "@mui/material/Button";
import {subUsers} from "../../../state/selectors/subUsers";
import UserAccordion from "./UserAccordion";
import {DataStore} from "aws-amplify";
import { WishlistItem} from "../../../models";

const ContainerEl = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    background: white;
   
`

export default function ProductPicker(props) {
    const {afterSubmit, groupId} = props
    const user = useRecoilHook(currentUser)
    const [selectedProducts, setSelectedProducts] = useState({});
    const subusers = useRecoilHook(subUsers)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!groupId) return;
        const itemIds = Object.entries(selectedProducts).map(item => {
            return selectedProducts[item[0]]
        }).flat()

        for(const id of itemIds) {
            const original = await DataStore.query(WishlistItem, id);
            const groupsCopy = [...original.groups];
            groupsCopy.push(groupId)
            await DataStore.save(WishlistItem.copyOf(original, updated => {
                updated.groups = groupsCopy;
            }))
        }
        afterSubmit()
    }

    function setChecked(userId, items) {
        const selectedCopy = {...selectedProducts};
        selectedCopy[userId] = items;
        setSelectedProducts({...selectedCopy})
    }

    return (
        <ContainerEl onSubmit={(e) => handleSubmit(e, selectedProducts)}>
            <h2>Select products to add to this group</h2>
            <UserAccordion user={user} checked={selectedProducts[user.id] || []} setChecked={setChecked}/>
            {subusers && subusers.map(subuser => {
                return <UserAccordion key={subuser.id} user={subuser} checked={selectedProducts[subuser.id] || []} setChecked={setChecked}/>
            })}

            <Button variant={"contained"} type={"submit"}>Add Products</Button>
        </ContainerEl>
    );
}

