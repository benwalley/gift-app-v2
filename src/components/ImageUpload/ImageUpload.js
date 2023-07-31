import React, {memo, useEffect, useRef, useState} from 'react';
import {IconButton, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import styled from '@emotion/styled'
import {Storage} from "@aws-amplify/storage"
import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports";
import {FileUploader} from "react-drag-drop-files";
import ImageUploadButton from "./ImageUploadButton";
import Box from "@mui/material/Box";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import useImageSrc from "../../hooks/useImageSrc";
import Resizer from "react-image-file-resizer";
import UploadedImage from "./UploadedImage";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";

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
    padding: 10px;
    margin: 10px 0;
    
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

`

const InputRowEl = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
`

const addButtonStyles = {
    background: '#f0f0f0',
    borderRadius: '5px',
    width: '100px',
    height: '100px',
}

const UploadListEl = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
    position: relative;
    flex-wrap: wrap;
`

const moveButtonStyles = {
    display: 'flex',
    justifyContent: 'space-between',
}

const fileTypes = ["JPG", "PNG", "GIF"];

const ImageUpload = memo(function ImageUpload(props) {
    const {maxSize, imageList, setImageList} = props;
    const [type, setType] = useState('url')
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageSrc, setImageSrc] = useState('')
    const [link, setLink] = useState('');
    const [note, setNote] = useState('');
    const [randomNumberCounter, setRandomNumberCounter] = useState(0);

    const [mainId, setMainId] = useState(0);
    const user = useRecoilHook(currentUser);
    const containerRef = useRef(undefined)

    function getRandomNumber() {
        let value = randomNumberCounter;
        for(const item of imageList) {
            if(item.id === value) {
                value++;
            }
        }
        setRandomNumberCounter(value + 1);
        return value;
    }

    useEffect(() => {
        if(imageList.length === 0) {
            setImageList([{id: getRandomNumber(), note: '', link: '', imageSrc: ''}])
        }
        setImageSrc(imageList?.[currentImageIndex]?.imageSrc || '');
        setNote(imageList?.[currentImageIndex]?.note || '');
        setLink(imageList?.[currentImageIndex]?.link || '');
    }, [currentImageIndex]);


    useEffect(() => {
        if(imageList.length === 0) return;
        const imageListCopy = [...imageList];
        const id = imageListCopy[currentImageIndex].id ?? getRandomNumber();
        imageListCopy[currentImageIndex] = {id, note, link, imageSrc};
        setImageList(imageListCopy);
    }, [imageSrc, link, note, type]);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                maxSize || 550,
                maxSize || 550,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    const createCustomKey = (key) => {
        return `${user?.id?.toString()}${Math.random().toString()}${encodeURI(key)}`
    }

    async function handleUpload(file) {
        try {
            const image = await resizeFile(file);

            const {key} = await Storage.put(createCustomKey(file.name), image, {
                contentType: 'image/png'
            });

            const encodedValue = JSON.stringify({customKey: key})
            setImageSrc(encodedValue);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    const handleChangeType = (e) => {
        setType(e.target.value);
    }

    function handleAddImage() {
        const imageListCopy = [...imageList];
        const listLength = imageListCopy.length;
        imageListCopy.push({id: getRandomNumber(), note: '', link: '', imageSrc: ''});
        setImageList(imageListCopy);
        setCurrentImageIndex(listLength);
    }

    function handleDelete(index) {
        const imageListCopy = [...imageList];
        imageListCopy.splice(index, 1)
        setImageList(imageListCopy)
    }

    function handleMoveLeft(e) {
        e.preventDefault();
        if(currentImageIndex === 0) return;
        const imageListCopy = JSON.parse(JSON.stringify(imageList));
        const movingItem = imageListCopy[currentImageIndex]
        imageListCopy.splice(currentImageIndex, 1)
        imageListCopy.splice(currentImageIndex - 1, 0, movingItem)
        setImageList(imageListCopy)
        setCurrentImageIndex(currentImageIndex - 1)
    }

    function handleMoveRight(e) {
        e.preventDefault()
        if(currentImageIndex === (imageList.length - 1)) return;
        const imageListCopy = JSON.parse(JSON.stringify(imageList));
        const movingItem = imageListCopy[currentImageIndex]
        imageListCopy.splice(currentImageIndex, 1)
        imageListCopy.splice(currentImageIndex + 1, 0, movingItem)
        setImageList(imageListCopy)
        setCurrentImageIndex(currentImageIndex + 1)
    }

    return (<ImageUploadEl>
            <h4>Images</h4>
            <UploadListEl ref={containerRef}>
                {imageList.map((item, index) => {
                    return <UploadedImage
                        src={item.imageSrc}
                        alt={item.note}
                        key={item.id}
                        handleEdit={() => setCurrentImageIndex(index)}
                        handleDelete={() => handleDelete(index)}
                        isSelected={currentImageIndex === index}
                        isMain={mainId === item.id}
                        handleSetMain={() => setMainId(item.id)}
                    />
                })}
                <IconButton sx={addButtonStyles}
                            aria-label="Add another image"
                            size={'large'}
                            onClick={handleAddImage}
                >
                    <AddIcon fontSize='inherit'/>
                </IconButton>
            </UploadListEl>
            <div style={moveButtonStyles}>
                <Button onClick={handleMoveLeft} type={'text'}>move left</Button>
                <Button onClick={handleMoveRight} type={'text'}>move right</Button>
            </div>
            <InputRowEl>
                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={handleChangeType}
                    aria-label="text alignment"
                    sx={{margin: 'auto 0'}}
                >
                    <ToggleButton value="url" aria-label="url">
                        Url
                    </ToggleButton>
                    <ToggleButton value="upload" aria-label="upload">
                        Upload
                    </ToggleButton>
                </ToggleButtonGroup>
                <InputContainerEl>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {type === 'url' &&
                            <TextField value={imageSrc}
                                       onChange={(e) => setImageSrc(e.target.value)}
                                       sx={styles}
                                       id="image"
                                       label="Image Url"
                                       variant="outlined"
                            />}

                        {type === 'upload' && <FileUploader
                            handleChange={handleUpload}
                            onDrop={handleUpload}
                            name="file"
                            types={fileTypes}
                            multiple={false}
                            label={'Upload or drop a file here'}
                            children={<ImageUploadButton/>}
                        />}
                    </Box>
                </InputContainerEl>
                <TextField sx={{gridColumn: '1/-1'}}
                           size='small'
                           value={link}
                           onChange={(e) => setLink(e.target.value)}
                           id="link"
                           label="Optional link to this item"
                           variant="outlined"/>
                <TextField sx={{gridColumn: '1/-1'}}
                           size='small'
                           value={note}
                           onChange={(e) => setNote(e.target.value)}
                           id="note"
                           label="Optional note about this image"
                           variant="outlined"/>
            </InputRowEl>
        </ImageUploadEl>

    );
})

export default ImageUpload;

