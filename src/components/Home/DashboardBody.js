import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import Tile from "./Tile";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import Button from "@mui/material/Button";
import UserInfo from "./UserInfo";
import {Switch} from "@mui/material";
import SubuserToggle from "./SubuserToggle";
import GiftGivingOverview from "./GiftGivingOverview";
import SubuserOverview from "./SubuserOverview";
import GroupsOverview from "./GroupsOverview";

const DashboardBodyEl = styled.div`
    background: var(--background-color);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
    grid-template-rows: auto auto auto 1fr;
   
`

export default function DashboardBody() {
    const user = useRecoilHook(currentUser)


    return (
        <DashboardBodyEl>
            <Tile type="primary">
                <UserInfo/>
            </Tile>
            <Tile type="primary">
                <SubuserToggle/>
            </Tile>
            {user && !user.subuserModeOn && <Tile type="primary">
                <GiftGivingOverview/>
            </Tile>}
            <Tile type="primary">
                <SubuserOverview/>
            </Tile>
            <Tile type="primary">
                <GroupsOverview/>
            </Tile>
        </DashboardBodyEl>
    );
}

