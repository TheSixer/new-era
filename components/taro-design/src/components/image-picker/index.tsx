import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import classname from 'classnames'
import MMIconFont from '../icon-font'
import styles from './index.modules.less'
import themesStyles from '../styles/themes/default.modules.less'
import MMIconFontName from '../icon-font/const'
import { getGlobalData } from '@wmeimob/taro-global-data'

interface IMMImagePickerProps {
  /**
   * 最多可选择张数
   *
   * @type {number}
   * @memberof IMMImagePickerProps
   */
  count?: number
  /**
   * 图片值
   *
   * @type {string[]}
   * @memberof IMMImagePickerProps
   */
  value: string[]
  /**
   * 改变事件
   *
   * @memberof IMMImagePickerProps
   */
  onChange: (value: string[]) => void
}

/**
 * @name 图片选择器
 */
@autobind
export default class MMImagePicker extends Component<IMMImagePickerProps> {
  static defaultProps = {
    count: 9,
    value: []
  }

  static options = {
    addGlobalClass: true
  }

  render() {
    const { value, count } = this.props

    const isWeapp = getGlobalData('isWeapp')
    return (
      <View className={styles.MMImagePicker}>
        <View className={styles.content}>
          {value.map((val, index) => (
            <View className={styles.item} key={val + index}>
              <View className={styles.itemContent}>
                {isWeapp ? <Image className={styles.image} src={val} mode="aspectFit" /> : <img className={styles.image} src={val} />}
              </View>
              {this.renderIconfont(index)}
            </View>
          ))}
          {(count === undefined || value.length < count) && (
            <View onClick={this.onClick} className={classname(styles.item, styles.add)}>
              <View className={styles.itemContent} />
              <View className={styles.addContent}>
                <View>
                  <MMIconFont size={32} color={themesStyles.gray3} value={MMIconFontName.PhotoUpload} />
                </View>
                <View className={styles.addText}>添加图片</View>
                {count !== undefined && <View className={styles.addText}>(最多{count}张)</View>}
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }

  private renderIconfont(index) {
    return (
      <View className={styles.delete} onClick={() => this.onDelete(index)}>
        <MMIconFont size={10} color={themesStyles.gray1} value={MMIconFontName.Close} />
      </View>
    )
  }

  private async onClick() {
    const { count, value = [] } = this.props
    const { tempFilePaths } = await Taro.chooseImage({ count: count! - value.length })
    const paths = [...value, ...tempFilePaths]
    paths.splice(count!, paths.length)
    this.props.onChange(paths)
  }

  private onDelete(index: number) {
    this.props.onChange(this.props.value.filter((_value, _index) => _index !== index))
  }
}
