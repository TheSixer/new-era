import { View } from '@tarojs/components'
import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { autobind } from '@wmeimob/decorator'
import styles from './index.modules.less'

@autobind
export default class H6 extends PureComponent {
  static options = {
    addGlobalClass: true
  }

  render() {
    return <View className={styles.MMHead_h6}>{this.props.children}</View>
  }
}
