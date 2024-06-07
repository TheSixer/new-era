import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { memo, PropsWithChildren } from 'react'
import { IDeliveryTab, IDeliveryTabProps } from './const'
import styles from './index.module.less'

/**
 * 配送设置tab
 *
 * 这类tab特殊的地方在于两个tab平分。并且中间过渡有特殊样式
 * @param {*} props
 * @return {*}
 */
function Component<T extends string | number | boolean>(props: PropsWithChildren<IDeliveryTabProps<T>>) {
  const { activeKey, tabs, onDisabledTabClick, onTabChange } = props

  const handleTabItemClick = (item: IDeliveryTab<T>, index: number) => {
    if (item.disabled) {
      onDisabledTabClick?.(item, index)
      return
    }

    if (activeKey !== item.value) {
      onTabChange?.(item, index)
    }
  }

  return (
    <View className={styles.deliveryTabStyle}>
      <View className={styles.tabHead}>
        <View className={styles.tabHead_bg} />

        <View className={styles.tabHead_content}>
          {tabs.map((tab, index) => (
            <View
              key={tab.value as any}
              className={classNames({
                [styles.tabItem]: true,
                [styles.tabItem__active]: tab.value === activeKey,
                [styles.tabItem__disabled]: tab.disabled
              })}
              onClick={() => handleTabItemClick(tab, index)}
            >
              <Text className={styles.tabItem_text}>{tab.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className={styles.tabContent}>{props.children}</View>
    </View>
  )
}

Component.displayName = 'DeliveryTab'

const DeliveryTab = memo(Component)
export default DeliveryTab as typeof Component
