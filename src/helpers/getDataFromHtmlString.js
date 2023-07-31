import Amplify, {Auth} from 'aws-amplify';


const titleSelector = 'meta[property="og:title"], meta[property="title"], meta[name="title"], #productTitle';
const priceSelector = 'meta[property="og:price"], meta[property="price"], meta[name="price"], .a-price .a-offscreen, meta[property="product:price:amount"], .price';
const imgSelector = 'meta[property="og:image"], meta[property="image"], meta[name="image"], #main-image-container .imgTagWrapper img'

const getDataFromHtmlString = (string) => {
    try {
        const element = elementFromString(string);
        const titleElement = element.querySelector(titleSelector)
        const priceElement = element.querySelector(priceSelector)
        const imgElement = element.querySelector(imgSelector)


        const title = titleElement?.content || titleElement?.innerHTML?.trim();
        const price = (priceElement?.content || priceElement?.innerHTML).replace(/[^0-9.]/g, '');
        const image = imgElement?.content?.replace(/^\/+/, '') || imgElement?.src.replace(/^\/+/, '');

        return({title, price, image});
    } catch (e) {

    }
}

function elementFromString(string) {
    const el = document.createElement('div');
    el.innerHTML = string;
    return el;
}

export default getDataFromHtmlString
