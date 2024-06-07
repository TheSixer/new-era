/* eslint-disable max-params */
import { BaseEventOrig, PickerViewProps } from '@tarojs/components'
import { useState, useMemo, useEffect, useImperativeHandle, ForwardedRef } from 'react'
import { IMMPickerProps, IMMPickerData, PickerValueType, IMMPickerRef } from './const'

const ids = [gids(), gids(), gids(), gids(), gids(), gids(), gids(), gids()]

/**
 * 选择器业务hook
 * @param props
 * @param fieldKey
 * @returns
 */
export function usePicker(props: IMMPickerProps, fieldKey: any, ref: ForwardedRef<IMMPickerRef>) {
  const { data } = props

  const [innerValue, setInnerValue] = useState([...props.value]) // 组件内部管理数据
  /**
   * 内部选中的索引以及数据
   * 小程序使用的是index来追踪选中。需要做一下转化
   */
  const [innerIndex, innerList] = useMemo(() => {
    const [idxs, lists] = getData(innerValue, data)

    return [idxs, lists.map((data, idx) => ({ id: ids[idx], data }))]
  }, [innerValue, data])

  useImperativeHandle(ref, () => ({
    getDataByKeys: (keys) => {
      const [, lists] = getData(keys, data)

      return lists.map((item, idx) => {
        const targetIdx = innerIndex[idx]
        const target = item[targetIdx]
        return target
      })
    }
  }))

  // 同步value
  useEffect(() => {
    if (props.value?.join(',') !== innerValue.join(',')) {
      setInnerValue([...props.value])
    }
  }, [props.value])

  // 处理数值变化
  function handleChange(ev: BaseEventOrig<PickerViewProps.onChangeEventDetail>) {
    const { value: indexs } = ev.detail
    const [cValues, results] = covertChangeData(indexs) // 矫正数据
    setInnerValue(cValues)
    props.onChange?.(cValues, results)
  }

  /**
   * 根据value和data数组。将数据转换为picker需要的数据结构
   *
   * @param {string[]} checkedData 当前选中的值
   * @param {IMMPickerData[]} pickData 选择列表
   * @param {number[]} [cIndex=[]] 匹配的index索引。从0开始
   * @param {IMMPickerData[][]} [cList=[]] 需要渲染的列数据
   * @return {*}
   */
  function getData(checkedData: any[], pickData: IMMPickerData[], cIndex: number[] = [], cList: IMMPickerData[][] = []): [number[], IMMPickerData[][]] {
    if (!pickData?.length) {
      return [cIndex, cList]
    }

    // 取出第一个值
    const [checkedValue, ...restCheckdata] = checkedData
    // 当前值在数组第几
    let checkdIndex = pickData.findIndex((item) => item[fieldKey.value] === checkedValue)
    // 如果没有则默认反推第一项
    checkdIndex = checkdIndex === -1 ? 0 : checkdIndex
    // 取出匹配项数据
    const matchData = checkdIndex === -1 ? pickData[0] : pickData[checkdIndex]

    cIndex.push(checkdIndex)
    cList.push(pickData)
    // 递归
    return getData(restCheckdata, matchData.children || [], cIndex, cList)
  }

  /**
   * 处理转换选中的数据
   * 矫正数据
   * @param changedIndex
   * @param list
   * @param values
   * @param correctData
   * @returns
   */
  function covertChangeData(changedIndex: number[], list = innerList, values = innerValue, correctData: [string[], IMMPickerData[]] = [[], []]) {
    const [firstIndex, ...restIndexs] = changedIndex // 取出第一个索引
    const [firstList, ...restList] = list // 取出第一个列表
    const [propValue, ...restValues] = values // 取出第一个prop value

    // 变化的item和value
    const changeItem = firstList.data[firstIndex]
    const changeValue = changeItem[fieldKey.value]
    correctData[0].push(changeValue)
    correctData[1].push(changeItem)
    // 判断值是否与当前Value一样。如果不一样
    if (changeValue !== propValue) {
      // 递归取第一个
      const childs = getFirstChild(changeItem, restValues, [])
      childs.forEach((item) => {
        correctData[0].push(item[fieldKey.value])
        correctData[1].push({ ...item })
      })
      return correctData
    }
    if (restIndexs?.length) {
      return covertChangeData(restIndexs, restList, restValues, correctData)
    }

    return correctData
  }

  function getFirstChild({ children = [] }: IMMPickerData, restValues: PickerValueType[], result: IMMPickerData[]): IMMPickerData[] {
    const [rValue, ...rest] = restValues
    let [child] = children
    if (rValue) {
      const matchChild = children.find((ch) => ch[fieldKey.value] === rValue)
      if (matchChild) {
        child = matchChild
      }
    }
    return !child ? result : getFirstChild(child, rest, result.concat(child))
  }

  return {
    innerIndex,
    innerList,
    handleChange
  }
}

function gids(times = 4) {
  return [...Array(times)].map(() => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)).join('-')
}
