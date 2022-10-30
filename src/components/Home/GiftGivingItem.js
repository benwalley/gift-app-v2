import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";


export default function GiftGivingItem(props) {
    const {gift} = props
    const [gottenForName, setGottenForName] = useState()

    useEffect( () => {
        const updateGottenForName = async () => {
            const giftOwner = await DataStore.query(Users, gift?.ownerId);
            if(giftOwner) {
                setGottenForName(giftOwner.username)
            }
        }
        updateGottenForName()
    }, [gift]);


    const renderName = (gift) => {
        const maxLength = 20;
        const shorterName = gift.name.slice(0, maxLength);
        return `${shorterName}${gift.name.length > maxLength ? '...' : ''}`
    }

    return (
        <>
            <span>{renderName(gift)}</span>
            {gottenForName && <span>For</span>}
            <Link to={`/wishlist/${gift.ownerId}`}>{gottenForName || 'Link to list'}</Link>
        </>

    );
}

