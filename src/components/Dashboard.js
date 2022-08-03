import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import DashboardDrawer from "./DashboardDrawer";
import { Outlet } from "react-router-dom";


const DashboardEl = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
`

export default function Dashboard() {
    return (
        <DashboardEl>
            <DashboardDrawer/>
            <Outlet/>
        </DashboardEl>

    );
}

