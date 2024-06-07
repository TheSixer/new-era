import { View, ScrollView } from '@tarojs/components'
import { ITabListProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import TabSubtTitle from '../tabSubtTitle'
import { memo, FC } from 'react'

const Component: FC<ITabListProps> = (props) => {
  const { data = [], activitys = [], activeIndex, onChange } = props

  return (
    <ScrollView enhanced showScrollbar={false} scrollX scrollY={false} className={styles.tabListStyle}>
      <View className={styles.tabContent}>
        {activitys.map((activity, index) => {
          const { startTime = '', endTime = '', activityNo } = activity
          const { showActivityTitle = '' } = data.find((it) => it.activityNo === activityNo)! || {}
          return (
            <View
              key={showActivityTitle + index}
              className={classNames(styles.tabItem, index === activeIndex && styles.tabItem_active)}
              onClick={() => {
                if (index !== activeIndex && onChange) {
                  onChange(index)
                }
              }}
            >
              <View>{showActivityTitle}</View>
              <View className={styles.subTitle}>
                <View className={styles.tabItem_text}>
                  <TabSubtTitle startTime={startTime} endTime={endTime} />
                </View>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const TabList = memo(Component)
export default TabList
