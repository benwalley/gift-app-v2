import {useEffect, useState} from 'react';
import WebWorker from "../workers/workerSetup";
import getData from "../workers/getDataFromUrl";
import useFetchUrlFromTargetUrl from "./useFetchUrlFromTargetUrl";
import getDataFromHtmlString from "../helpers/getDataFromHtmlString";

export default function useDataFromUrl(url) {
    const [data, setData] = useState({})
    const [timeout, setTimeout] = useState(0)
    const [getDataWorker, setGetDataWorker] = useState();
    const fetchUrl = useFetchUrlFromTargetUrl(url)

    useEffect(() => {
        if(!getDataWorker) return;
        getDataWorker.addEventListener('message', function(e) {
            console.log(e.data);
            const dataObject = getDataFromHtmlString(e.data);
            setData(dataObject);
        })
    }, [getDataWorker]);


    useEffect(() => {
        // do the fetch;
        window.clearTimeout(timeout);

        const timeoutVal = window.setTimeout(fetchData, 300);
        setTimeout(timeoutVal);

    }, [fetchUrl]);

    async function fetchData() {
        if(getDataWorker)  {
            getDataWorker.terminate();
        }
        const newGetDataWorker = new WebWorker(getData)
        setGetDataWorker(newGetDataWorker);

        newGetDataWorker.postMessage(fetchUrl);
    }

    return data
}
