import { PureComponent } from 'react'
import { Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { autobind } from '@wmeimob/decorator'
import styles from './input.modules.less'

interface IProps {
  value: string
}

@autobind
export default class MMItemPlaceholderText extends PureComponent<IProps> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {}

  state = {}

  render() {
    return <Text className={styles.placeholder}>{this.props.value}</Text>
  }
}
