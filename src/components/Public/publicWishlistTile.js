import React, {useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import {CardActionArea, CardContent, CardMedia, Rating, Tooltip} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useCurrency from "../../hooks/useCurrency";
import * as PropTypes from "prop-types";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'var(--heart-icon-hover)',
    },
    '& .MuiRating-iconHover': {
        color: 'var(--heart-icon-hover)',
    },
});

const PriorityPriceEl = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function PublicWishlistTile(props) {
    const {tile} = props;
    const navigate = useNavigate()

    function Priority() {
        if (!tile.priority) return;
        return <Tooltip title="Priority">
            <StyledRating
                name="priority"
                readOnly
                label={"Priority"}
                getLabelText={(priority) => `${priority} Heart${priority !== 1 ? 's' : ''}`}
                precision={0.5}
                size={'small'}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                value={parseFloat(tile?.priority)}
            />
        </Tooltip>
    }

    function Price() {
        const priceString = useCurrency(tile.price)
        return <div>
            <span>Price: ~</span>
            <span>{priceString}</span>
        </div>
    }

    const handleClick = () => {
        navigate(`/public/wishlist/item/${tile.id}`)
    }

    return (
        <Card sx={{display: 'grid', gridTemplateRows: '1fr 56px', position: 'relative', minWidth: '275px', borderRadius: '10px'}}>
            <CardActionArea onClick={handleClick}>
                {tile?.images?.length > 0 &&
                    <CardMedia
                        component="img"
                        height="140"
                        image={tile?.images[0]}
                        alt={tile.name}
                        sx={{
                            width: 'auto',
                            margin: "10px auto 0",
                            maxWidth: '90%',
                        }}
                    />}
                <CardContent sx={{display: 'grid', gridTemplateRows: '1fr 24px'}}>
                    <h3>{tile.name}</h3>
                    <PriorityPriceEl>
                        <Priority/>
                        {tile.price && <Price/>}
                    </PriorityPriceEl>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

