import React, {useEffect, useState} from 'react';
import stringToColor from "../helpers/stringToColor";
import {getFirstLetters} from "../helpers/nameFirstLetters";
import {Avatar} from "@mui/material";

export default function UserAvatar(props) {
    const {sx, user, name} = props;

    return (
        <Avatar
            src={user?.image}
            sx={{bgcolor: stringToColor(name), ...sx}}
            alt={name}
        >
            {getFirstLetters(name)}
        </Avatar>
    );
}

