import React, {useEffect, useState} from 'react';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Accordion, AccordionDetails, AccordionSummary, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import {DataStore} from "aws-amplify";
import {WishlistItem} from "../../../models";
import List from "@mui/material/List";
import AccordionItem from "./AccordionItem";
import Button from "@mui/material/Button";

export default function UserAccordion(props) {
    const {user, checked, setChecked} = props
    const [items, setItems] = useState([])

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(user.id, newChecked);
    };

    useEffect(() => {
        const updateItems = async () => {
            const wishlist = await DataStore.query(WishlistItem, c => c.ownerId("eq", user.id));
            setItems(wishlist)
        }
        updateItems()
    }, [user.id]);

    async function handleSelectAll() {
        setChecked(user.id, items.map(item => item.id))
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`${user.id}-content`}
                id={`${user.id}-header`}
            >
                <div>{`${user.username} (${items.length} items)`} </div>
            </AccordionSummary>
            <AccordionDetails>
                <Divider/>
                <List>
                    <Stack direction="row" spacing={1}>
                        <Button variant={"outlined"} onClick={() => setChecked(user.id, [])}>De-select All</Button>
                        <Button variant={"contained"} onClick={handleSelectAll}>Select All</Button>
                    </Stack>

                    {items && items.map(item => {
                        return <AccordionItem key={item.id} item={item} checked={checked} handleToggle={handleToggle}/>
                    })}
                </List>

            </AccordionDetails>
        </Accordion>
    );
}

