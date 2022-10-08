import * as React from 'react';
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams} from "react-router-dom";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {wishlistItemById} from "../../../state/selectors/wishlistItemById";
import {Alert, Snackbar, Tooltip} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {useState} from "react";

const ActionBarEl = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
`

export default function ActionsBar(props) {
    let {itemId} = useParams();
    const itemData = useRecoilHook(wishlistItemById(itemId))
    const navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handleShare = async () => {
        await navigator.clipboard.writeText(`${window.location.origin}/public/wishlist/item/${itemId}`);
        setSnackbarOpen(true)
    }


    const handleBack = () => {
        navigate(`/wishlist/${itemData.ownerId}`)
    }

    return (
        <ActionBarEl>
            <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
                Back To List
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
