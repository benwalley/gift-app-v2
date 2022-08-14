export function toggleValueInArray(array, value) {
    const arrayCopy = [...array];
    if(arrayCopy.includes(value)) {
        arrayCopy.splice(arrayCopy.indexOf(value), 1)
        return arrayCopy
    }
    arrayCopy.push(value)
    return arrayCopy
}
