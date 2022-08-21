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
    grid-template-rows: auto auto auto auto 1fr;
    gap: 20px;
    background: var(--background-color);
`

const H1El = styled.h1`
    margin: 5px 0;
`

export default function Money() {
    const updateMoney = useSetRecoilState(updateCurrentUserMoney)

    useEffect(() => {
        updateMoney(0)
    }, [updateMoney]);

    return (
        <MoneyContainerEl>
            <H1El>Money Tracker</H1El>
            <i>Money Tracker items are only visible to you, and are only for record keeping purposes. You can not make or request any payments from here.</i>
            <Tile>
                <MoneyList/>
            </Tile>
            <Tile>
                <AddMoneyItem/>
            </Tile>
        </MoneyContainerEl>

    );
}
