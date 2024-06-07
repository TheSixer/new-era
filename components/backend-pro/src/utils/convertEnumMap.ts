
/** 
 * 将枚举映射对象转换为下拉框数组
 */
export default function convertEnumMap(obj: Record<any, string>) {
  let flag = 'string'
  return Object.keys(obj).reduce((arr, value, index) => {
    let pValue = parseInt(value, 10)
    if (index === 0) {
      if (!isNaN(pValue)) {
        flag = 'number'
      }
    }
    arr.push({ label: obj[value], value: flag === 'number' ? pValue : value })
    return arr;
  }, [] as { label: string, value: any }[])
}