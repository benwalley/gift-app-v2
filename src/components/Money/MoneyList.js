import * as React from 'react';
import styled from "@emotion/styled";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUserMoney} from "../../state/selectors/currentUserMoney";
import {
    FormControl,
    InputLabel, MenuItem, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import MoneyItem from "./MoneyItem";
import Button from "@mui/material/Button";
import MoneySummary from "./MoneySummary";

const FiltersEl = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 20px;
    padding: 10px 0;
`

const H3El = styled.h3`
    margin: 0;
    grid-column: 1/-1;
`

export default function MoneyList() {
    const moneyData = useRecoilHook(currentUserMoney)
    const [userOne, setUserOne] = useState('')
    const [userTwo, setUserTwo] = useState('')
    const [userOneNamesList, setUserOneNamesList] = useState([])
    const [userTwoNamesList, setUserTwoNamesList] = useState([])
    const [filteredList, setFilteredList] = useState([])

    useEffect(() => {
        const updateUserNames = () => {
            const names =  moneyData.map(item => {
                return [item.owedFromName, item.owedToName];
            }).flat()

            const oneNames = names.filter(name => {
                return name !== userTwo
            })

            const twoNames = names.filter(name => {
                return name !== userOne
            })

            setUserOneNamesList([...new Set(oneNames)])
            setUserTwoNamesList([...new Set(twoNames)])
        }

        const filtered = moneyData.filter(item => {
            const userOneMatches = userOne === '' || item.owedFromName === userOne || item.owedToName === userOne;
            const userTwoMatches = userTwo === '' || item.owedToName === userTwo || item.owedFromName === userTwo;
            return userOneMatches && userTwoMatches
        })
        updateUserNames()
        setFilteredList(filtered)
    }, [userOne, userTwo, moneyData]);

    const handleClearFilters = (e) => {
        e.preventDefault()
        setUserOne('')
        setUserTwo('')
    }

    return (
        <>
            <FiltersEl>
                <H3El>Filter</H3El>
                <FormControl fullWidth>
                    <InputLabel id="from-label">User 1</InputLabel>
                    <Select
                        labelId="from-label"
                        value={userOne}
                        label="From"
                        onChange={(e) => setUserOne(e.target.value)}
                    >
                        <MenuItem value={''}>None</MenuItem>
                        {userOneNamesList.map(name => {
                            return <MenuItem value={name}>{name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="to-label">User2</InputLabel>
                    <Select
                        labelId="to-label"
                        value={userTwo}
                        label="To"
                        onChange={(e) => setUserTwo(e.target.value)}
                    >
                        <MenuItem value={''}>None</MenuItem>
                        {userTwoNamesList.map(name => {
                            return <MenuItem value={name}>{name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <Button variant={"outlined"} onClick={handleClearFilters}>Clear Filters</Button>
            </FiltersEl>

            <TableContainer sx={{maxHeight: 'calc(80vh - 350px)', border: '1px solid var(--border-color-light)', fontSize: '16px', borderRadius: '10px'}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{background: '#e8e8e8', width: '70px', fontSize: '1em'}}>Note</TableCell>
                            <TableCell align={"left"} style={{background: '#e8e8e8', fontSize: '1em'}}>From</TableCell>
                            <TableCell align={"left"} style={{background: '#e8e8e8', fontSize: '1em'}}>To</TableCell>
                            <TableCell align={"left"} style={{background: '#e8e8e8', fontSize: '1em'}}>{"Amount"}</TableCell>
                            <TableCell style={{background: '#e8e8e8', width: '70px'}}/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList.map((money) => {
                           return <MoneyItem money={money}/>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <MoneySummary p1={userOne} p2={userTwo}/>
        </>
    );
}
