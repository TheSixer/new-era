import { FC, memo } from 'react'
import styles from './index.module.less'
import { IRadioProps } from './const'
import { View, Image } from '@tarojs/components'
import CheckedIcon from './images/dl_icon_xz.svg';
import CheckIcon from './images/dl_icon_wxz.svg';

const Component: FC<IRadioProps> = (props) => {
  // 通过解构定义defaultProps
  const { options = [], value, onChange } = props

  return (
    <View className={styles.my_radio}>
      {options.map((item, index) => (
        <View className={styles.my_radio_item} key={index} onClick={() => onChange(item.value)}>
          <Image className={styles.my_radio_icon} src={value === item.value? CheckedIcon : CheckIcon} />
          <View className={styles.my_radio_text}>{item.label}</View>
        </View>
      ))}
    </View>
  )
}

Component.displayName = 'VipCard'

const VipCard = memo(Component)
export default VipCard
