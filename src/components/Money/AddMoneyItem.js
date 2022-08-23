import * as React from 'react';
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import {FormControl, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import {useState} from "react";
import {DataStore} from "aws-amplify";
import {Money} from "../../models";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import {useSetRecoilState} from "recoil";
import {updateCurrentUserMoney} from "../../state/selectors/currentUserMoney";




const DesktopFormEl = styled.form`
    display: none;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    gap: 15px;
    position: relative;
    @media only screen and (min-width: 600px) {
        display: grid;
    }
`

const MobileFormEl = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    position: relative;
    @media only screen and (min-width: 600px) {
        display: none;
    }
`

const buttonStyles = {
    width: '100%',
}

const H2El = styled.h2`
    grid-column: 1/-1;
`

export default function AddMoneyItem(props) {
    const {} = props;
    const user = useRecoilHook(currentUser)
    const [from, setFrom] = useState()
    const [amount, setAmount] = useState()
    const [to, setTo] = useState()
    const [note, setNote] = useState()
    const updateMoney = useSetRecoilState(updateCurrentUserMoney)

    async function handleSubmit(e) {
        e.preventDefault();
        if(!user) return;
        const moneyData = {
            "owedFromName": from,
            "owedToName": to,
            "amount": parseFloat(amount),
            "ownerId": user?.id,
            "note": note,
        }
        const money = await DataStore.save(
            new Money(moneyData)
        );
        setFrom('')
        setTo('')
        setAmount('')
        setNote('')
        updateMoney(0)
    }

    return (
        <>
            <DesktopFormEl onSubmit={handleSubmit}>
                <H2El>Add Money Item</H2El>
                <b>From</b>
                <div></div>
                <b>To</b>
                <div></div>
                <b>Amount</b>
                <TextField value={from} onChange={(e) => setFrom(e.target.value)} id="from" label="Username" variant="outlined"/>
                <p>Owes</p>
                <TextField value={to} onChange={(e) => setTo(e.target.value)} id="to" label="Username" variant="outlined"/>
                <p>$</p>
                <TextField value={amount} onChange={(e) => setAmount(e.target.value)} id="amount" label="Amount" variant="outlined"/>
                <TextField sx={{gridColumn: '1/-1'}} value={note} onChange={(e) => setNote(e.target.value)} id="note" label="Note" variant="outlined"/>

                <Button type="submit" size={"large"} sx={buttonStyles} variant={"contained"} color={"primary"} sx={{gridColumn: '1/-1'}}>Add</Button>
            </DesktopFormEl>
            <MobileFormEl onSubmit={handleSubmit}>
                <H2El>Add Money Item</H2El>
                <TextField value={from} onChange={(e) => setFrom(e.target.value)} id="from" label="Username" variant="outlined"/>
                <TextField value={to} onChange={(e) => setTo(e.target.value)} id="to" label="Username" variant="outlined"/>
                <TextField value={amount} onChange={(e) => setAmount(e.target.value)} id="amount" label="$ Amount" variant="outlined"/>
                <TextField sx={{gridColumn: '1/-1'}} value={note} onChange={(e) => setNote(e.target.value)} id="note" label="Note" variant="outlined"/>
                <Button type="submit" size={"large"} sx={buttonStyles} variant={"contained"} color={"primary"} sx={{gridColumn: '1/-1'}}>Add</Button>
            </MobileFormEl>
        </>

    );
}
