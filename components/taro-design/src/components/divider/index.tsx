import { View } from '@tarojs/components'
import { FC, memo, useMemo, CSSProperties } from 'react'
import styles from './index.modules.less'
import classNames from 'classnames'
import { IMMDividerProps } from './const'
import shopVariable from '../styles/themes/shop.variable'

const Component: FC<IMMDividerProps> = (props) => {
  const className = useMemo(() => {
    const isWeapp = process.env.TARO_ENV === 'weapp'

    return classNames({
      [styles.divider__horizontal]: !props.vertical,
      [styles.divider__vertical]: props.vertical && isWeapp,
      [styles.divider__vertical_auto]: props.vertical && !isWeapp
    })
  }, [props.vertical])

  const style = useMemo(() => {
    const { size, vertical, color } = props
    const _style: CSSProperties = { backgroundColor: color }

    if (size !== undefined) {
      if (vertical) {
        _style.height = size + 'px'
      } else {
        _style.width = size + 'px'
      }
    }

    return { ..._style, ...props.style }
  }, [props.style, props.vertical, props.color])

  return <View style={style} className={className} />
}

Component.defaultProps = {
  color: shopVariable.dividerColor
}

const MMDivider = memo(Component)

export default MMDivider
