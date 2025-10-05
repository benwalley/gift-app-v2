import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Link, Typography } from '@mui/material';

const STORAGE_KEY = 'hideMigrationPopup';

export default function MigrationBanner() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const shouldHide = localStorage.getItem(STORAGE_KEY);
        if (!shouldHide) {
            setOpen(true);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDontShowAgain = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>New Version Available!</DialogTitle>
            <DialogContent>
                <Typography>
                    There's a new version of this site at{' '}
                    <Link href="https://wishlistwebsite.org" target="_blank" rel="noopener noreferrer">
                        wishlistwebsite.org
                    </Link>
                    !
                </Typography>
                <Typography>
                    Sometime in 2026, this version of the site will be turned off, and the new version will be moved to wishlistwebsite.com.
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Check out{' '}
                    <Link href="https://wishlistwebsite.org/how-to-use/import-from-old-site" target="_blank" rel="noopener noreferrer">
                        how to import your wishlist
                    </Link>
                    {' '}from this site to the new one.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDontShowAgain} color="primary">
                    Don't show again
                </Button>
                <Button onClick={handleClose} color="primary" variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
