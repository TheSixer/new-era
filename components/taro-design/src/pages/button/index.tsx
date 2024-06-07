/* eslint-disable no-console */
import Taro from '@tarojs/taro'
import { Component } from 'react'
import MMButton from '~/components/button'
import { autobind } from '@wmeimob/decorator'
import MMPageContainer from '~/components/pageComponents/pageContainer'
import PageDemoBlock from '~/components/pageComponents/pageDemoBlock'
import MMSpace from '~/components/space'

@autobind
export default class Index extends Component {
  state = {
    number: 0
  }

  onClick() {
    this.setState({
      number: this.state.number + 1
    })
  }

  render() {
    return (
      <MMPageContainer title="按钮">
        <PageDemoBlock title="按钮类型">
          <MMSpace>
            <MMButton>主要按钮</MMButton>
            <MMButton type="default">默认按钮</MMButton>
            <MMButton type="warning">警告按钮</MMButton>
          </MMSpace>
        </PageDemoBlock>

        <PageDemoBlock title="描边样式">
          <MMSpace>
            <MMButton ghost>主要按钮</MMButton>
            <MMButton type="default" ghost>
              默认按钮
            </MMButton>
            <MMButton type="warning" ghost>
              警告按钮
            </MMButton>
          </MMSpace>
        </PageDemoBlock>

        <PageDemoBlock title="禁用">
          <MMSpace>
            <MMButton disabled>主要按钮</MMButton>
            <MMButton type="default" disabled>
              默认按钮
            </MMButton>
            <MMButton type="warning" disabled>
              警告按钮
            </MMButton>
          </MMSpace>
        </PageDemoBlock>

        <PageDemoBlock title="加载">
          <MMSpace>
            <MMButton loading>主要</MMButton>
            <MMButton type="warning" loading>
              警告按钮
            </MMButton>
          </MMSpace>
        </PageDemoBlock>

        <PageDemoBlock title="圆角">
          <MMSpace>
            <MMButton radius={false}>主要</MMButton>
            <MMButton radius={21}>警告按钮</MMButton>
          </MMSpace>
        </PageDemoBlock>

        <PageDemoBlock title="颜色">
          <MMSpace>
            <MMButton color="#07c160" text="#07c160" />
            <MMButton color="linear-gradient(to right, rgb(255, 96, 52), rgb(238, 10, 36))">渐变颜色</MMButton>
          </MMSpace>
        </PageDemoBlock>

        <PageDemoBlock title="尺寸">
          <MMSpace>
            <MMButton size="tiny">tiny</MMButton>
            <MMButton size="small">small</MMButton>
            <MMButton>default</MMButton>
            <MMButton size="large">large</MMButton>
          </MMSpace>
        </PageDemoBlock>

        <PageDemoBlock title="块级">
          <MMButton block>block</MMButton>
        </PageDemoBlock>
      </MMPageContainer>
    )
  }
}
