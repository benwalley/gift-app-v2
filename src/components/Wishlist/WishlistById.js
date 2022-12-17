import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {wishlistByUserId} from "../../state/selectors/wishlistByUserId";
import useRecoilHook from "../../hooks/useRecoilHook";
import Tile from "./Tile/Tile";
import {useParams} from "react-router-dom";
import {userById} from "../../state/selectors/userByWishlistId";
import {useRecoilState, useSetRecoilState} from "recoil";
import ActionsBar from "./ActionsBar";
import {Typography} from "@mui/material";
import SubuserIcon from "../SubuserIcon";
import {currentUser} from "../../state/selectors/currentUser";
import Button from "@mui/material/Button";
import CustomModal from "../CustomModal";
import AddCustomItemModal from "./AddCustomItemModal";
import UserAvatar from "../UserAvatar";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";
import {
    sortAZ,
    sortDateAddedOldestFirst,
    sortDateAddedRecentFirst, sortGottenFirst,
    sortMostWantedFirst, sortNotGottenFirst, sortPriceHighFirst, sortPriceLowFirst, sortSomeoneWantsToGoInOnFirst,
    sortZA
} from "../../helpers/sort";
import listSort from "../../state/atoms/listSort";
import SearchSortToolbar from "./SearchSortToolbar/SearchSortToolbar";


const H1El = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
`

const WishlistContainerEl = styled.div`
  background: var(--background-color);
  padding: var(--mobile-page-margin);
  max-width: var(--max-content-width);
  margin: 0 auto;
  
  @media only screen and (min-width: 600px) {
    padding: var(--desktop-page-margin);
  }
`

const WishlistTileContainerEl = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--mobile-page-margin);
  margin-top: 10px;
  
  @media only screen and (min-width: 600px) {
    gap: var(--desktop-page-margin);
  }
  
  @media only screen and (min-width: 630px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media only screen and (min-width: 910px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media only screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media only screen and (min-width: 1160px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const NoticeEl = styled.h4`
    color: var(--delete-red);
