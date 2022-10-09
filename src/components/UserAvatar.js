import React, {useEffect, useState} from 'react';
import stringToColor from "../helpers/stringToColor";
import {getFirstLetters} from "../helpers/nameFirstLetters";
import {Avatar} from "@mui/material";
import useImageSrc from "../hooks/useImageSrc";

export default function UserAvatar(props) {
    const {sx, user, name} = props;
    const url = useImageSrc(user?.image)

    return (
        <Avatar
            src={url}
            sx={{bgcolor: stringToColor(name), ...sx}}
            alt={name}
        >
            {getFirstLetters(name)}
        </Avatar>
    );
}

