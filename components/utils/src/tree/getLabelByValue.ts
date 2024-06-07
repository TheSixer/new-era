interface IOption {
  label: string
  value: string
  children?: IOption[]
}

/**
 * 根据值从树状数据中获取标签值
 *
 * @export
 * @param {(string | string[])} value
 * @param {IOption[]} options
 * @return {*}
 */
export default function getLabelByValue(value: string | string[], options: IOption[]) {
  const values = typeof value === 'string' ? value.split(',') : value

  // 递归树
  function recursionTree(ids: string[], data: any[], result: string[] = []) {
    ids.forEach((id, index, array) => {
      const matchData = data.find((da) => `${da.value}` === `${id}`)
      // 命中数据
      if (matchData) {
        result.push(matchData.label)
        if (matchData.children && matchData.children.length) {
          result = recursionTree(array.slice(index), matchData.children, result)
        }
      }
    })
    return result
  }

  return recursionTree(values, options)
}
