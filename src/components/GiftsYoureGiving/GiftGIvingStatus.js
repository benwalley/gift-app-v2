import React, {useEffect, useState} from 'react';
import {ToggleButton, ToggleButtonGroup, Tooltip} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

export default function GiftGIvingStatus(props) {
    const {} = props
    return (
        <div>
            <p style={{margin: 0, fontSize: '0.8em'}}>Private</p>
            <ToggleButtonGroup
                exclusive

                aria-label="Gift Status"
                size={'small'}
                color={'secondary'}
            >
                <ToggleButton value="goingToGet" aria-label="Going to get">
                    <Tooltip title={"Going to get"} disableInteractive={true}>
                        <CheckBoxIcon/>
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value="ordered" aria-label="Ordered">
                    <Tooltip title={"Ordered"} disableInteractive={true}>
                        <StoreIcon/>
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value="gotten" aria-label="Gotten">
                    <Tooltip title={"Gotten"} disableInteractive={true}>
                        <LocalShippingIcon/>
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value="wrapped" aria-label="Wrapped">
                    <Tooltip title={"Wrapped"} disableInteractive={true}>
                        <CardGiftcardIcon/>
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}

