import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import Tile from "./Tile";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import Button from "@mui/material/Button";
import UserInfo from "./UserInfo";

const DashboardBodyEl = styled.div`
    background: var(--background-color);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
   
`

export default function DashboardBody() {
    const user = useRecoilHook(currentUser)
    return (
        <DashboardBodyEl>
            <Tile type="primary">
                <UserInfo/>
            </Tile>
            <Tile type="primary">
                Gift giving overview
            </Tile>
            <Tile type="primary">
                SubUsers overview
            </Tile>
            <Tile type="primary">
                Groups Overview
            </Tile>
        </DashboardBodyEl>
    );
}

