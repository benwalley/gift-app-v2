import * as React from 'react';
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import AddMoneyItem from "./AddMoneyItem";
import MoneyList from "./MoneyList";
import Tile from "../Home/Tile";




const MoneyContainerEl = styled.div`
    padding: 20px 20px 260px 20px;
    display: grid;
    gap: 20px;
    background: var(--background-color);
`

const MoneyContentEl = styled.div`
    
`



export default function Money(props) {
    const {} = props;

    return (
        <MoneyContainerEl>
            <h1>Money Tracker</h1>
            <Tile>
                <MoneyList/>
            </Tile>
            <Tile>
                <AddMoneyItem/>
            </Tile>
        </MoneyContainerEl>

    );
}
