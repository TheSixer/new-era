import { View } from '@tarojs/components'
import { PureComponent } from 'react'
import { autobind } from '@wmeimob/decorator'
import styles from './index.modules.less'

export interface IMMModalPopupTitle {
  cancelText?: string
  okText?: string
  onCancel?: () => void
  onOk?: () => void
  title?: string
}

@autobind
export default class MMModalPopupTitle extends PureComponent<IMMModalPopupTitle> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    okText: '确定',
    cancelText: '取消'
  }

  state = {}

  render() {
    const { onCancel, title, onOk, cancelText, okText } = this.props
    return (
      <View>
        <View className={styles.title}>
          {cancelText && (
            <View className={styles.title_button} style={{ color: '#999999' }} onClick={onCancel}>
              {cancelText}
            </View>
          )}
          <View className={styles.title_content}>{title}</View>
          {okText && (
            <View className={styles.title_button} onClick={onOk}>
              {okText}
            </View>
          )}
        </View>
      </View>
    )
  }
}
