import React, {useEffect, useState} from 'react';
import stringToColor from "../helpers/stringToColor";
import {getFirstLetters} from "../helpers/nameFirstLetters";
import {Avatar, Tooltip} from "@mui/material";
import useImageSrc from "../hooks/useImageSrc";

export default function UserAvatar(props) {
    const {sx, user, name} = props;
    const url = useImageSrc(user?.image)

    return (
        <Tooltip title={`${name || user?.username} ${user?.email ? `(${user.email})` : ''}`} disableInteractive={true}>
            <Avatar
                src={url}
                sx={{bgcolor: stringToColor(name), ...sx}}
                alt={name}
            >
                {getFirstLetters(name)}
            </Avatar>
        </Tooltip>
    );
}

