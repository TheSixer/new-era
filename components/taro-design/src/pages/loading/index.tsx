import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMLoading from '~/components/loading'
import Navigation from '~/components/navigation/index'
import MMButton from '~/components/button'
import PageDemoBlock from '~/components/pageComponents/pageDemoBlock'

@autobind
export default class Index extends Component {
  render() {
    return (
      <View>
        <Navigation title="加载中" />
        <View className="container">
          <PageDemoBlock title="不同类型的loading">
            <MMLoading type="spinner" />
            <MMLoading type="fadeDot" />
            <MMLoading type="jelly" />
            <MMLoading type="rotate" />
            <MMLoading type="ball" />
          </PageDemoBlock>

          <PageDemoBlock title="设置尺寸">
            <MMLoading type="spinner" size={36} />
            <MMLoading type="fadeDot" size={36} />
            <MMLoading type="jelly" size={36} />
            <MMLoading type="rotate" size={36} />
            <MMLoading type="ball" size={36} />
          </PageDemoBlock>

          <PageDemoBlock title="与组件配合">
            <MMButton loading>spinner</MMButton>
          </PageDemoBlock>
        </View>
      </View>
    )
  }
}
