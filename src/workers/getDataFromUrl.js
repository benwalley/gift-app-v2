
export default () => {
    onmessage = async (e) => {
        try {
            const url = e.data
            const resp = await fetch(url);
            const body = await resp.json();
            postMessage(body)
        } catch(e) {
            console.log(e)
            postMessage('error')
        }

    }
};
