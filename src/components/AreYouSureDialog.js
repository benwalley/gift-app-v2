import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Stack} from "@mui/material";

function SimpleDialog(props) {
    const { onClose, open, text, confirmText, cancelText } = props;

    const handleClose = (value) => {
        onClose(value);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            >
            <DialogTitle>{text}</DialogTitle>
            <Stack spacing={1} direction="row" sx={{
                padding: "20px",
                marginLeft: 'auto'
            }}>
                <Button onClick={() => handleClose(false)} variant={"outlined"}>{cancelText || "Cancel"}</Button>
                <Button onClick={() => handleClose(true)} variant={"contained"}>{confirmText || "Confirm"}</Button>
            </Stack>

        </Dialog>
    );
}


export default function AreYouSureDialog(props) {
    const {text, open, setOpen, confirmHandler, confirmText, cancelText} = props


    const handleClose = (value) => {
        setOpen(false);
        if(value) {
            confirmHandler(value)
        }
    };

    return (
            <SimpleDialog
                text={text}
                open={open}
                onClose={handleClose}
                confirmText={confirmText}
                cancelText={cancelText}
            />
    );
}
