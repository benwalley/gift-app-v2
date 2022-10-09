import React from 'react';
import styled from "@emotion/styled";

import {CardContent, CardMedia} from "@mui/material";

import useCurrency from "../../hooks/useCurrency";
import useImageSrc from "../../hooks/useImageSrc";


export default function WishlistItemTile(props) {
    const {data, selectedItems, setSelectedItems} = props;
    const imageUrl = useImageSrc(data?.imageSrc)

    const isSelected = () => {
        return selectedItems.some(item => {
            return JSON.stringify(item) === JSON.stringify(data);
        })
    }


    const TileEl = styled.div`
        background: white;
        min-height: 200px;
        border-radius: 20px;
        padding: 10px;
        position: relative;
        cursor: pointer;
        &:after {
            ${isSelected() ? 'content: "";' : ''}
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: #72d986;
            border-radius: 20px;
            opacity: .5;
        }
        &:hover {
            &:after {
                content: '';
            }
        }
    `

    const handleClick = () => {
        const selectedCopy = [...selectedItems]

        if(isSelected()) {
            // unselect it.
            const filteredSelected = selectedCopy.filter(item => {
                return !(JSON.stringify(item) === JSON.stringify(data));
            });
            setSelectedItems(filteredSelected);
            return;
        }
        selectedCopy.push(data);
        setSelectedItems(selectedCopy);
    }

    function Price() {
        const priceString = useCurrency(data.price)
        return <div>
            <span>Price: </span>
            <span>{priceString}</span>
        </div>
    }

    const shortName = () => {
        const cutoff = 50;
        const length = data.name.length;
        const shorter = data.name.slice(0, 50);
        return length > cutoff ? `${shorter}...` : data.name;
    }

    return (
        <TileEl onClick={handleClick}>
            {data?.imageSrc &&
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt={data.imageAlt}
                    sx={{
                        width: 'auto',
                        margin: "0 auto"
                    }}
                />}
            <CardContent sx={{display: 'grid', gridTemplateRows: '1fr 24px'}}>
                <h3>{shortName()}</h3>
                {data.price && <Price/>}
            </CardContent>
        </TileEl>
    );
}

