import React, { memo, FC, ReactNode, useState, useRef, useEffect, PropsWithChildren, useMemo } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'
import MMIndexBarAnchor, { IIndexBarAnchorProps } from './anchor'
import MMIndexBarBriefs from './briefs'
import { useThrottleLast } from '@wmeimob/utils/src/hooks/useThrottleLast'
import { isNewIphone } from '../utils'

interface IIndexBarProps {
  /** 默认激活的索引 */
  defaultActiveIndex?: string

  /**
   * 容器高度
   * 默认为容器剩余高度
   */
  height?: number

  /**
   * 标题是否钉在顶部
   * @default true
   */
  sticky?: boolean

  /**
   * 头部内容
   * 插在头部跟随滚动
   */
  header?: {
    /** 头部索引。唯一标识 */
    index: string
    /** 锚点 */
    brief?: ReactNode
    /** 渲染node */
    headerRender?: ReactNode
  }

  /**
   * 当锚点变化时回调
   */
  onIndexChange?(index: string): void
}

/**
 * name 索引栏
 */
const Component: FC<PropsWithChildren<IIndexBarProps>> = (props) => {
  const { height, header } = props

  const isRenderHeader = useMemo(() => !!header?.index, [header]) // 是否渲染头部

  const [activeIndex, setActiveIndex] = useState(header?.index ?? props.defaultActiveIndex) // 当前激活的索引

  const [containerHeight, setContainerHeight] = useState<number>() // 内部容器高度

  const indexItems: { index: string; brief: ReactNode }[] = header?.index ? [{ index: header.index, brief: header.brief }] : []

  const placeRef = useRef(`indexPlace`)

  const scrollViewRef = useRef<{
    scrollIntoView(selector: string): void
  }>()

  const containerOffsetHeight = useRef(0) // 容器距离顶部高度
  const anchorItemsRef = useRef<Taro.NodesRef.BoundingClientRectCallbackResult[]>([]) // 所有子级锚点node数组

  // 获取子节点信息
  React.Children.forEach(props.children, (child: { props: IIndexBarAnchorProps; type?: { displayName: string } }, index) => {
    const { type, props } = child
    if (type?.displayName !== 'MMIndexBarAnchor') {
      throw new Error('MMIndexBar组件children必须为MMIndexBarAnchor')
    }

    if (activeIndex === undefined && index === 0) {
      setActiveIndex(props.index)
    }
    indexItems.push({
      index: props.index,
      brief: props.brief
    })
  })

  useEffect(() => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery()
      if (!height) {
        // 计算容器高度
        query
          .select(`#${placeRef.current}`)
          .boundingClientRect(({ top }) => {
            containerOffsetHeight.current = top
            setContainerHeight(Taro.getSystemInfoSync().screenHeight - top)
          })
          .exec()
      } else {
        setContainerHeight(height)
      }
      // 计算缓存所有锚点
      query
        .selectAll(`.${styles.indexBarAnchorStyle}`)
        .boundingClientRect((res) => {
          // console.log(res, 'res')
          anchorItemsRef.current = res as any
        })
        .exec()

      // 获取scrollViewContext
      query
        .select(`#scorllViewId`)
        .node((res) => {
          scrollViewRef.current = res.node as any
        })
        .exec()
    })
  }, [height])

  // 处理滚动
  const hanldeScroll = useThrottleLast((ev) => {
    const result = anchorItemsRef.current.filter((item) => {
      return item.top - containerOffsetHeight.current <= ev.detail.scrollTop
    })
    // console.log(ev.detail.scrollTop, result[result.length - 1])
    const nextIndex = result[result.length - 1].id.replace('anchor-', '')

    setActiveIndex((pre) => {
      if (pre !== nextIndex) {
        props.onIndexChange?.(nextIndex)
      }
      return nextIndex
    })
  }, 50)

  // 点击右侧描述快捷栏目
  const handleBriefClick = (index) => {
    setActiveIndex((pre) => {
      pre !== index && props.onIndexChange?.(index)
      return index
    })

    scrollViewRef.current?.scrollIntoView(`#anchor-${index}`)
  }

  return (
    <View className={styles.indexBarStyle} style={{ height: containerHeight }}>
      <View id={placeRef.current} />
      <MMIndexBarBriefs index={activeIndex} data={indexItems} onClick={handleBriefClick} />

      <ScrollView id="scorllViewId" enhanced={true} enable-passive style={{ height: containerHeight }} scrollY onScroll={hanldeScroll}>
        <View>
          {/* 头部锚点 */}
          {isRenderHeader && (
            <MMIndexBarAnchor index={header!.index} title="">
              {header?.headerRender}
            </MMIndexBarAnchor>
          )}

          {props.children}

          {isNewIphone && <View className="spacingIphone" />}
        </View>
      </ScrollView>
    </View>
  )
}

const MMIndexBar = memo(Component) as React.NamedExoticComponent<PropsWithChildren<IIndexBarProps>> & {
  Anchor: typeof MMIndexBarAnchor
}

MMIndexBar.Anchor = MMIndexBarAnchor

export default MMIndexBar
