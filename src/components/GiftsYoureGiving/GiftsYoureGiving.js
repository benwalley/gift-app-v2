import React, {useEffect, useState} from 'react';
import GiftGivingOverview from "../Home/GiftGivingOverview";
import {Autocomplete, Paper, Stack} from "@mui/material";
import Tile from "../Home/Tile";
import HaventGottenList from "./HaventGottenList";
import NotGettingList from "./NotGettingList";
import {useIsMobile} from "../../hooks/useIsMobile";
import WantToGoInOnList from "./WantToGoInOnList";
import UserSelect from "../UserSelect/UserSelect";

//TODO: Make this work for subusers
export default function GiftsYoureGiving(props) {
    const {} = props
    const isMobile = useIsMobile();

    const containerStyles = {
        padding: 'var(--desktop-page-margin)',
        display: isMobile ? 'flex' : 'grid',
        flexDirection: 'column',
        gridTemplateColumns: '1fr',
        maxWidth: '1200px',
        gap: 'var(--desktop-page-margin)',
    }



    const haventGottenListStyles = {
        gridRow: 2,
        gridColumn: 2,
    }

    const notGettingListStyles = {
        gridRow: 3,
        gridColumn: 2,
    }

    const wantToGoInOnListStyles = {
        gridRow: 4,
        gridColumn: 1,
    }

    return (
        <div style={containerStyles}>
            <div style={{gridColumn: '1 / span 2', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
                <h1 >Gifts You're Giving</h1>
                <UserSelect/>
            </div>
            <Tile  sx={{gridRow: '2 / span 2'}}>
                <GiftGivingOverview/>
            </Tile>
            <Tile sx={wantToGoInOnListStyles}>
                <h3>Gifts You Want To Go In On</h3>
                <WantToGoInOnList/>
            </Tile>
            <Tile sx={haventGottenListStyles}>
                <h3>You Haven't Gotten A Gift For:</h3>
                <HaventGottenList/>

            </Tile>
            <Tile sx={notGettingListStyles}>
                <h3>You're Not Getting Gifts For:</h3>
                <NotGettingList/>
            </Tile>

        </div>
    );
}

