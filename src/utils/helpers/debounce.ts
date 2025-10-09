export const debounce = (func: Function, wait: number) => {
    let timeout: undefined | number;

    return function (...args: string[]) {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
}