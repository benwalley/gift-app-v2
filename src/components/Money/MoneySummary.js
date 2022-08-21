import * as React from 'react';
import styled from "@emotion/styled";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUserMoney} from "../../state/selectors/currentUserMoney";
import {useEffect, useState} from "react";
import useCurrency from "../../hooks/useCurrency";

const MoneySummaryContainerEl = styled.div`
    font-size: 18px;
    padding: 20px 0;
    letter-spacing: 2px;
`

export default function MoneySummary(props) {
    const {p1, p2} = props;
    const moneyData = useRecoilHook(currentUserMoney);
    const [amountOwed, setAmountOwed] = useState()
    const renderedAmount = useCurrency(amountOwed)
    const [calculatedFrom, setCalculatedFrom] = useState()
    const [calculatedTo, setCalculatedTo] = useState()

    useEffect(() => {
        if(!moneyData) return;
        const filtered = moneyData.filter(item => {
            const p1Match = p1 && p1 !== '' ? item.owedFromName === p1 || item.owedToName === p1 : true;
            const p2Match = p2 && p2 !== '' ? item.owedToName === p2 || item.owedFromName === p2 : true;
            return p1Match && p2Match;
        })

        // calculate total
        let amount = 0;
        for(const moneyItem of filtered) {
            if(moneyItem.owedFromName === p1) {
                amount += moneyItem.amount;
            } else {
                amount -= moneyItem.amount;
            }
        }
        setAmountOwed(Math.abs(amount))
        if(amount >= 0) {
            setCalculatedFrom(p1)
            setCalculatedTo(p2)
        } else {
            setCalculatedFrom(p2)
            setCalculatedTo(p1)
        }
    }, [moneyData, p1, p2]);

    return (
        <>
            {(calculatedFrom || calculatedTo) && (p1 || p2) && <MoneySummaryContainerEl>
                <span>{calculatedFrom || "other people"}</span>
                <span> owes </span>
                <span>{calculatedTo || "other people"}</span>
                <span> {renderedAmount}</span>
            </MoneySummaryContainerEl>}
        </>
    );
}
