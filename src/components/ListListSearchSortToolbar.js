import React, {useEffect, useRef, useState} from 'react';
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ButtonGroup, Chip, IconButton, InputAdornment, Stack, TextField, Tooltip} from "@mui/material";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import ToolbarButton from './Wishlist/SearchSortToolbar/ToolbarButton'
import GroupPicker from "./GroupPicker";


const ListContainer = styled.div`
    background: white;
    box-shadow: var(--small-box-shadow);
    border-radius: 10px;
`


const sectionStyles = {
    padding: '10px'
}

export default function ListListSearchSortToolbar(props) {
    const {sortBy, setSortBy, searchText, setSearchText, filterArray, user, selectedGroups, setSelectedGroups} = props;
    const [selectedSection, setSelectedSection] = useState('search')

    const searchInput = useRef(null);

    const sortable = filterArray || [
        'A-Z',
        'Z-A',
    ]

    useEffect(() => {
        if(selectedSection === 'search') {
            searchInput.current.querySelector('input').focus();
        }
    }, [selectedSection])

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

    const stackStyles = {
        flexWrap: 'wrap',
        gap: '7px 10px'
    }

    function groupStyles() {
        const returnData = {
            padding: '10px'
        }
        if(selectedSection === "groups") {
            returnData.display = 'block';
        } else {
            returnData.display = 'none'
        }

        return returnData;
    }

    return (
        <ListContainer>
            <ButtonGroup sx={sectionStyles} variant="text" aria-label="text button group" spacing={3}>
                <ToolbarButton
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    name='Sort'
                    value='sort'
                    icon={<TuneRoundedIcon />}
                />

                <ToolbarButton
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    name='Groups'
                    value='groups'
                    icon={<GroupsIcon />}
                />

                <ToolbarButton
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    name='Search'
                    value='search'
                    icon={<SearchIcon />}
                    mobileIcon={true}
                />
            </ButtonGroup>
            {selectedSection === "sort" && <Box sx={sectionStyles}>
                <Stack direction="row" sx={stackStyles}>
                    {sortable.map((item) => renderSortChip(item))}
                </Stack>
            </Box>}
            {selectedSection === "search" && <Box sx={sectionStyles}>
                <TextField id="search-field"
                           sx={{width: '100%'}}
                           label="Search"
                           variant="outlined"
                           ref={searchInput}
                           size={'small'}
                           value={searchText || ''}
                           onChange={(e) => setSearchText(e.target.value)}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <SearchIcon/>
                                   </InputAdornment>
                               )
                           }}
                />
            </Box>}
            <Box sx={groupStyles()}>
                <GroupPicker userId={user?.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            </Box>
        </ListContainer>
    );
}

