import React from 'react';
import {Tooltip} from "@mui/material";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export default function SubuserIcon() {
    return (
        <Tooltip title={'This user is a sub-user'}>
            <SupervisedUserCircleIcon color={'primary'}/>
        </Tooltip>
    );
}

