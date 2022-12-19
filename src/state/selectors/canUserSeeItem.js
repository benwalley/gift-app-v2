import {selectorFamily} from "recoil";
import {DataStore} from "aws-amplify";
import {Users, WishlistItem} from "../../models";

export const canUserSeeItem = selectorFamily({
    key: 'canUserSeeItem',
    get: ({userId, itemId}) => async ({get}) => {

        try {
            if(!userId || !itemId) return false;
            const item = await DataStore.query(WishlistItem, itemId);
            if(!item) return false;

            if(item.custom && item.createdById) {
                // if it is a custom item, only the creator can edit it.
                if(userId === item.createdById) {
                    return true;
                } else {
                    return false;
                }
            }
            // if it gets to this point, it is not a custom item.
            if(userId === item.ownerId) {
                // if the user is the owner of the list, they can't edit it.
                return true;
            }
            // if the list is a sublist, the parent can edit it.
            if(item.ownerId) {
                const itemOwner = await DataStore.query(Users, item.ownerId);
                if(itemOwner.parentId === userId) {
                    return true; // this means the user is the parent of the subuser who owns the list.
                }
            }

        } catch(e) {
            return false;
        }

    },
});
