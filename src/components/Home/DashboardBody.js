import React, {useEffect} from 'react';
import styled from "@emotion/styled";
import Tile from "./Tile";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser, currentUserVersion} from "../../state/selectors/currentUser";
import UserInfo from "./UserInfo";
import SubuserToggle from "./SubuserToggle";
import SubuserOverview from "./SubuserOverview";
import GroupsOverview from "./GroupsOverview";
import Notes from "./Notes";
import {Auth, DataStore, SortDirection} from "aws-amplify";
import {Users} from "../../models";
import {Link} from "react-router-dom";

const DashboardBodyEl = styled.div`
    background: var(--background-color);
    display: grid;
    gap: 20px;
    padding: var(--mobile-page-margin);
    grid-template-rows: auto auto auto 1fr;
    max-width: var(--max-content-width);
    margin: 0 auto;
    
    @media only screen and (min-width: 1000px) {
        grid-template-columns: 1fr 1fr;
        padding: var(--desktop-page-margin);
    }
`

const H1El = styled.h1`
    grid-column: 1/-1;
`

export default function DashboardBody() {
    const user = useRecoilHook(currentUser)

    return (
        <DashboardBodyEl>
            <H1El>Dashboard</H1El>
            <Tile type="primary">
                <UserInfo/>
            </Tile>
            <Tile type="primary">
                <SubuserToggle/>
            </Tile>
            {user && !user?.subuserModeOn && <Tile type="primary">
                <h3>Gifts You're Giving</h3>
                <Link to='/giving'>See the gifts you're giving, and plan who you still want to get gifts for.</Link>
            </Tile>}
            <Tile type="primary">
                <SubuserOverview/>
            </Tile>
            <Tile type="primary">
                <GroupsOverview/>
            </Tile>
            <Tile>
                <Notes/>
            </Tile>
        </DashboardBodyEl>
    );
}

