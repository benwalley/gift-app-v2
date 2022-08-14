import React, {useState} from 'react';
import styled from "@emotion/styled";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {DataStore} from "aws-amplify";
import {currentUser} from "../../../state/selectors/currentUser";
import useRecoilHook from "../../../hooks/useRecoilHook";

import SuccessSnackbar from "../../Snackbars/SuccessSnackbar";
import {Groups} from "../../../models";
import {useSetRecoilState} from "recoil";
import {groupsByUserId, updateGroupsByUserId} from "../../../state/selectors/groupsByUserId";
import CustomModal from "../../CustomModal";
import ProductPicker from "./ProductPicker";
import {wishlistByUserId} from "../../../state/selectors/wishlistByUserId";

const ContainerEl = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    background: white;
    padding: var(--tile-padding);
    border-radius: 10px;
    box-shadow: var(--tile-box-shadow);
`

const FormEl = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
`

export default function NewGroupForm(props) {
    const user = useRecoilHook(currentUser)
    const [name, setName] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const updateGroup = useSetRecoilState(groupsByUserId(user?.id))
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [groupId, setGroupId] = useState();
    const updateLists = useSetRecoilState(wishlistByUserId(user.id))

    async function handleSubmit(e) {
        e.preventDefault()
        setProductModalOpen(true)
        if(!user) return;
        const groupData = {
            "groupName": name,
            "memberId": [user.id],
            "createdBy": user.id,
            "additionalAdmins": [],
            "parentId": user.id,
            "invitedEmail": []
        }
        const newGroup = await DataStore.save(
            new Groups(groupData)
        );
        setGroupId(newGroup.id)
        setName('')
        setSnackbarOpen(true)
        updateGroup(0)
    }

    async function handleModalSubmit(e, products) {
        updateLists(0)
        setProductModalOpen(false)
    }

    return (
        <ContainerEl>
            <h2>Create new group</h2>
            <p><i>Note: You will not be able to change the group name later</i></p>
            <FormEl onSubmit={handleSubmit}>
                <TextField value={name} onChange={(e) => setName(e.target.value)} id="name" label="Group Name" variant="outlined"/>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </FormEl>
            <CustomModal size={"large"} open={productModalOpen} setOpen={setProductModalOpen}>
                <ProductPicker afterSubmit={handleModalSubmit} groupId={groupId}/>
            </CustomModal>
            <SuccessSnackbar message={"Group Created"} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen}/>
        </ContainerEl>
    );
}

