import { FC, memo, PropsWithChildren } from 'react'
import styles from './index.module.less'
import { ECheckboxShape, ICheckboxProps } from './const'
import { View, Image } from '@tarojs/components'
import classNames from 'classnames'
import icon_checked from './checked.png'
import icon_checked_coupon from './checked_coupon.png'

export enum ECheckType{
  /** 默认 */
  Default = 1,
  /** 优惠券 */
  Coupon,

}

const Component: FC<PropsWithChildren<ICheckboxProps>> = props => {
  const {
    value = false,
    size = 18,
    shape = 'Circle',
    disabled = false,
    renderUnCheck = <View className={styles.unChecked} style={{ width: size, height: size, borderRadius: shape === ECheckboxShape.Circle ? '50%' : 4 }} />,
    renderCheck = <Image src={icon_checked} style={{ width: size, height: size }} />
  } = props

  return (
    <View
      className={classNames(styles.checkboxStyle, props.className)}
      style={props.style}
      onClick={() => {
        !disabled && props.onChange?.(!value)
      }}
    >
      <View className={classNames(styles.checkboxStyle_box, disabled && styles.disabled)}>{value ? renderCheck : renderUnCheck}</View>

      <View className={styles.checkboxStyle_content}>{props.children}</View>
    </View>
  )
}

Component.displayName = 'MMCheckbox'

const MMCheckbox = memo(Component)
export default MMCheckbox
