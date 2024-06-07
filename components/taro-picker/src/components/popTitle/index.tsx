import Taro from '@tarojs/taro'
import { memo, FC } from 'react'
import { View } from '@tarojs/components'
import { IPopTitleProps } from './const'
import styles from './index.module.less'

const Component: FC<IPopTitleProps> = (props) => {
  const { title = '请选择', okText = '确定', cancelText = '取消', onCancel, onOk } = props

  return (
    <View className={styles.popTitleStyle}>
      <View className={styles.cancel} onClick={onCancel}>
        {cancelText}
      </View>
      <View className={styles.title}>{title}</View>
      <View className={styles.ok} onClick={onOk}>
        {okText}
      </View>
    </View>
  )
}

const PopTitle = memo(Component)
export default PopTitle
