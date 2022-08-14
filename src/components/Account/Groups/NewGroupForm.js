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

    async function handleSubmit(e) {
        e.preventDefault()
        setProductModalOpen(true)
    }

    async function handleModalSubmit(e, products) {

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
                <ProductPicker afterSubmit={handleModalSubmit}/>
            </CustomModal>
            <SuccessSnackbar message={"Group Created"} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen}/>
        </ContainerEl>
    );
}

