import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Rating, Switch, TextField, Tooltip, Typography} from "@mui/material";
import {DataStore} from 'aws-amplify'
import {Users, WishlistItem} from "../models";
import {useSetRecoilState} from "recoil";
import {updateCurrentUserWishlist} from "../state/selectors/currentUserWishlist";
import {currentUser} from "../state/selectors/currentUser";
import useRecoilHook from "../hooks/useRecoilHook";
import SubuserChips from "./SubuserChips";
import {wishlistByUserId} from "../state/selectors/wishlistByUserId";
import GroupPicker from "./GroupPicker";
import {wishlistItemById} from "../state/selectors/wishlistItemById";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled'
import ImageUpload from "./ImageUpload/ImageUpload";
import Step from "./Steps/Step";
import Box from "@mui/material/Box";
import {lambdaUrl, webScrapeUrl} from "../helpers/variables";
import WebWorker from "../workers/workerSetup";
import getData from "../workers/getDataFromUrl";
import getDataFromHtmlString from "../helpers/getDataFromHtmlString";
import SuccessSnackbar from "./Snackbars/SuccessSnackbar";
import ErrorSnackbar from "./Snackbars/ErrorSnackbar";


const styles = {
    width: '100%',
    marginTop: '30px'
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'var(--heart-icon-filled)',
    },
    '& .MuiRating-iconHover': {
        color: 'var(--heart-icon-hover)',
    },
});

const H2El = styled.h2`
    margin-right: auto;
`

const FormEl = styled.form`
    min-height: 50vh;
    transition: all 1s;
`

