import React from 'react';
import {Alert, IconButton, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function ErrorSnackbar(props) {
    const {message, snackbarOpen, setSnackbarOpen, time} = props

    const handleCloseSnackbar = () => setSnackbarOpen(false)

    const closeAction = (
        <>
            <IconButton
                size="medium"
                aria-label="close"
                color="inherit"
                bgcolor="primary"
                onClick={handleCloseSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={time || 6000}
            onClose={handleCloseSnackbar}
            message={message}
            action={closeAction}
        >
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

