import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import Tile from "./Tile";

const DashboardBodyEl = styled.div`
    background: var(--background-color);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
   
`

export default function DashboardBody() {
    return (
        <DashboardBodyEl>
            <Tile type="primary">
                Money Overview
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