`

export default function WishlistById() {
    let {wishlistId} = useParams();
    const user = useRecoilHook(userById(wishlistId))
    const mainUser = useRecoilHook(currentUser)
    const wishlistById = useRecoilHook(wishlistByUserId({wishlistId: wishlistId || false}));
    const updateWishlist = useSetRecoilState(wishlistByUserId(user?.id || false))
    const [customItemModalOpen, setCustomItemModalOpen] = useState(false)
    const [parentUser, setParentUser] = useState()
    const [selectedSortBy, setSelectedSortBy] = useRecoilState(listSort)
    const [searchText, setSearchText] = useState('')
    const [sortedItems, setSortedItems] = useState([])
    //TODO: add gotten/not gotten for only proper users
    const filterArray = [
        'A-Z',
        'Z-A',
        'Newest First',
        "Oldest First",
        'Most Wanted',
        'Price Lowest First',
        'Price Highest First',
    ]

    if(canSeeGotten()) {
        filterArray.push('Gotten')
        filterArray.push('Not Gotten')
        filterArray.push('Someone wants to go in on')
    }

    function canSeeGotten() {
        if(mainUser.id === wishlistId) return false;
        if(user?.parentId === mainUser.id) {
            // if it's a subuser of you
            if (user?.isUser && !mainUser.subuserModeOn) {
                return true;
            }
            return false
        }
        return true

    }


    useEffect(() => {
        if(!selectedSortBy) setSortedItems([])
        // filter
        const filteredItems = wishlistById.filter(item => {
            const name = item.name || ''
            return name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        })
        if(selectedSortBy === '' || selectedSortBy === undefined) {
            setSortedItems(filteredItems)
        }
        // sort
        if(selectedSortBy === 'a-z') {
            filteredItems.sort(sortAZ)
            setSortedItems(filteredItems)
        }
        if(selectedSortBy === 'z-a') {
            filteredItems.sort(sortZA)
            setSortedItems(filteredItems)
        }

        if(selectedSortBy === 'newest first') {
            filteredItems.sort(sortDateAddedRecentFirst)
            setSortedItems(filteredItems)
        }

        if(selectedSortBy === 'oldest first') {
            filteredItems.sort(sortDateAddedOldestFirst)
            setSortedItems(filteredItems)
        }

        if(selectedSortBy === 'most wanted') {
            filteredItems.sort(sortMostWantedFirst)
            setSortedItems(filteredItems)
        }

        if(selectedSortBy === 'price lowest first') {
            filteredItems.sort(sortPriceLowFirst)
            setSortedItems(filteredItems)
        }

        if(selectedSortBy === 'price highest first') {
            filteredItems.sort(sortPriceHighFirst)
            setSortedItems(filteredItems)
        }

        if(selectedSortBy === 'gotten') {
            if(!canSeeGotten()) {
                setSortedItems(filteredItems)
                setSelectedSortBy('newest first')
                return;
            };
            filteredItems.sort(sortGottenFirst)
            setSortedItems(filteredItems)
        }

        if(selectedSortBy === 'not gotten') {
            if(!canSeeGotten()) {
                setSortedItems(filteredItems)
                setSelectedSortBy('newest first')
                return;
            };
            filteredItems.sort(sortNotGottenFirst)
            setSortedItems(filteredItems)
        }

        if(selectedSortBy === 'someone wants to go in on') {
            if(!canSeeGotten()) {
                setSortedItems(filteredItems)
                setSelectedSortBy('newest first')
                return;
            };
            filteredItems.sort(sortSomeoneWantsToGoInOnFirst)
            setSortedItems(filteredItems)
        }

    }, [searchText, selectedSortBy, wishlistById])

    useEffect(() => {
        updateWishlist(0)
    }, [updateWishlist]);

    useEffect(() => {
        const updateParent = async () => {
            if(user?.parentId) {
                const parentUserData = await DataStore.query(Users, user.parentId);
                if(parentUserData) {
                    setParentUser(parentUserData)
                }
            }
        }

        updateParent()

    }, [user]);

    const renderWishlistItems = () => {
        const wishlist = sortedItems;
        if(!wishlist) return;
        const filteredWishlist = wishlist.filter(item => {
            if(!item.custom) return true; // if it's not custom we can show it.
            if(mainUser.id === wishlistId) return false; // if it's custom and the user's main wishlist, don't show it.
            if(user?.parentId === mainUser.id) {
                // if it's this user's subuser, the only time you show it is if subuser mode is off and it's a user
                return !!(!mainUser.subuserModeOn && user?.isUser);

            }
            return true
        })
        return filteredWishlist.map(item => {
            return <Tile tile={item} key={item.id}></Tile>
        })
    }

    const handleAddCustomItem = () => {
        setCustomItemModalOpen(true)
    }

    return (
        <WishlistContainerEl>
            <ActionsBar/>
            <H1El><span>{user?.username}</span><span>{user?.isUser && <SubuserIcon/>}</span> <UserAvatar user={user} name={user?.username}/></H1El>
            {user?.isUser && <NoticeEl>{`This user is a sub-user, so ${parentUser?.username || 'the parent user'} can see what is marked as gotten.`}</NoticeEl>}
            <SearchSortToolbar
                sortBy={selectedSortBy}
                setSortBy={setSelectedSortBy}
                searchText={searchText}
                setSearchText={setSearchText}
                filterArray={filterArray}
            />

            <WishlistTileContainerEl>
                {wishlistById && wishlistById.length === 0 && <Typography sx={{gridColumn: '1/-1'}}>There are no items in this wishlist for the selected group(s)</Typography>}
                {wishlistById && wishlistById.length > 0 && sortedItems.length === 0 && <Typography sx={{gridColumn: '1/-1'}}>There are no items in this wishlist that match the selected filters</Typography>}
                {renderWishlistItems()}
            </WishlistTileContainerEl>
            {mainUser.id !== wishlistId && <>
                {/* only show if it's not a subuser or it's a subuser which is a user*/}
                {(user?.parentId !== mainUser.id || user?.isUser) &&
                    <Button onClick={handleAddCustomItem} color={'secondary'} sx={{marginTop: '30px'}} variant={'contained'}>
                        Add Something To This User's Wishlist
                    </Button>
                }
                <CustomModal open={customItemModalOpen} setOpen={setCustomItemModalOpen} size="large">
                    <AddCustomItemModal addToId={wishlistId} afterSubmit={() => setCustomItemModalOpen(false)}/>
                </CustomModal>
            </>}
        </WishlistContainerEl>
    );
}

