import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {IconButton, Tooltip} from "@mui/material";


export default function ToolbarButton(props) {
    const {selectedSection, setSelectedSection, name, value, icon, mobileIcon} = props
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const breakpoint = 400;

    //choose the screen size
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    }

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    function toggleSelection(value) {
        if(selectedSection === value) {
            setSelectedSection('')
        } else {
            setSelectedSection(value)
        }
    }

    return (
        <>
            {(screenWidth >= breakpoint || !mobileIcon) && <Button onClick={() => toggleSelection(value)}
                    variant="text"
                    endIcon={icon}
                    color={selectedSection === value ? 'secondary' : 'textBlack'}
                    sx={{padding: '6px 15px'}}
            >
                {name}
            </Button>}
            {screenWidth < breakpoint && mobileIcon && <Tooltip title={name}>
                <IconButton onClick={() => toggleSelection(value)}
                            aria-label={name}
                            color={selectedSection === value ? 'secondary' : 'textBlack'}
                            sx={{
                                padding: '6px 15px'
                            }}
                >
                    {icon}
                </IconButton>
            </Tooltip>}
        </>

    );
}




