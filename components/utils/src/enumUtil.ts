/**
 * 枚举工具函数
 */

/**
 * 将数组转换成对象
 *
 * @export
 * @param {string[][]} data
 * @return {*}
 */
export function convertEnumMap(data: any[][]) {
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
export function convertEnumArray(data: any[][]) {
  return data.map(([value, label]: [any, string]) => ({ label, value }))
}

/**
 * 将枚举同时转化为对象和数组
 *
 * @export
 * @param {any[][]} data
 * @return {*}
 */
export function convertEnum(data: any[][]) {
  return [convertEnumMap(data), convertEnumArray(data)] as const
}
