import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



export default function CustomModal(props) {
    const {open, setOpen, size, children} = props
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
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
