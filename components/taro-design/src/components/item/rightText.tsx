import { PureComponent } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.modules.less'
import { autobind } from '@wmeimob/decorator'

interface IProps {
  value: string
}

@autobind
export default class MMItemRightText extends PureComponent<IProps> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    textAlign: 'right'
  }

  state = {}

  render() {
    return <View className={styles.rightText}>{this.props.value}</View>
  }
}
