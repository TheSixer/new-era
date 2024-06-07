import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { getMenuButtonBoundingClientRect, getSystemInfoSync } from '@tarojs/taro'
import styles from './index.module.less'
import { MMDrawerProps, MMDrawerState } from './const'
import MMModal from '../modal'
import MMButton from '../button'
import classname from 'classnames'
import { PropsWithChildren, PureComponent } from 'react'

function getHeadHeight() {
  const { statusBarHeight = 0 } = getSystemInfoSync()
  const { top, height } = getMenuButtonBoundingClientRect()
  return (top - statusBarHeight) * 2 + height + statusBarHeight
}

export default class MMDrawer extends PureComponent<PropsWithChildren<MMDrawerProps>, MMDrawerState> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps: Partial<MMDrawerProps> = {
    title: '',
    width: 306,
    visible: false,
    cancelText: '取消',
    okText: '确定',
    onOk() {}
  }

  state: MMDrawerState = {}

  headHeight = getHeadHeight()

  render() {
    const { width, title, visible, cancelText, okText, onCancel, onOk, onClose } = this.props

    return (
      <MMModal visible={visible} onClose={onClose}>
        <View className={classname(styles.component, visible && styles.visible)} style={{ width: `${width}px` }}>
          <View className={styles.head} style={{ height: `${this.headHeight}px` }}>
            <Text>{title}</Text>
          </View>

          <View className={styles.content}>
            <ScrollView scrollY show-scrollbar={false} style={{ height: '100%' }}>
              {this.props.children}
            </ScrollView>
          </View>

          <View className={styles.foot}>
            <View className={styles.footBtn}>
              <MMButton type="default" onClick={onCancel}>
                {cancelText}
              </MMButton>
            </View>
            <View className={styles.footBtn}>
              <MMButton onClick={onOk}>{okText}</MMButton>
            </View>
          </View>
        </View>
      </MMModal>
    )
  }
}
