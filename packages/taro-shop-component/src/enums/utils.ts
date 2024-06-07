/**
 * 根据枚举对象转换为optins数组
 * @param enumItem
 * @param map
 * @returns
 */
export function createEnumOptions(map: Record<string | number, any>, numeric = true) {
  return Object.keys(map).map((value) => ({ label: map[value], value: numeric ? Number(value) : value }))
}
