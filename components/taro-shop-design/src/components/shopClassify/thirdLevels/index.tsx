import Taro from '@tarojs/taro'
import { FC, memo, useMemo, useState } from 'react'
import { ScrollView, View, Text, Image } from '@tarojs/components'
import { IThirdLevelsProps, TCateItem } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import { getResizeUrl } from '@wmeimob/aliyun'

const imgStyle = { width: 68, height: 68 }

const Component: FC<IThirdLevelsProps> = props => {
  const { defaultTabIndex = 0, data = [] } = props

  const [tabIndex, setTabIndex] = useState(defaultTabIndex)

  const tabData = useMemo(() => (data[tabIndex] || {}).children || [], [data, tabIndex])

  const handleTabClick = (item: TCateItem, index: number) => {
    setTabIndex(index)
    props.onTabClick?.(item, index)
  }

  return (
    <View className={styles.thirdLevelsStyle}>
      {/* 左侧tab */}
      <ScrollView scrollY enhanced showScrollbar={false} className={styles.tabHead}>
        {data.map((item, index) => {
          return (
            <View
              className={classNames(styles.tabHead_item, index === tabIndex && styles.active)}
              key={item.value + index}
              onClick={() => handleTabClick(item, index)}
            >
              <View className={styles.active_line} />
              <Text className={styles.text}>{item.title}</Text>
            </View>
          )
        })}
      </ScrollView>

      {/* 右侧内容 */}
      <ScrollView scrollY className={styles.tabContent}>
        <View className={styles.tabContent_inner}>
          {tabData.map((tab, index) => {
            const { children = [] } = tab
            return (
              <View key={tab.value + index}>
                {/* 二级标题 */}
                <View className={styles.tabContent_head}>{tab.title}</View>
                {/* 三级分类 */}
                <View className={styles.tabContent_thirdList}>
                  {children.map(ch => {
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

const ThirdLevels = memo(Component)
export default ThirdLevels
