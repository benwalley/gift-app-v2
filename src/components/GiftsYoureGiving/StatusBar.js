import React, {useEffect, useState} from 'react';
import {DataStore} from "aws-amplify";
import {Giving} from "../../models";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import {givingStatusOptions} from "../../helpers/config";
import {useRecoilValue} from "recoil";
import givingDataVersion from "../../state/atoms/givingDataVersion";
import {Tooltip} from "@mui/material";

export default function StatusBar(props) {
    const {giftArray} = props
    const [percentage, setPercentage] = useState(0)
    const myUser = useRecoilHook(currentUser)
    const givingVersion = useRecoilValue(givingDataVersion)

    useEffect(() => {
        if(!giftArray || !myUser || myUser.length === 0) return;
        updatePercentage()
    }, [giftArray, givingVersion]);

    async function updatePercentage() {
        let perc = 0;
        const percentPerGift = 100 / giftArray.length;
        for (const gift of giftArray) {
            const extraData = await DataStore.query(Giving, (c) => c.and(c => [
                c.giftId("eq", gift?.id),
                c.giverIds('contains', myUser.id)
            ]));
            if(!extraData || extraData.length === 0) {
                perc +=  percentPerGift/10;
                continue;
            }
            const status = extraData[0].status;
            const addPercentage = givingStatusOptions.find(item => {
                return item.id === status
            })?.percentage  || 10
            perc += percentPerGift * (addPercentage/100);
        }
        setPercentage(perc)
    }

    const statusBarStyles = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        background: percentage === 100 ? 'var(--green-color)' : `linear-gradient(90deg, var(--primary-color) ${percentage.toString()}%, rgb(204, 231, 255) ${percentage.toString()}%)`,
    width: '100%',
        height: '5px'
    }

    return (
        <Tooltip title={`${percentage}% finished with this user's gifts`} disableInteractive={true}>
            <div style={statusBarStyles}></div>
        </Tooltip>
    );
}

