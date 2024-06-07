import { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { autobind } from '@wmeimob/decorator'
import styles from './index.modules.less'

@autobind
export default class H2 extends PureComponent {
  static options = {
    addGlobalClass: true
  }

  render() {
    return <View className={styles.MMHead_h2}>{this.props.children}</View>
  }
}
