import Taro from '@tarojs/taro'
import { memo, useEffect, useRef, useState, FC } from 'react'
import { View } from '@tarojs/components'
import { IMasonryListProps } from './const'
import styles from './index.module.less'
import GoodCard from '../good/goodCard'
import CalcDom from './calcDom'
import classNames from 'classnames'
import { IGoodsVoWithActivity } from '@wmeimob/taro-api/src/types/goods/IGoodsVoWithActivity'

/**
 * 商品瀑布流组件
 */
const Component: FC<IMasonryListProps> = (props) => {
  const { data, gap = 10, className = '' } = props

  const [leftData, setLeftData] = useState<IGoodsVoWithActivity[]>([])
  const [rightData, setrightData] = useState<IGoodsVoWithActivity[]>([])

  const width = useRef((Taro.getSystemInfoSync().screenWidth - gap * 3) / 2)
  const dataHeightRef = useRef<Record<string, number>>({})
  const leftViewHeight = useRef(0)
  const rightViewHeight = useRef(0)

  const isInitRef = useRef(false)

  const calcDomRef = useRef<any>()

  useEffect(() => {
    /** 如果新的列表长度短于当前已经渲染的长度。表示是新列表。重新计算 */
    isInitRef.current = data.length < leftData.length + rightData.length || (data.length <= 10 && leftData.length + rightData.length <= 10)
    // 提取新列表数据
    const renderList: IGoodsVoWithActivity[] = data.filter(({ goodsNo = '' }) => {
      return !dataHeightRef.current[goodsNo] || isInitRef.current
    })
    // console.log(data.length, leftData.length, rightData.length)
    calcDomRef.current!.getDataMap(renderList).then((heightMap: Record<string, number>) => {
      if (isInitRef.current) {
        dataHeightRef.current = {}
        leftViewHeight.current = 0
        rightViewHeight.current = 0
      }

      dataHeightRef.current = { ...dataHeightRef.current, ...heightMap }

      const left: IGoodsVoWithActivity[] = []
      const right: IGoodsVoWithActivity[] = []
      // console.log(dataHeightRef.current, renderList)
      renderList.forEach((item) => {
        const { goodsNo = '' } = item
        const height = (dataHeightRef.current[goodsNo] || 0) + gap
        // console.log(leftViewHeight.current, rightViewHeight.current, height)
        if (leftViewHeight.current <= rightViewHeight.current) {
          left.push(item)
          leftViewHeight.current += height
        } else {
          right.push(item)
          rightViewHeight.current += height
        }
      })

      setLeftData((pre) => (isInitRef.current ? left : pre.concat(left)))
      setrightData((pre) => (isInitRef.current ? right : pre.concat(right)))
    })
  }, [data])

  return (
    <>
      {/* 高度计算组件 */}
      <CalcDom style={{ width: width.current }} ref={calcDomRef} />
      {!!data.length && (
        <View className={classNames(styles.masonryListStyle, className)}>
          {/* 左列 */}
          <View className={styles.sview} style={{ paddingRight: gap / 2 }}>
            {leftData.map((item) => (
              <View key={item.goodsNo} style={{ marginTop: gap }}>
                <GoodCard data={item} onClick={() => props.onClick?.(item)} />
              </View>
            ))}
          </View>

          {/* 右列 */}
          <View className={styles.sview} style={{ paddingLeft: gap / 2 }}>
            {rightData.map((item) => (
              <View key={item.goodsNo} style={{ marginTop: gap }}>
                <GoodCard data={item} onClick={() => props.onClick?.(item)} />
              </View>
            ))}
          </View>
        </View>
      )}
    </>
  )
}

const MasonryList = memo(Component)
export default MasonryList
