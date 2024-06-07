import Taro from '@tarojs/taro'
import { useReducer } from 'react'

/** 最近搜索 */
export default function useRecentSearch(initalValues: string[] = []) {
  const key = 'RECENT_SEARCH' // 存储key值
  const max = 10 // 最多保存几个

  const reducer = (state: string[], action) => {
    switch (action.type) {
      // 新增
      case 'add': {
        if (!action.value) {
          return state
        }
        const newData: string[] = [action.value, ...state.filter((it) => it !== action.value)].slice(0, max)
        Taro.setStorageSync(key, JSON.stringify(newData))
        return newData
      }
      // 点击
      case 'click': {
        const newData = [action.value, ...state.filter((it) => it !== action.value)].slice(0, max)
        Taro.setStorageSync(key, JSON.stringify(newData))
        return newData
      }
      // 清空
      case 'empty':
        Taro.setStorageSync(key, JSON.stringify([]))
        return [] as string[]
      default:
        return state
    }
  }

  const [values, dispatch] = useReducer<typeof reducer, string[]>(reducer, initalValues, (init) => {
    const data = Taro.getStorageSync(key)
    // eslint-disable-next-line no-nested-ternary
    return init.length ? init : data ? (JSON.parse(data) as string[]) : init
  })

  return [values!, dispatch] as const
}
