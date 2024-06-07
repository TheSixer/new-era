import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMButton from '~/components/button'
import MMModalAlert from '~/components/modal/alert'
import { MMModalAnimationType, MMModalJustifyContent } from '~/components/modal/const'
import MMModal from '~/components/modal/index'
import MMPopup from '~/components/popup'
import Navigation from '~/components/navigation/index'

@autobind
export default class Index extends Component {
  state = {
    number: 0,
    visible: false,
    visibleTransparent: false,
    visibleProps: false,
    visibleAlert: false
  }

  private popup: MMPopup

  renderButton() {
    return <View>jsx</View>
  }

  render() {
    const { visible, visibleTransparent, visibleAlert, visibleProps } = this.state
    return (
      <View>
        <Navigation title="弹窗" />
        <MMPopup ref={(ref) => (this.popup = ref as MMPopup)} />
        <View className="container">
          <View className="spacing" />
          <MMButton onClick={() => this.setState({ visible: true })} text="基础弹窗" />
          <MMModal visible={visible} onClose={() => this.setState({ visible: false })}>
            基础弹窗
          </MMModal>

          <View className="spacing" />
          <MMButton onClick={() => this.setState({ visibleTransparent: true })} text="透明弹窗" />
          <MMModal visible={visibleTransparent} mask={false}>
            <MMButton onClick={() => this.setState({ visibleTransparent: false })} text="关闭弹窗" />
          </MMModal>

          <View className="spacing" />
          <MMButton onClick={() => this.setState({ visibleProps: true })} text="弹窗属性" />
          <MMModal visible={visibleProps} maskClosable animationType={MMModalAnimationType.down} justifyContent={MMModalJustifyContent.flexEnd}>
            <MMButton onClick={() => this.setState({ visibleProps: false })} text="关闭弹窗" />
          </MMModal>

          <View className="spacing" />
          <MMButton onClick={() => this.setState({ visibleAlert: true })} text="MMModalAlert" />
          <MMModalAlert
            visible={visibleAlert}
            title="title"
            buttons={[
              {
                text: '取消',
                onClick: () => this.setState({ visibleAlert: false })
              },
              {
                text: '确定',
                onClick: () => this.setState({ visibleAlert: false })
              }
            ]}
          >
            MMModalAlerts
          </MMModalAlert>

          <View className="spacing" />
          <MMButton onClick={this.alert} text="alert" />

          <View className="spacing" />
          <MMButton onClick={this.confirm} text="confirm">
            {' '}
          </MMButton>

          <View className="spacing" />
          <MMButton onClick={this.toast} text="toast" />

          <View className="spacing" />
          <MMButton onClick={this.success} text="success" />

          <View className="spacing" />
          <MMButton onClick={this.fail} text="fail" />

          <View className="spacing" />
          <MMButton onClick={this.warning} text="warning" />

          <View className="spacing" />
          <MMButton onClick={this.loading} text="loading" />
        </View>
      </View>
    )
  }

  private success() {
    this.popup.success('成功提示')
  }

  private warning() {
    this.popup.warning('警告提示')
  }

  private fail() {
    this.popup.fail('失败提示')
  }

  private toast() {
    this.popup.toast('弹窗')
  }

  private loading() {
    this.popup.loading('弹窗')
  }

  private alert() {
    this.popup.alert({
      title: '标题',
      message: 'alert弹窗'
    })
  }

  private confirm() {
    this.popup.confirm({
      message: '为什么这样呢',
      // eslint-disable-next-line no-console
      onOk: () => console.log('onOk'),
      // eslint-disable-next-line no-console
      onCancel: () => console.log('onCancel')
    })
  }
}
