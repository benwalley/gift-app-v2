import {useEffect, useState} from 'react';
import {DataStore} from "aws-amplify";
import {Users, WishlistItem} from "../models";

export default function useCanUserSeeBadges(userId, itemId) {
    const [value, setValue] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                if (!userId || !itemId) return false;
                const user = await DataStore.query(Users, userId);
                const item = await DataStore.query(WishlistItem, itemId);

                // if it is one of your items, you can't see gotten.
                if (item.ownerId === user.id) {
                    setValue(false);
                    return;
                }
                // if it's a subuser:
                if (item.ownerId) {
                    const itemOwner = await DataStore.query(Users, item.ownerId);
                    // if it's not your subuser, you can see gotten
                    if (itemOwner.parentId !== user.id) {
                        // this means the user is not the parent of the subuser who owns the list.
                        setValue(true);
                        return
                    }
                    // If it's your subusers's item, you can only see it if it's a user and subuser mode is off
                    setValue(itemOwner.isUser === true && user.subuserModeOn !== true)
                    return;
                }
                setValue(true)
            } catch (e) {
                return false;
            }
        }
        if(userId && itemId) {
            getData()
        }
    }, [itemId, userId]);
    return value
}
