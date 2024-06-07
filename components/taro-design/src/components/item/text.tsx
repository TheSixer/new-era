import { PureComponent } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.modules.less'
import { autobind } from '@wmeimob/decorator'

@autobind
export default class MMItemText extends PureComponent {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    textAlign: 'right'
  }

  state = {}

  render() {
    return <View className={styles.leftText}>{this.props.children}</View>
  }
}
