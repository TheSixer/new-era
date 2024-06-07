import { View } from '@tarojs/components'
import { CSSProperties, PureComponent } from 'react'
import { autobind } from '@wmeimob/decorator'
import classnames from 'classnames'
import MMIconFontName from './const'
import styles from './index.modules.less'

export interface IMMIconfontProps {
  /**
   * 图标值
   *
   * @type {string}
   * @memberof IIconfontProps
   */
  value?: number | string
  /**
   * 图标颜色
   *
   * @type {string}
   * @memberof IIconfontProps
   */
  color?: string
  /**
   * 图标大小
   *
   * @type {number}
   * @memberof IIconfontProps
   */
  size?: number
  /** 同 `class`，在 React/Nerv 里一般使用 `className` 作为 `class` 的代称 */
  className?: string
  /** 组件的内联样式, 可以动态设置的内联样式 */
  style?: CSSProperties

  /** 点击 */
  onClick?(): void
}

interface IIconfontState {
  checked: boolean
}

/**
 * @name 图标
 */
@autobind
export default class MMIconFont extends PureComponent<IMMIconfontProps, IIconfontState> {
  static defaultProps = {
    size: 20
  }

  static options = {
    addGlobalClass: true
  }

  render() {
    const { size, color, value, style } = this.props
    const rootStyle: any = {
      fontSize: size,
      color,
      ...style
    }

    return (
      <View className={classnames(styles.MMIconFont, value && styles[`icon${value}`], this.props.className)} style={rootStyle} onClick={this.props.onClick} />
    )
  }
}
