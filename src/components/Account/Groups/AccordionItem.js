import React, {useEffect, useState} from 'react';

import {Checkbox, ListItem} from "@mui/material";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";




export default function AccordionItem(props) {
    const {item, checked, handleToggle} = props

    return (
        <ListItem key={item.id} divider disablePadding>
            <ListItemButton onClick={() => handleToggle(item.id)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(item.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': item.id }}
                    />
                </ListItemIcon>
                <ListItemText id={item.id} primary={item.name} />
            </ListItemButton>
        </ListItem>
    );
}

