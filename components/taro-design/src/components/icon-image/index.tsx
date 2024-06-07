import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { autobind } from '@wmeimob/decorator'
import IconFontName from './const'
import styles from './index.modules.less'

interface IIconfontProps {
  /**
   * 图标值
   *
   * @type {string}
   * @memberof IIconfontProps
   */
  value: IconFontName

  /**
   * 图标大小
   *
   * @type {number}
   * @memberof IIconfontProps
   */
  width?: number

  /**
   * 高度
   */
  height?: number
}

/**
 * @name 图片图标
 */
@autobind
export default class MMIconImage extends Component<IIconfontProps> {
  static defaultProps = {
    size: 20
  }

  static options = {
    addGlobalClass: true
  }

  render() {
    const { width, height, value } = this.props
    const style: any = {}
    if (width) {
      style.width = width + 'px'
    }
    if (height) {
      style.height = height + 'px'
    }

    return <View className={classNames(styles.iconfont, styles[value])} style={style} />
  }
}
