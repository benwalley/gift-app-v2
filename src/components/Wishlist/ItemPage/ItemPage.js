import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {useParams} from "react-router-dom";
import {wishlistItemById} from "../../../state/selectors/wishlistItemById";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {IconButton, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Tile from "../../Home/Tile";
import useCurrency from "../../../hooks/useCurrency";
import AddItemForm from "../../AddItemForm";
import CustomModal from "../../CustomModal";
import ActionsBar from "./ActionsBar";

const ItemPageContainerEl = styled.div`
  background: var(--background-color);
  padding: 20px;
`

const ItemPageEl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  padding: 0 20px 20px;
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

const ImageEl = styled.img`
    max-width: 100%;
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

export default function ItemPage(props) {
    let {itemId} = useParams();
    const itemData = useRecoilHook(wishlistItemById(itemId))
    const price = useCurrency(itemData.price)
    const [editModalOpen, setEditModalOpen] = useState(false)

    function ImageElement() {
        if (!itemData || !itemData?.images || itemData.images.length === 0 || itemData.images[0] === '') return <ImagePlaceholderEl/>
        return <ImageEl  src={itemData.images[0]} alt={itemData.name}/>
    }

    const handleEdit = () => {
        setEditModalOpen(true)
    }

    const renderLinkName = () => {
        try {
            const domain = new URL(itemData.link).host;
            return `Link to item on ${domain}`
        } catch(e) {
            return "Link"
        }

    }

    return (
        <ItemPageContainerEl>
            <ActionsBar/>
            <Tile>
                <ItemPageEl>
                    <H1El>
                        <span>{itemData && itemData.name}</span>
                        <Tooltip title="Edit Item">
                            <IconButton aria-label="Edit" onClick={handleEdit}>
                                <EditIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </H1El>
                    <ImageElement/>
                    <DetailsEl>
                        {itemData?.note && <div><b>Note: </b><div>{itemData.note}</div></div>}
                        {itemData?.priority && <div><b>Priority: </b>{itemData.priority}/10</div>}
                        {itemData?.link && <AEl href={itemData.link}>{renderLinkName()}</AEl>}
                        {itemData?.price && <div><b>Price: </b><span>~ {price}</span></div>}
                    </DetailsEl>
                </ItemPageEl>
            </Tile>
            <CustomModal open={editModalOpen} setOpen={setEditModalOpen} size="large">
                <AddItemForm initialData={itemData} afterSubmit={() => setEditModalOpen(false)}/>
            </CustomModal>
        </ItemPageContainerEl>
    );
}

