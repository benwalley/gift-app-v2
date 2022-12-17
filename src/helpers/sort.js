export function sortAZ(a, b) {
    if(a === undefined || b === undefined) return 0
    const first = a.username || a.name || ''
    const second = b.username || b.name || ''
    return first.localeCompare(second)
}

export function sortZA(a, b) {
    if(a === undefined || b === undefined) return 0
    const first = a.username || a.name ||  ''
    const second = b.username || b.name || ''
    return second.localeCompare(first)
}

export function sortDateAddedRecentFirst(a, b) {
    if(a === undefined || b === undefined) return 0
    const first = new Date(a.createdAt) || 0
    const second = new Date(b.createdAt) || 0
    if(first < second) return 1
    if(second < first) return -1
    return 0;
}

export function sortDateAddedOldestFirst(a, b) {
    if(a === undefined || b === undefined) return 0
    const first = new Date(a.createdAt) || 0
    const second = new Date(b.createdAt) || 0
    if(first < second) return -1
    if(second < first) return 1
    return 0;
}

export function sortMostWantedFirst(a, b) {
    if(a === undefined || b === undefined) return 0
    const first = parseFloat(a.priority) || 0
    const second = parseFloat(b.priority) || 0
    if(first < second) return 1
    if(second < first) return -1
    return 0;
}

export function sortPriceHighFirst(a, b) {
    if(a === undefined || b === undefined) return 0
    const first = parseFloat(a.price) || 0
    const second = parseFloat(b.price) || 0
    if(first < second) return 1
    if(second < first) return -1
    return 0;
}

export function sortPriceLowFirst(a, b) {
    if(a === undefined || b === undefined) return 0
    if(a.price === '') return 1;
    if(b.price === '') return -1;
    const first = parseFloat(a.price) || 0
    const second = parseFloat(b.price) || 0
    if(first < second) return -1
    if(second < first) return 1
    return 0;
}
//filterArray.push('Gotten')
//         filterArray.push('Not Gotten')
//         filterArray.push('Someone wants to go in on')

export function sortGottenFirst(a, b) {
    if(a === undefined || b === undefined) return 0
    const first = a.gottenBy?.length > 0 || false;
    const second = b.gottenBy?.length > 0 || false;
    if(first && !second) return -1
    if(second && !first) return 1
    return 0;
}

export function sortNotGottenFirst(a, b) {
    if(a === undefined || b === undefined) return 0
    const first = a.gottenBy?.length > 0 || false;
    const second = b.gottenBy?.length > 0 || false;
    if(first && !second) return 1
    if(second && !first) return -1
    return 0;
}

export function sortSomeoneWantsToGoInOnFirst(a, b) {
    if(a === undefined || b === undefined) return 0
    const first = a.wantsToGet?.length > 0 || false;
    const second = b.wantsToGet?.length > 0 || false;
    if(first && !second) return -1
    if(second && !first) return 1
    return 0;
}
