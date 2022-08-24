import * as React from 'react';
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";


const ActionBarEl = styled.div`
    margin-bottom: 15px;
`

export default function ActionsBar() {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(`/lists`)
    }

    return (
        <ActionBarEl>
            <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
                Back To All Lists
            </Button>
        </ActionBarEl>
    );
}
