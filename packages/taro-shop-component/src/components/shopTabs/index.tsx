import { memo, FC } from 'react'
import { View, Image } from '@tarojs/components'
import { IShopTabsProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import icon_line from './icon_line.png'

const Component: FC<IShopTabsProps> = (props) => {
  const { data = [], onChange } = props

  return (
    <View className={styles.shopTabsStyle}>
      {data.map(({ label, value }) => (
        <View key={value} onClick={() => onChange?.(value as any)} className={classNames(styles.tabItem, props.value === value && styles.active)}>
          {label}

          {props.value === value ? <Image src={icon_line} className={styles.line} /> : <View className={styles.line} />}
        </View>
      ))}
    </View>
  )
}

const ShopTabs = memo(Component)
export default ShopTabs
