import * as React from 'react';
import styled from "@emotion/styled";
import AddMoneyItem from "./AddMoneyItem";
import MoneyList from "./MoneyList";
import Tile from "../Home/Tile";
import {useSetRecoilState} from "recoil";
import {updateCurrentUserMoney} from "../../state/selectors/currentUserMoney";
import {useEffect} from "react";

const MoneyContainerEl = styled.div`
    padding: 20px 20px 260px 20px;
    display: grid;
    gap: 20px;
    background: var(--background-color);
`

export default function Money() {
    const updateMoney = useSetRecoilState(updateCurrentUserMoney)

    useEffect(() => {
        updateMoney(0)
    }, [updateMoney]);

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
