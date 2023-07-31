import {lambdaUrl, webScrapeUrl} from "./variables";

export function getFetchUrlFromUrl(url) {
    return `${lambdaUrl}${webScrapeUrl}?url=${url}`
}
