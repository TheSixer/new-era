import { View } from '@tarojs/components'
import { getModuleSeparatorDefaultProps, IBasicModuleSeparatorProps } from './const'
import styles from './index.module.less'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import { memo, FC } from 'react'
/**
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<IBasicModuleSeparatorProps> = (props) => {
  const { height = 0, lineHeight = 0, borderStyle = 'solid', componentStyle } = props

  const { style } = useComponentStyle(componentStyle)

  return (
    <View style={style} className={styles.basicModuleSeparatorStyle}>
      <View style={{ height: `${height}px` }} className={styles.content}>
        {!!lineHeight && <View className={styles.line} style={{ borderTopWidth: `${lineHeight}px`, borderStyle }} />}
      </View>
    </View>
  )
}

Component.defaultProps = getModuleSeparatorDefaultProps()

const BasicModuleSeparator = memo(Component)
export default BasicModuleSeparator
