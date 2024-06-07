/**
 * 合并对象,如果值相同返回原对象
 *
 * @export
 * @template T
 * @param {T} prevObj
 * @param {Partial<T>} partialObj
 * @returns {T}
 */
export function concatObj<T>(prevObj: T, partialObj: Partial<T>): T {
  let newObj = prevObj
  for (const key in partialObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      const element = partialObj[key]
      if (newObj[key] !== element) {
        newObj = { ...newObj, [key]: element }
      }
    }
  }
  return newObj
}
