import React, {useEffect, useState} from 'react';
import {Alert} from "@mui/material";
import useRecoilHook from "../hooks/useRecoilHook";
import {currentUser} from "../state/selectors/currentUser";
import {DataStore} from "aws-amplify";
import {AdminMessages, Users} from "../models";

export default function CustomUpdateMessage(props) {
    const {} = props
    const [messages, setMessages] = useState([])
    const myUser = useRecoilHook(currentUser)
    const [hasUpdated, setHasUpdated] = useState(false)


    useEffect(() => {
        if(!myUser || myUser.length === 0) return;
        if(hasUpdated) return;
        updateMessage()
    }, [myUser]);

    async function updateMessage() {
        const allMessages = await DataStore.query(AdminMessages, c => c.seenBy("notContains", myUser.id));
        setMessages(allMessages)
        for(const message of allMessages) {
            const original = await DataStore.query(AdminMessages, message.id);
            const seenByCopy = new Set(original.seenBy);
            seenByCopy.add(myUser.id);
            // TODO: Make it not go away immidiately
            await DataStore.save(AdminMessages.copyOf(original, updated => {
                updated.seenBy = Array.from(seenByCopy);
            }))
        }
        setHasUpdated(true)
    }

    return (
        <>
            {messages?.length > 0 && messages.map(message => {
                return <Alert key={message.id} severity="success">{message.message}</Alert>
            })}
        </>

    );
}

