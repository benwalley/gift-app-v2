import * as React from 'react';
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";

const ActionBarEl = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
`

export default function PublicActionsBar(props) {
    let {itemData} = props;
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(`/public/wishlist/${itemData.ownerId}`)
    }

    return (
        <ActionBarEl>
            <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
                Back To List
            </Button>
        </ActionBarEl>
    );
}
