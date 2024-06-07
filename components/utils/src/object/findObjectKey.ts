/**
 * 根据值查找key
 *
 * @export
 * @param {{ [key: string]: any }} obj
 * @param {*} value
 * @returns
 */
export function findObjectKey(obj: Record<string, any>, value: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key]
      if (element === value) {
        return key
      }
    }
  }
}
