/**
 * @typeparam {T} the type parameter
 * @param {Array<T>} arr
 * @param {(arg: T) => string} selector
 */
export function deduplicate(arr, selector) {
  const keySet = new Set();
  return arr.filter((v) => {
    const key = selector(v);
    if (keySet.has(key)) {
      return false;
    }

    keySet.add(key);
    return true;
  });
}
