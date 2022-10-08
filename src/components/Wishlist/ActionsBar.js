import * as React from 'react';
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams} from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import {Alert, Snackbar, Tooltip} from "@mui/material";
import {useState} from "react";


const ActionBarEl = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
`

export default function ActionsBar() {
    const navigate = useNavigate()
    const {wishlistId} = useParams()
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleBack = () => {
        navigate(`/lists`)
    }

    const handleShare = async () => {
        await navigator.clipboard.writeText(`${window.location.origin}/public/wishlist/${wishlistId}`);
        setSnackbarOpen(true)
    }

    return (
        <ActionBarEl>
            <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
                Back To All Lists
            </Button>
            <Tooltip title={"Copy Public link"}>
                <Button onClick={handleShare} startIcon={<ShareIcon />} sx={{marginLeft: 'auto'}}>
                    Share List
                </Button>
            </Tooltip>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message="Link copied to clipboard"
                autoHideDuration={2000}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Link copied to clipboard
                </Alert>
            </Snackbar>
        </ActionBarEl>
    );
}
