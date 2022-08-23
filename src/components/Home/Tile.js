import * as React from 'react';
import Card from '@mui/material/Card';

export default function Tile(props) {
    const {children} = props;

    return (
        <div>
            <Card raised={true} sx={{
                minWidth: 275,
                minHeight: 150,
                bgcolor: `white`,
                borderRadius: '20px',
                padding: {xs: 'var(--mobile-tile-padding)', sm: 'var(--desktop-tile-padding)'},
                height: '100%'
            }}>
                {children}
            </Card>
        </div>

    );
}
