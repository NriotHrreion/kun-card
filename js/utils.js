/**
 * 
 * @param {string} selectors 
 * @returns {HTMLElement}
 */
export function $(selectors) {
    return document.querySelector(selectors);
}

/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 
 * @param {any[]} arr 
 * @param {number} index 
 */
export function arrayItemDelete(arr, index) {
    var j = index;
    while(j < arr.length) {
        arr[j] = arr[j + 1];
        j++;
    }
    arr.pop();
}
