import { View } from '@tarojs/components'
import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { autobind } from '@wmeimob/decorator'
import classname from 'classnames'
import styles from './index.modules.less'
import { IMMSwitchProps } from './const'

/**
 * @name 滑动开关
 */
@autobind
export default class MMSwitch extends PureComponent<IMMSwitchProps> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {}

  get className() {
    const classNames = [styles.MMSwitch]

    if (this.props.disabled) {
      classNames.push(styles.MMSwitch__disabled)
    }

    if (this.props.checked) {
      classNames.push(styles.MMSwitch__checked)
    }

    return classname(...classNames)
  }

  render() {
    return <View className={this.className} onClick={() => !this.props.disabled && this.props.onChange?.(!this.props.checked)} />
  }
}
