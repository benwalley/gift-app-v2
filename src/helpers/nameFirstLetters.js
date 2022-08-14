export const getFirstLetters = (string) => {
    if(!string) return ''
    return string.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2)
}
