import React, {useState} from 'react';
import styled from "@emotion/styled";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import useRecoilHook from "../../hooks/useRecoilHook";
import {groupsByUserId} from "../../state/selectors/groupsByUserId";
import {currentUser} from "../../state/selectors/currentUser";
import AreYouSureDialog from "../AreYouSureDialog";
import {useNavigate} from "react-router-dom";

const ContainerEl = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  
`


export default function AddWishlistForm(props) {
    const {source, setSource, afterSubmit} = props
    const [areYouSureOpen, setAreYouSureOpen] = useState(false)
    const user = useRecoilHook(currentUser)
    const groups = useRecoilHook(groupsByUserId(user.id))
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        if( groups && groups.length > 0) {
            afterSubmit()

        } else {
            setAreYouSureOpen(true)
        }
    }

    return (
        <ContainerEl onSubmit={handleSubmit}>
            <TextField multiline rows={10} value={source} onChange={(e) => setSource(e.target.value)} id="source" label="Amazon wishlist page source" variant="outlined"/>
            <Button type={"submit"} variant={"contained"}>Get Wishlist Items</Button>
            <AreYouSureDialog
                text={`You must create or join a group in order to add items to your wishlist.`}
                open={areYouSureOpen}
                setOpen={setAreYouSureOpen}
                confirmHandler={() => navigate('/account/groups')}
                confirmText={"Go To Groups Page"}
            />
        </ContainerEl>
    );
}

