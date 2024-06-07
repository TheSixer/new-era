/* eslint-disable no-console */
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import Navigation from '~/components/navigation/index'
import { View } from '@tarojs/components'
import { autobind } from '@wmeimob/decorator'
import MMPullToRefresh from '~/components/pull-to-refresh'
import { MMPullToRefreshState } from '~/components/pull-to-refresh/const'

@autobind
export default class Index extends Component {
  state = {
    pageIndex: 1,
    state: MMPullToRefreshState.none,
    noMore: false,
    data: []
  }

  pullToRefresh: MMPullToRefresh | null

  renderButton() {
    return <View>jsx</View>
  }

  render() {
    const { pageIndex } = this.state
    return (
      <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Navigation title="下拉刷新上拉加载" />
        <MMPullToRefresh
          state={this.state.state}
          noMore={this.state.noMore}
          onScrollToLower={() => this.getData(pageIndex + 1)}
          onRefresh={() => this.getData()}
          renderFooter={<View>底部</View>}
          ref={(ref) => (this.pullToRefresh = ref)}
        >
          <View className="container">
            <View>顶部</View>
            <View>1</View>
            <View>2</View>
            <View>3</View>
            <View>4</View>
            <View>5</View>
            <View>6</View>
            <View>7</View>
            <View>8</View>
            <View>9</View>
            <View>10</View>
            <View>1</View>
            <View>2</View>
            <View>3</View>
            <View>4</View>
            <View>5</View>
            <View>6</View>
            <View>7</View>
            <View>8</View>
            <View>9</View>
            <View>10</View>
            <View>1</View>
            <View>2</View>
            <View>3</View>
            <View>4</View>
            <View>5</View>
            <View>6</View>
            <View>7</View>
            <View>8</View>
            <View>9</View>
            <View>10</View>
            <View>1</View>
            <View>2</View>
            <View>3</View>
            <View>4</View>
            <View>5</View>
            <View>6</View>
            <View>7</View>
            <View>8</View>
            <View>9</View>
            <View>10</View>
            <View>1</View>
            <View>2</View>
            <View>3</View>
            <View>4</View>
            <View>5</View>
            <View>6</View>
            <View>7</View>
            <View>8</View>
            <View>9</View>
            <View>10</View>
            <View>1</View>
            <View>2</View>
            <View>3</View>
            <View>4</View>
            <View>5</View>
            <View>6</View>
            <View>7</View>
            <View>8</View>
            <View>9</View>
            <View>10</View>
            <View>底部</View>
          </View>
        </MMPullToRefresh>
      </View>
    )
  }

  componentDidMount() {
    this.getData()
  }

  private async getData(pageIndex = 1) {
    if (pageIndex === 1) {
      this.setState({ state: MMPullToRefreshState.refreshing })
    } else {
      this.setState({ state: MMPullToRefreshState.pushing })
    }

    setTimeout(() => {
      console.log('刷新结束')
      const { data } = { data: { list: [], hasNextPage: true } }
      const newData = pageIndex === 1 ? data.list : [...this.state.data, ...data.list]
      this.setState({
        data: newData,
        noMore: !data.hasNextPage,
        pageIndex,
        state: MMPullToRefreshState.none
      })
    }, 2000)
  }
}
