import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {Badge, Chip, InputAdornment, Stack, TextField} from "@mui/material";
import CustomAccordion from "../CustomAccordion";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';

export default function Sort(props) {
    const {sortBy, setSortBy, searchText, setSearchText, filterArray} = props;
    const sortable = filterArray || [
        'A-Z',
        'Z-A',
    ]

    const renderSortChip = (name) => {
        return <Chip label={name}
                     key={name}
                     size={'small'}
                     color="primary"
                     variant={sortBy === name.toLowerCase() ? 'filled' : 'outlined' }
                     onClick={() => setFilter(name)}/>
    }

    function setFilter(name) {
        setSortBy(
            sortBy === name.toLowerCase() ? undefined : name.toLowerCase()
        )
    }

    const searchFieldStyles = {
        position: 'absolute',
        bottom: 'calc(100% + 10px)',
        right: 0,
        width: '200px',
    }

    const stackStyles = {
        flexWrap: 'wrap',
        gap: '7px 10px'
    }

    const sortAccordionTitle = () => {
        return <div>
            <span>Sort</span>
            {sortBy && <Chip
                label={sortBy}
                sx={{marginLeft: '10px',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                }}
                size={'small'}
                color="primary"
                variant='filled'/>}
        </div>
    }

    return (
        <Box sx={{position: 'relative'}}>
            <CustomAccordion title={sortAccordionTitle()} summarySx={{margin: 0}}>
                <Stack direction="row" sx={stackStyles}>
                    {sortable.map((item) => renderSortChip(item))}
                </Stack>
            </CustomAccordion>
            <TextField id="search-field"
                       label="Search"
                       size={'small'}
                       variant="outlined"
                       value={searchText || ''}
                       onChange={(e) => setSearchText(e.target.value)}
                       sx={searchFieldStyles}
                       InputProps={{
                           endAdornment: (
                               <InputAdornment position="end">
                                   <SearchIcon/>
                               </InputAdornment>
                           ),
                       }}
            />
        </Box>
    );
}

