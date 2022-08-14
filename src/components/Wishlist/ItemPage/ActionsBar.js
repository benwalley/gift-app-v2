import * as React from 'react';
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams} from "react-router-dom";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {wishlistItemById} from "../../../state/selectors/wishlistItemById";

const ActionBarEl = styled.div`
    margin-bottom: 15px;
`

export default function ActionsBar(props) {
    let {itemId} = useParams();
    const itemData = useRecoilHook(wishlistItemById(itemId))
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(`/wishlist/${itemData.ownerId}`)
    }

    return (
        <ActionBarEl>
            <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
                Back To List
            </Button>
        </ActionBarEl>
    );
}
