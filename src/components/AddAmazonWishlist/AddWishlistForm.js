import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import useRecoilHook from "../../hooks/useRecoilHook";
import {groupsByUserId} from "../../state/selectors/groupsByUserId";
import {currentUser} from "../../state/selectors/currentUser";
import AreYouSureDialog from "../AreYouSureDialog";
import {useNavigate} from "react-router-dom";
import {lambdaUrl, webScrapeUrl} from "../../helpers/variables";
import WebWorker from "../../workers/workerSetup";
import getData from "../../workers/getDataFromUrl";
import getDataFromHtmlString from "../../helpers/getDataFromHtmlString";

const ContainerEl = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  
`
export default function AddWishlistForm(props) {
    const {source, setSource, afterSubmit, loadingItems} = props
    const [url, setUrl] = useState('')
    const [areYouSureOpen, setAreYouSureOpen] = useState(false)
    const user = useRecoilHook(currentUser)
    const groups = useRecoilHook(groupsByUserId(user?.id))
    const navigate = useNavigate()
    const [getDataWorker, setGetDataWorker] = useState();
    const wishlistUrlFormat = 'https://www.amazon.com/hz/wishlist/printview/97CS0YJRLLG5'
    const normal = 'https://www.amazon.com/hz/wishlist/ls/97CS0YJRLLG5?ref_=wl_share'

    async function handleSubmit(e) {
        e.preventDefault();
        if( groups && groups.length > 0) {
            afterSubmit()
        } else {
            setAreYouSureOpen(true)
        }
    }

    function handleGetItems() {
        // setGetDataLoading(true);
        const urlData = new URL(url);
        const dataArray = urlData.pathname.split('/');
        const id = dataArray[dataArray.length - 1];

        const gettingUrl = `https://www.amazon.com/hz/wishlist/printview/${id}`

        const fullUrl = `${lambdaUrl}${webScrapeUrl}?url=${gettingUrl}`;
        const worker = new WebWorker(getData);
        setGetDataWorker(worker);

        worker.postMessage(fullUrl);
    }

    useEffect(() => {
        if(!getDataWorker) return;
        getDataWorker.addEventListener('message', function(e) {
            if(e.data?.error || e.data === 'error') {
            }
            setSource(e.data);
        })
    }, [getDataWorker]);

    return (
        <ContainerEl>
            <TextField value={url} onChange={(e) => setUrl(e.target.value)}/>
            <Button onClick={handleGetItems}>Get items from URL</Button>
            <AreYouSureDialog
                text={`You must create or join a group in order to add items to your wishlist.`}
                open={areYouSureOpen}
                setOpen={setAreYouSureOpen}
                confirmHandler={() => navigate('/account/groups')}
                confirmText={"Go To Groups Page"}
            />
        </ContainerEl>
    );
}

