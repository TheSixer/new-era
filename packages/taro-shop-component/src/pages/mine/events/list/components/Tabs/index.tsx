import { memo, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { IETabsProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'

const Component: FC<IETabsProps> = (props) => {
    const { activeTab, tabs, onChange } = props

  return (
    <View className={styles.tabs_container}>
      {tabs.map((tab, index) => (
        <View className={classNames(styles.tab, { [styles.active]: Number(tab.value) === Number(activeTab) })} onClick={() => onChange?.(tab?.value)} key={index}>
          <Text>{tab.label}</Text>
        </View>
      ))}
    </View>
  )
}

const EventInfo = memo(Component)
export default EventInfo
