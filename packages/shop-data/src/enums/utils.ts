/**
 * 将数组转换成对象
 *
 * @export
 * @param {string[][]} data
 * @return {*}
 */
export function converEnmuMap(data: any[][]) {
  return data.reduce((obj, [key, value = '']) => {
    obj[key] = value
    return obj
  }, {} as Record<string, string>)
}

/**
 * 将数组转换成下拉框数组
 *
 * @export
 * @param {string[][]} data
 * @return {*}
 */
export function converEnumArray(data: any[][]) {
  return data.map(([value, label]) => ({ label, value }))
}
