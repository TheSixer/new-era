import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import MMCheckbox from '~/components/checkbox/index'
import { autobind } from '@wmeimob/decorator'
import MMButton from '~/components/button'
import H2 from '~/components/head/h2'
import MMNavigation from '~/components/navigation'
import iconChecked from './images/checked.png'
import un_checked from './images/un_checked.png'
import PageDemoBlock from '~/components/pageComponents/pageDemoBlock'

@autobind
export default class Index extends Component {
  state = {
    checked: false
  }

  render() {
    const { checked } = this.state
    return (
      <View>
        <MMNavigation title="复选框" />

        <PageDemoBlock title="基础使用">
          <MMCheckbox value={checked} onChange={(va) => this.setState({ checked: va })}>
            选择
          </MMCheckbox>

          <MMCheckbox value={checked} shape="Square" onChange={(va) => this.setState({ checked: va })}>
            选择
          </MMCheckbox>
        </PageDemoBlock>

        <PageDemoBlock title="禁用">
          <MMCheckbox value={checked} disabled>
            选择
          </MMCheckbox>
        </PageDemoBlock>

        <PageDemoBlock title="自定义渲染">
          <MMCheckbox
            value={checked}
            onChange={(va) => this.setState({ checked: va })}
            renderUnCheck={<Image src={un_checked} style={{ width: 18, height: 18 }} />}
            renderCheck={<Image src={iconChecked} style={{ width: 18, height: 18 }} />}
          >
            选择
          </MMCheckbox>
        </PageDemoBlock>
      </View>
    )
  }
}
