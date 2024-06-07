import { BaseEventOrig, Image, ScrollView, View } from '@tarojs/components'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getResizeUrl } from '@wmeimob/aliyun'
import { useThrottleLast } from '@wmeimob/utils/src/hooks/useThrottleLast'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { TCateItem } from '..'
import styles from './index.module.less'
import LetTab, { LeftTabRef } from './LetTab'
import { isH5, isWebApp, isWeapp } from '../../../config'

interface ITwoLevelsProps {
  /** 默认选中tab索引 */
  defaultTabIndex?: number
  /** 数据 */
  data: TCateItem[]
  /** 点击tab */
  onTabClick?: (item: TCateItem, index: number) => void
  /** 三级点击 */
  onClick?(item: TCateItem): void
}

const imgStyle = { width: 68, height: 68 }
const BAR_ANCHOR = 'barAnchor'

const Component: FC<ITwoLevelsProps> = (props) => {
  const { defaultTabIndex = 0, data = [] } = props

  const [tabIndex, setTabIndex] = useState(defaultTabIndex)

  const ignoreScroll = useRef(false)
  const contentBoundingClientRectRef = useRef({ top: 0 })
  const leftTabRef = useRef<LeftTabRef>(null)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    if (isH5 || isWebApp) {
      const top = (document.querySelector(`.${styles.twoLevelsStyle}`) as any).getBoundingClientRect().top
      contentBoundingClientRectRef.current = { top }
    } else {
      Taro.nextTick(() => {
        const query = Taro.createSelectorQuery().in(getCurrentInstance().page!)
        query
          .select(`.${styles.twoLevelsStyle}`)
          .boundingClientRect()
          .exec(([contentBoundingClientRect]) => {
            contentBoundingClientRectRef.current = contentBoundingClientRect
          })
      })
    }
  }, [])

  const handleTabClick = async (item: TCateItem, index: number) => {
    ignoreScroll.current = true
    setTabIndex(index)
    props.onTabClick?.(item, index)

    // Taro h5 scrollIntoView 有bug 需要自己手动算
    if (isH5 || isWebApp) {
      setScrollTop(
        document.querySelector(`#${BAR_ANCHOR}`)!.scrollTop +
          (document.querySelector(`#${BAR_ANCHOR}${index}`) as any)!.getBoundingClientRect().top -
          contentBoundingClientRectRef.current.top
      )
    }
  }

  function getTop(queryString: string) {
    return new Promise<number>((resolve) => {
      if (isH5 || isWebApp) {
        const top = (document.querySelector(queryString) as any).getBoundingClientRect().top
        resolve(top - contentBoundingClientRectRef.current.top)
      } else {
        const query = Taro.createSelectorQuery().in(getCurrentInstance().page!)
        query
          .select(queryString)
          .boundingClientRect()
          .exec(([contentBoundingClientRect]) => {
            resolve(contentBoundingClientRect.top - contentBoundingClientRectRef.current.top)
          })
      }
    })
  }

  const handleScroll = useThrottleLast(async ({ detail }: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
    if (ignoreScroll.current) {
      setTimeout(() => {
        ignoreScroll.current = false
      }, 50)
      return
    }
    leftTabRef.current?.setTabIndex(await getBarActiveIndex())
  }, 20)

  async function getBarActiveIndex() {
    const tops = await Promise.all(data.map((value, index) => getTop(`#${BAR_ANCHOR}${index}`)))
    let barActiveIndex = 0
    let minTop = Math.abs(tops[0])

    tops.forEach((value, index) => {
      if (Math.abs(value) < minTop) {
        minTop = Math.abs(value)
        barActiveIndex = index
      }
    })
    return barActiveIndex
  }

  return (
    <View className={styles.twoLevelsStyle}>
      {/* 左侧tab */}
      <LetTab ref={leftTabRef} defaultTabIndex={defaultTabIndex} data={data} onClick={handleTabClick} />

      {/* 右侧内容 */}
      <ScrollView
        scrollY
        scrollIntoView={isWeapp ? `${BAR_ANCHOR}${tabIndex}` : undefined}
        scrollTop={scrollTop}
        id={BAR_ANCHOR}
        className={styles.tabContent}
        onScroll={handleScroll}
      >
        <View className={styles.tabContent_inner}>
          {data.map((tab, index) => {
            const { children = [] } = tab
            return (
              <View key={tab.value} id={`${BAR_ANCHOR}${index}`}>
                {/* 一级标题 */}
                <View className={styles.tabContent_head}>{tab.title}</View>
                {/* 二级分类 */}
                <View className={styles.tabContent_thirdList}>
                  {children.map((ch) => {
                    const imgUrl = ch.origin.pic ? ch.origin.pic + getResizeUrl(imgStyle) : ''
                    return (
                      <View key={ch.value} className={styles.tabContent_thirdList_item} onClick={() => props.onClick?.(ch)}>
                        <Image src={imgUrl} style={imgStyle} />
                        <View className={styles.tabContent_thirdList_item_text}>{ch.title}</View>
                      </View>
                    )
                  })}
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const TwoLevels = memo(Component)
export default TwoLevels
