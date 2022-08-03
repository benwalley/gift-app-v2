import * as React from 'react';
import Card from '@mui/material/Card';



export default function Tile(props) {
    const {children, type} = props;

    return (
        <div>
            <Card raised={true} sx={{
                minWidth: 275,
                minHeight: 200,
                bgcolor: `var(--${type}-color)`,
                borderRadius: '20px'
            }}>
                {children}
            </Card>
        </div>

    );
}
