let updateTimeout;

export function asyncUpdate(func, arg) {
    clearTimeout(updateTimeout)
    updateTimeout = setTimeout(() => {
        func(...arg);
    }, 300)
}