//TODO: allow multiple links
const TitleAndSwitchEl = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 2px solid #cecece;
`

//TODO: have the ability to add 'tags' to items to filter with. (like wedding, or baby)
export default function AddItemForm(props) {
    const {afterSubmit, initialData} = props
    const updateWishlist = useSetRecoilState(updateCurrentUserWishlist)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [priority, setPriority] = useState('')
    const [link, setLink] = useState('')
    const [note, setNote] = useState('')
    const [imageList, setImageList] = useState([])
    const [addToId, setAddToId] = useState('')
    const [stepNumber, setStepNumber] = useState(0)
    const [isPublic, setIsPublic] = useState(true)
    const [selectedGroups, setSelectedGroups] = useState([])
    const [addToName, setAddToName] = useState('')
    const [multipleAddToUsers, setMultipleAddToUsers] = useState()
    const updateAddToWishlist = useSetRecoilState(wishlistByUserId(addToId))
    const user = useRecoilHook(currentUser)
    const updateItem = useSetRecoilState(wishlistItemById(initialData?.id))
    const [getDataLoading, setGetDataLoading] = useState(false);
    const [workerResponse, setWorkerResponse] = useState();
    const [getDataWorker, setGetDataWorker] = useState();
    const [successSnackbarValue, setSuccessValueSnackbar] = useState('')
    const [errorSnackbarValue, setErrorValueSnackbar] = useState('')
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)

    const isEdit = () => {
        if(initialData) return true;
        return false
    }

    useEffect(() => {
        const updateAddToName = async () => {
            if(!addToId) return;
            const user = await DataStore.query(Users, addToId);
            // set initial add to did to the current user.
            setAddToName(user?.username || '')
        }

        updateAddToName()
    }, [addToId]);

    useEffect(() => {
        // set initial add to did to the current user.
        setAddToId(user?.id)
    }, [user]);

    useEffect(() => {
        const updateSubUsers = async () => {
            const subUsers = await DataStore.query(Users, c => c.parentId("eq", user?.id));
            setTimeout(() => {
                setMultipleAddToUsers(!!(subUsers && subUsers.length > 0))
                if(subUsers?.length === 0 || isEdit()) {
                    setStepNumber(1)
                }
            }, 150)
        }
        if(user && user.length !== 0 && multipleAddToUsers === undefined) {
            updateSubUsers()
        }
    }, [multipleAddToUsers, user]);

    function prepareImages(imageList) {
        if(!imageList || imageList.length === 0) return [];
        const returnList = [];
        for(const item of imageList) {
            if(item.imageSrc) {
                returnList.push(JSON.stringify(item))
            }
        }
        return returnList;
    }

    async function handleSubmitEdit(e) {
        e.preventDefault()
        if (!name) return;
        if (!user || user?.length === 0) return;

        const images = prepareImages(imageList)

        const original = await DataStore.query(WishlistItem, initialData.id);
        await DataStore.save(WishlistItem.copyOf(original, updated => {
            try {
                updated.name = name;
                updated.price = price;
                updated.priority = priority;
                updated.link = fixLink(link);
                updated.note = note;
                updated.images = images
                updated.isPublic = isPublic
                updated.groups = selectedGroups
            } catch (e) {
                console.log(e)
            }
        }))

        updateWishlist(0)
        updateAddToWishlist(0)
        updateItem(0)
        afterSubmit()
    }

    function fixLink(link) {
        // if the link is good, return it as is
        if(link.slice(0, 8) === "https://" || link.slice(0, 7) === "http://") return link;
        // if the link has https:// anywhere in it, make that the beginning
        const index = link.indexOf("https://")
        if(index > 0) {
            return link.slice(index, -1);
        }
        return `https://${link}`
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!name) return;
            if (!addToId) return;
            const images = prepareImages(imageList)

            const itemData = {
                "images": images,
                "name": name,
                "link": fixLink(link),
                "note": note,
                "gottenBy": [],
                "wantsToGet": [],
                "price": price,
                "ownerId": addToId,
                "wishlistItemComments": [],
                "priority": priority,
                'groups': selectedGroups,
                'isPublic': isPublic,
            }
            const response = await DataStore.save(
                new WishlistItem(itemData)
            );
            updateWishlist(0)
            updateAddToWishlist(0)
        } catch(e) {
            // handle error
            console.log(e)
        }

        afterSubmit()
    }

    function parseImageList(imageList) {
        if(imageList.length === 0) return []
        return imageList.map(item => {
            return JSON.parse(item)
        })
    }

    useEffect(() => {
        if(initialData) {
            // set values to the editing
            setName(initialData.name)
            setPrice(initialData.price || '')
            setPriority(initialData.priority || '')
            setLink(initialData.link || '')
            setNote(initialData.note || '')
            setImageList(parseImageList(initialData?.images))
            setSelectedGroups(initialData?.groups)
            setIsPublic(initialData?.isPublic)
        }
    }, [initialData]);


    useEffect(() => {
        if(!getDataWorker) return;
        getDataWorker.addEventListener('message', function(e) {
            if(e.data?.error || e.data === 'error') {
                setErrorValueSnackbar('Error when getting data from url.');
                setErrorSnackbarOpen(true);
                setLink('')
            }
            const dataObject = getDataFromHtmlString(e.data);
            setWorkerResponse(dataObject);
            setGetDataLoading(false);

        })
    }, [getDataWorker]);

    useEffect(() => {
        if(!workerResponse) return;
        const {title, price, image} = workerResponse;
        if(title) setName(title);
        if(price) setPrice(parseFloat(price) || 0);
        if(image) setImageList([{id: 0, note: '', link: '', imageSrc: image}])
    }, [workerResponse]);

    return (<>
        <FormEl onSubmit={initialData ? handleSubmitEdit : handleSubmit}>
            <TitleAndSwitchEl>
                <H2El>{isEdit() ? "Edit Wishlist Item" : `Add Item To List ${addToName}`}</H2El>
                <Tooltip title={"Set whether non-logged in users can see this item"}>
                    <Switch
                        checked={isPublic}
                        color={"secondary"}
                        onChange={() => setIsPublic(!isPublic)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Tooltip>
                <div>{isPublic ? "Publicly Visible" : "Not Publicly Visible"}</div>
            </TitleAndSwitchEl>
            {multipleAddToUsers === undefined && <CircularProgress sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '100px auto',
            }} size={'100px'}/>}
            {multipleAddToUsers === true && <Step currentStep={stepNumber} stepNumber={0} nextStep={() => setStepNumber(1)}>
                {!isEdit() && <h4>Select the list you want to add to</h4>}
                {!isEdit() && <SubuserChips selectedId={addToId} setSelectedId={setAddToId}/>}
            </Step>}
            <Step renderStraightContent={multipleAddToUsers === false}
                  currentStep={stepNumber}
                  stepNumber={1}
                  previousStep={isEdit() ? false : () => setStepNumber(0)}
                  previousStepName={"Add to a different user's list"}>
                <h4>Select the group(s) you want to add the item to</h4>
                <GroupPicker userId={addToId} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
                <TextField value={name} onChange={(e) => setName(e.target.value)} sx={styles} id="name" label="Item Name"
                           variant="outlined"/>
                <TextField value={price} onChange={(e) => setPrice(e.target.value)} sx={styles} id="price"
                           label="Approximate Price" variant="outlined"/>
                <Typography component="legend" sx={{marginTop: '30px'}}>Priority</Typography>
                <StyledRating
                    name="priority"
                    defaultValue={2.5}
                    label={"Priority"}
                    getLabelText={(priority) => `${priority} Heart${priority !== 1 ? 's' : ''}`}
                    precision={0.5}
                    size={"large"}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    value={parseFloat(priority)}
                    onChange={(e) => setPriority(e.target.value)}
                />
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                    <TextField value={link} onChange={(e) => setLink(e.target.value)} sx={styles} id="link" label="Link"
                               variant="outlined"/>
                </Box>

                <TextField value={note} onChange={(e) => setNote(e.target.value)} sx={styles} id="note" label="Note"
                           multiline
                           variant="outlined"/>

                <ImageUpload imageList={imageList} setImageList={setImageList}/>
                <Button type="submit" sx={{marginTop: '30px', marginLeft: 'auto', display: 'block'}} variant="contained"
                        size="large">Add Item</Button>
            </Step>
        </FormEl>
        <SuccessSnackbar message={successSnackbarValue} snackbarOpen={successSnackbarOpen} setSnackbarOpen={setSuccessSnackbarOpen}/>
        <ErrorSnackbar message={errorSnackbarValue} snackbarOpen={errorSnackbarOpen} setSnackbarOpen={setErrorSnackbarOpen}/>
        </>

    );
}


