import { memo, useState, FC } from 'react'
import { View, Image } from '@tarojs/components'
import { IOrderTabProps } from './const'
import styles from './index.module.less'
import { EOrderStatus, OOrderStatus } from '../../../../../enums/EOrderStatus'
import classNames from 'classnames'
import icon_line from './icon_line.png'

const { CANCEL, COMPLETED } = EOrderStatus
const Component: FC<IOrderTabProps> = (props) => {
  const { queryType, onTabChange } = props

  /**
   * tabs列表
   * 根据枚举值获取。排除掉不需要的
   */
  const [tabs] = useState(() => {
    const tbs = OOrderStatus.filter((it) => ![CANCEL, COMPLETED].includes(it.value as any)).map((it) => ({ ...it, value: `${it.value}` }))
    tbs.unshift({ label: '全部', value: '0' })
    return tbs
  })

  return (
    <View className={styles.orderTabStyle}>
      {tabs.map(({ label, value }) => (
        <View key={value} onClick={() => onTabChange(value as any)} className={classNames(styles.tabItem, queryType === value && styles.active)}>
          {label}

          {queryType === value ? <Image src={icon_line} className={styles.line} /> : <View className={styles.line} />}
        </View>
      ))}
    </View>
  )
}

const OrderTab = memo(Component)
export default OrderTab
