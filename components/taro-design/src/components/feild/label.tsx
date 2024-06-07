import { memo, ReactNode, FC } from 'react'
import { View, Text } from '@tarojs/components'
import styles from './index.module.less'

interface IFeildLabelProps {
  label: ReactNode

  labelStyle?: any

  required?: boolean
}

/**
 *
 * Field 输入框
 * 用户可以在文本框内输入或编辑文字。
 * @param props
 * @returns
 */
const Component: FC<IFeildLabelProps> = props => {
  const { label = '', required = false } = props

  return (
    <View className={styles.feildStyle_label} style={props.labelStyle}>
      {label}
      {required && <Text className={styles.required}>*</Text>}
    </View>
  )
}

const FeildLabel = memo(Component)
export default FeildLabel
