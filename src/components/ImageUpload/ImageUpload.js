import React, {useEffect, useState} from 'react';
import {TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import styled from '@emotion/styled'
import { Storage } from "@aws-amplify/storage"
import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports";
import { FileUploader } from "react-drag-drop-files";
import ImageUploadButton from "./ImageUploadButton";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Box from "@mui/material/Box";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import useImageSrc from "../../hooks/useImageSrc";

//TODO: Style input and where image goes and ideally make add item always there.
//TODO: et right file extension instead of always png
Amplify.configure(awsconfig);


const styles = {
    width: '100%',
}

const ImageUploadEl = styled.div`
    padding-top: 30px;
    display: grid;
    flex-direction: column;
    
    > input {
        margin-top: 30px;
    }
`

const ImgEl = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
`

const InputContainerEl = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 80px 1fr;
    grid-template-rows: 80px;
    
    @media only screen and (max-width: 700px) {
    grid-template-columns: 1fr;
`

const fileTypes = ["JPG", "PNG", "GIF"];

export default function ImageUpload(props) {
    const {image, setImage} = props;
    const [type, setType] = useState('url')
    const user = useRecoilHook(currentUser)
    const imageUrl = useImageSrc(image)

    const createCustomKey = (key) => {
        return `${user?.id?.toString()}${Math.random().toString()}${encodeURI(key)}`
    }

    async function handleChange(file) {
        try {
            const {key} = await Storage.put(createCustomKey(file.name), file, {
                contentType: 'image/png'
            });

            const encodedValue = JSON.stringify({customKey: key})
            setImage(encodedValue)
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    const handleChangeType = (e) => {
        setType(e.target.value)
    }

    return (<ImageUploadEl>
       <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handleChangeType}
            aria-label="text alignment"
            sx={{marginBottom: '20px'}}
        >
            <ToggleButton value="url" aria-label="url">
                Url
            </ToggleButton>
            <ToggleButton value="upload" aria-label="upload">
                Upload
            </ToggleButton>
        </ToggleButtonGroup>
        <InputContainerEl>
            <div>
                {image ? <ImgEl
                        src={imageUrl}
                        alt="uploaded image"
                    /> :
                <AddPhotoAlternateOutlinedIcon
                    fontSize={'large'}
                    sx={{width: '80px', height: '80px'}}
                />}
            </div>

            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {type === 'url' &&
                    <TextField value={image || ''}
                               onChange={(e) => setImage(e.target.value)}
                               sx={styles}
                               id="image"
                               label="Image Url"
                               variant="outlined"
                    />}

                {type === 'upload' && <FileUploader
                    handleChange={handleChange}
                    onDrop={handleChange}
                    name="file"
                    types={fileTypes}
                    multiple={false}
                    label={'Upload or drop a file here'}
                    children={<ImageUploadButton image={image}/>}
                />}
            </Box>
        </InputContainerEl>


    </ImageUploadEl>

    );
}

