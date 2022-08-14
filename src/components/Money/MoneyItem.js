import * as React from 'react';
import styled from "@emotion/styled";
import {updateCurrentUserMoney} from "../../state/selectors/currentUserMoney";
import {
    Collapse,
    IconButton,
    TableCell,
    TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import {DataStore} from "aws-amplify";
import {Money} from "../../models";
import {useSetRecoilState} from "recoil";
import useCurrency from "../../hooks/useCurrency";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from "@mui/material/Box";

export default function MoneyItem(props) {
    const {money} = props;
    const update = useSetRecoilState(updateCurrentUserMoney)
    const price = useCurrency(money.amount)
    const [commentExpanded, setCommentExpanded] = useState(false)

    const handleDelete = async (e) => {
        e.preventDefault()
        const todelete = await DataStore.query(Money, money.id);
        await DataStore.delete(todelete);
        update(0)
    }

    const Comment = () => {
        if(!money.note) return;
        return <TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0, fontSize: '1em'}} colSpan={6}>
                <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
                    <Box sx={{padding: 1}}>
                        {money.note}
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    }


    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={money.id}>
                <TableCell sx={{fontSize: '1em'}}>
                    {money.note && <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setCommentExpanded(!commentExpanded)}
                    >
                        {commentExpanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>}
                </TableCell>
                <TableCell sx={{fontSize: '1em'}}>{money.owedFromName}</TableCell>
                <TableCell sx={{fontSize: '1em'}}>{money.owedToName}</TableCell>
                <TableCell sx={{fontSize: '1em'}}>{price}</TableCell>
                <TableCell sx={{fontSize: '1em'}}>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        size={"medium"}
                        color={"deleteRed"}
                        onClick={handleDelete}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <Comment/>
        </>
    )
}
