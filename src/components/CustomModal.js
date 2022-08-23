import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";


export default function CustomModal(props) {
    const {open, setOpen, size, children, padding = "20px"} = props

    const handleClose = () => setOpen(false);

    const getSize = () => {
        if(size === "large") return 900;
        if(size === "small") return 400;
        return 400;
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: getSize(),
        maxWidth: '90%',
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: padding,
        overflow: 'auto',
        borderRadius: '20px'
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        size="medium"
                        aria-label="close"
                        color="inherit"
                        bgcolor="primary"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
