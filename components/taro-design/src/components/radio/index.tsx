import { memo, FC, PropsWithChildren } from 'react'
import { View, Image } from '@tarojs/components'
import MMRadioGroup from './group'
import { EMMRadioType, IMMRadioProps } from './const'
import styles from './index.module.less'
import icon_checked from './checked.png'
import classNames from 'classnames'

const Component: FC<PropsWithChildren<IMMRadioProps>> = (props) => {
  const { checked = false, disabled = false, size, type = EMMRadioType.default } = props

  const checkSize = 18
  const renderUnCheck = <View className={styles.unChecked} style={{ width: checkSize, height: checkSize, borderRadius: '50%' }} />
  const renderCheck = <Image src={icon_checked} style={{ width: checkSize, height: checkSize }} />

  return (
    <View
      className={classNames(styles.radioStyle, props.className, styles[type], size && styles[size], checked && styles.checked, disabled && styles.disabled)}
      style={props.style}
      onClick={() => {
        !disabled && props.onChange?.(!checked)
      }}
    >
      {type !== EMMRadioType.button && (
        <View className={classNames(styles.checkboxStyle_box, disabled && styles.disabled)}>{checked ? renderCheck : renderUnCheck}</View>
      )}

      <View className={styles.checkboxStyle_content}>{props.children}</View>
    </View>
  )
}

const MMRadio = memo(Component) as unknown as typeof Component & {
  Group: typeof MMRadioGroup
}
MMRadio.displayName = 'MMRadio'
MMRadio.Group = MMRadioGroup

export default MMRadio
