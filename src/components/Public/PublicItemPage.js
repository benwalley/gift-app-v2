import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {DataStore} from "aws-amplify";
import {WishlistItem} from "../../models";
import ActionsBar from "../Wishlist/ItemPage/ActionsBar";
import Tile from "../Home/Tile";
import {IconButton, Rating, Stack, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CustomModal from "../CustomModal";
import AddItemForm from "../AddItemForm";
import styled from "@emotion/styled";
import toggleAmplifyArrayItem from "../../helpers/toggleAmplifyArrayItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useCurrency from "../../hooks/useCurrency";
import PublicActionsBar from "./PublicActionsBar";
import PublicLoginSuggestion from "./publicLoginSuggestion";
import ImageRender from "../ImageRender";
import useImageSrc from "../../hooks/useImageSrc";

const ItemPageContainerEl = styled.div`
  background: var(--background-color);
  padding: var(--mobile-page-margin);
  max-width: var(--max-content-width);
  margin: 0 auto;
  
  @media only screen and (min-width: 600px) {
    padding: var(--desktop-page-margin);
  }
`

const ItemPageEl = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  padding: 0;
  gap: 10px;
  
  @media only screen and (min-width: 700px) {
     padding: 0 20px 20px;
     grid-template-columns: 1fr 1fr;
     grid-template-rows: auto 1fr;
     gap: 0;
  }
`

const ImagePlaceholderEl = styled.div`
    background: linear-gradient(200deg, #e6e6e6, #f8f8f8);
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
`

const H1El = styled.h1`
    grid-column: 1/-1;
    margin: 10px 0 20px;
`

const PriorityEl = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const ImageEl = styled.img`
    max-width: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    background: var(--background-grey);
`

const DetailsEl = styled.div`
    padding: 0 20px;
    display: grid;
    gap: 20px;
    grid-template-rows: auto auto auto auto 1fr;
`

const AEl = styled.a`
    color: var(--primary-color)
`

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'var(--heart-icon-hover)',
    },
    '& .MuiRating-iconHover': {
        color: 'var(--heart-icon-hover)',
    },
});

export default function PublicItemPage() {
    let {itemId} = useParams();
    const [itemData, setItem] = useState(undefined);
    const price = useCurrency(itemData?.price);
    const imageUrl = useImageSrc(itemData?.images[0])

    function ImageElement() {
        if (!itemData || !itemData?.images || itemData.images.length === 0 || itemData.images[0] === '') return <ImagePlaceholderEl/>
        // return <ImageRender src={itemData.images[0]} alt={itemData.name}/>
        return <ImageEl  src={imageUrl} alt={itemData.name}/>
    }

    const renderLinkName = () => {
        try {
            const domain = new URL(itemData.link).host;
            return `Link to item on ${domain}`
        } catch(e) {
            return false
        }
    }

    const renderPriority = () => {
        return <StyledRating
            name="priority"
            readOnly
            label={"Priority"}
            getLabelText={(priority) => `${priority} Heart${priority !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            value={parseFloat(itemData?.priority)}
        />
    }

    const updateData = async () => {
        if(!itemId) {
            window.setTimeout(updateData, 500)
        }

        const item = await DataStore.query(WishlistItem, itemId);
        setItem(item?.isPublic ? item : undefined)

        if(!item) {
            window.setTimeout(updateData, 500)
        }
    }

    useEffect( () => {
        updateData()
    }, []);

    return (<>
            {itemData && <ItemPageContainerEl>
                <PublicActionsBar itemData={itemData} />
                <PublicLoginSuggestion/>
                <Tile>
                    <ItemPageEl>
                        <H1El>
                            <span>{itemData && itemData.name}</span>
                        </H1El>
                        <ImageElement/>
                        <DetailsEl>
                            {itemData?.note && <div><b>Note: </b><div>{itemData.note}</div></div>}
                            {itemData?.priority && <PriorityEl><b>Priority: </b>{renderPriority()}</PriorityEl>}
                            {itemData?.link && renderLinkName() && <AEl href={itemData.link} target={'_blank'}>{renderLinkName()}</AEl>}
                            {itemData?.price && <div><b>Price: </b><span>~ {price}</span></div>}
                        </DetailsEl>
                    </ItemPageEl>
                </Tile>
            </ItemPageContainerEl>}
        </>
    );
}

