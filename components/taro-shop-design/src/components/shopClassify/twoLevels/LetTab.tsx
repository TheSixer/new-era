import { ScrollView, View, Text } from '@tarojs/components'
import classNames from 'classnames'
import { forwardRef, memo, useImperativeHandle, useState } from 'react'
import styles from './index.module.less'

export interface LeftTabRef {
  tabIndex: number
  setTabIndex: (index: number) => void
}

const Component = forwardRef<LeftTabRef, any>((props, ref) => {
  const { defaultTabIndex = 0, data, onClick } = props

  const [tabIndex, setTabIndex] = useState(defaultTabIndex)

  useImperativeHandle(
    ref,
    () => ({
      tabIndex,
      setTabIndex
    }),
    [tabIndex]
  )

  const handleClick = (item: any, index: number) => {
    if (tabIndex === index) {
      return
    }
    setTabIndex(index)
    onClick(item, index)
  }

  return (
    <ScrollView scrollY enhanced showScrollbar={false} className={styles.tabHead}>
      {data.map((item, index) => {
        return (
          <View
            className={classNames(styles.tabHead_item, index === tabIndex && styles.active)}
            key={item.value}
            onClick={() => handleClick(item, index)}
          >
            <View className={styles.active_line} />
            <Text className={styles.text}>{item.title}</Text>
          </View>
        )
      })}
    </ScrollView>
  )
})
export default memo(Component)
