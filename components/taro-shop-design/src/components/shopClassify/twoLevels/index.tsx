import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { ScrollView, View, Image, BaseEventOrig } from '@tarojs/components'
import { ITwoLevelsProps, TCateItem } from './const'
import styles from './index.module.less'
import { getResizeUrl } from '@wmeimob/aliyun'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'
import { useThrottleLast } from '@wmeimob/utils/src/hooks/useThrottleLast'
import LetTab, { LeftTabRef } from './LetTab'

const imgStyle = { width: 68, height: 68 }
const BAR_ANCHOR = 'barAnchor'

const Component: FC<ITwoLevelsProps> = (props) => {
  const { defaultTabIndex = 0, data = [] } = props

  const [tabIndex, setTabIndex] = useState(defaultTabIndex)

  const ignoreScroll = useRef(false)
  const contentBoundingClientRectRef = useRef({ top: 0 })
  const leftTabRef = useRef<LeftTabRef>(null)

  useEffect(() => {
    Taro.nextTick(() => {
      const query = Taro.createSelectorQuery().in(getCurrentInstance().page!)
      query
        .select(`.${styles.twoLevelsStyle}`)
        .boundingClientRect()
        .exec(([contentBoundingClientRect]) => {
          contentBoundingClientRectRef.current = contentBoundingClientRect
        })
    })
  }, [])

  const handleTabClick = (item: TCateItem, index: number) => {
    setTabIndex(index)
    ignoreScroll.current = true
    props.onTabClick?.(item, index)
  }

  const handleScroll = useThrottleLast(({ detail }: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
    if (ignoreScroll.current) {
      setTimeout(() => {
        ignoreScroll.current = false
      }, 50)
      return
    }
    const { deltaY } = detail
    const contentBoundingClientRect = contentBoundingClientRectRef.current

    let barActiveIndex = leftTabRef.current!.tabIndex
    // console.log(detail.deltaY, detail.scrollTop)
    const query = Taro.createSelectorQuery()
    // 向下滚动
    if (deltaY < 0) {
      barActiveIndex += 1
      query.select(`#${BAR_ANCHOR}${barActiveIndex}`).boundingClientRect()
      query.exec(([bound]) => {
        const top = bound.top - contentBoundingClientRect!.top
        if (top <= 0) {
          leftTabRef.current?.setTabIndex(barActiveIndex)
        }
        // console.log('down', top)
      })
    } else {
      query.select(`#${BAR_ANCHOR}${barActiveIndex}`).boundingClientRect()
      query.exec(([bound]) => {
        const top = bound.top - contentBoundingClientRect!.top
        if (top >= 0) {
          barActiveIndex -= 1
          const activeIndex = barActiveIndex < 0 ? 0 : barActiveIndex
          leftTabRef.current?.setTabIndex(activeIndex)
        }
        // console.log('up', top)
      })
    }
  }, 20)

  return (
    <View className={styles.twoLevelsStyle}>
      {/* 左侧tab */}
      <LetTab ref={leftTabRef} defaultTabIndex={defaultTabIndex} data={data} onClick={handleTabClick} />

      {/* 右侧内容 */}
      <ScrollView scrollY scrollIntoView={`${BAR_ANCHOR}${tabIndex}`} className={styles.tabContent} onScroll={handleScroll}>
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
