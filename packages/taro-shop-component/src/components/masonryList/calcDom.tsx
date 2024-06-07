/* eslint-disable max-nested-callbacks */
import Taro from '@tarojs/taro'
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import GoodCard from '../good/goodCard'
import styles from './index.module.less'

interface ICalcDomProps {
  style: any
}

const Component = forwardRef<any, ICalcDomProps>((props, ref) => {
  const [list, setList] = useState<any[]>([])

  const promiseQueue = useRef<any[]>([])

  const hasQueue = useRef(false)
  const currentHandler = useRef<any>()

  useImperativeHandle(ref, () => ({ getDataMap }))

  async function getDataMap(listData: any[]) {
    return new Promise(resove => {
      // 往队列中推一条数据
      promiseQueue.current.push([resove, listData])
      traverseQueue()
    })
  }

  /** 执行队列 */
  function traverseQueue() {
    // 如果队列为空。直接结束
    if (!promiseQueue.current.length) {
      return (hasQueue.current = false)
    }
    // 如果有执行。直接返回
    if (hasQueue.current) {
      return
    }
    // 标记是否有执行的队列
    hasQueue.current = true
    const [handler, listData] = promiseQueue.current.shift()
    // console.log(listData, 'que')
    currentHandler.current = handler
    setList(listData)
  }

  useEffect(() => {
    if (currentHandler.current) {
      Taro.nextTick(() => {
        setTimeout(() => {
          calc(list).then(dataMap => {
            currentHandler.current(dataMap)
            currentHandler.current = null
            hasQueue.current = false
            traverseQueue()
          })
        }, 10)
      })
    }
  }, [list])

  function calc(calcList: any[]) {
    return new Promise<Record<string, number>>(resolve => {
      if (!calcList.length) {
        return resolve({})
      }
      Taro.createSelectorQuery()
        .selectAll(`.calcDomGoodWrapper`)
        .boundingClientRect((res: any) => {
          let dataMap: Record<string, number> = {}
          // console.log('dom', res)
          try {
            dataMap = res.reduce((result, node, index) => {
              result[calcList[index].goodsNo!] = node.height
              return result
            }, dataMap)
          } catch (error) {
            // debugger
          }
          resolve(dataMap)
        })
        .exec()
    })
  }

  return (
    <View className={styles.clacDom} style={props.style}>
      {list.map(item => (
        <View key={item.goodsNo} className="calcDomGoodWrapper">
          <GoodCard data={item} />
        </View>
      ))}
    </View>
  )
})

const CalcDom = memo(Component)
export default CalcDom
