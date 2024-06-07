import { View, Image } from '@tarojs/components'
import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { autobind } from '@wmeimob/decorator'
import styles from './index.module.less'
import IconFontName from '../icon-font/const'
import { MMStarsSize } from './const'
import MMIconFont from '../icon-font'

interface IStarsProps {
  /**
   * 当前星级数量
   */
  value?: number

  /**
   * 尺寸大小
   */
  size?: MMStarsSize

  /**
   * 星级总数量
   */
  count?: number

  /**
   * 字体图标名称
   */
  iconfontName?: IconFontName

  /**
   * 选中的颜色
   * @default primaryColor
   */
  color?: string

  /**
   * 为选中颜色
   *
   * @default gary4(#cccccc)
   */
  voidColor?: string

  /**
   * 是否显示为选中的
   *
   * @default true
   */
  showVoid?: boolean

  /**
   * 选中图片
   */
  src?: string

  /**
   * 未选中图片
   */
  voidSrc?: string

  /**
   * 改变事件
   */
  onChange?: (value: number) => void
}

/**
 * @name 星级
 */
@autobind
export default class MMStars extends PureComponent<IStarsProps> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    iconfontName: IconFontName.Rating,
    size: MMStarsSize.Default,
    count: 5,
    color: styles.starsColor,
    voidColor: styles.starsVoidColor,
    showVoid: true
  }

  get size() {
    switch (this.props.size) {
      case MMStarsSize.Big:
        return 18
      default:
        return 12
    }
  }

  get style() {
    let marginRight = styles.spacingBase

    switch (this.props.size) {
      case MMStarsSize.Big:
        marginRight = parseInt(styles.spacingBase, 10) * 2
    }

    return {
      marginRight
    }
  }

  get width() {
    const { count, value } = this.props
    if (value) {
      const nu = (value / (count as number)) * 100
      return {
        width: nu + '%'
      }
    }
    return {}
  }

  render() {
    const countArray = new Array(this.props.count).fill(1)
    const { onChange, iconfontName, color, voidColor, showVoid, src, voidSrc } = this.props
    return (
      <View className={styles.MMStarsStyles}>
        <View className={styles.box} style={showVoid ? {} : this.width}>
          {countArray.map((val, index) => (
            <View className={styles.item} style={this.style} key={val + index} onClick={() => onChange && onChange(index + 1)}>
              {!voidSrc ? (
                <MMIconFont size={this.size} color={voidColor} value={iconfontName as IconFontName} />
              ) : (
                <Image src={voidSrc} style={{ width: this.size, height: this.size }} />
              )}
            </View>
          ))}
        </View>

        <View className={styles.content} style={this.width}>
          {countArray.map((val, index) => (
            <View className={styles.item} style={this.style} key={val + index} onClick={() => onChange && onChange(index + 1)}>
              {!src ? (
                <MMIconFont size={this.size} color={color} value={iconfontName as IconFontName} />
              ) : (
                <Image src={src} style={{ width: this.size, height: this.size }} />
              )}
            </View>
          ))}
        </View>
      </View>
    )
  }
}
