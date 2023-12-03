import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import initAmazonPostWorker from "../../workers/getDataFromUrl";
import getDataFromHtmlString from "../../helpers/getDataFromHtmlString";
import WebWorker from "../../workers/workerSetup";
import getData from "../../workers/getDataFromUrl";


export default function AddItemFromShare() {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('')
    const [getDataWorker, setGetDataWorker] = useState();
    const [data, setData] = useState({})

    useEffect(() => {
        // create web worker
        const newGetDataWorker = new WebWorker(getData)
        setGetDataWorker(newGetDataWorker);

        newGetDataWorker.addEventListener('message', function(e) {
            setData(e.data);
        })
    }, []);

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}

