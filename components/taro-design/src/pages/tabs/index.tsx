import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import MMNavigation from '~/components/navigation'
import MMTabs from '~/components/tabs'
import { MMTabsType } from '~/components/tabs/const'

@autobind
export default class Index extends Component {
  state = {
    selectedIndex: 0
  }

  render() {
    return (
      <View>
        <MMNavigation title="标签页" />
        <View className="spacing" />
        <MMTabs
          data={['First', 'Second', 'Third']}
          selectedIndex={this.state.selectedIndex}
          onChange={(selectedIndex) =>
            this.setState({
              selectedIndex
            })
          }
        />
        <View className="spacingBig" />
        <MMTabs
          data={['导航一', '导航二', '导航三']}
          type={MMTabsType.Circle}
          selectedIndex={this.state.selectedIndex}
          onChange={(selectedIndex) =>
            this.setState({
              selectedIndex
            })
          }
        />
        <View className="spacingBig" />
        <MMTabs
          data={['导航一', '导航二', '导航三']}
          type={MMTabsType.Button}
          selectedIndex={this.state.selectedIndex}
          onChange={(selectedIndex) =>
            this.setState({
              selectedIndex
            })
          }
        />
        <View className="spacingBig" />
        <MMTabs
          data={['导航一', '导航二', '导航三', '导航三', '导航三', '导航三', '导航三', '导航三', '导航三']}
          type={MMTabsType.Scroll}
          selectedIndex={this.state.selectedIndex}
          onChange={(selectedIndex) =>
            this.setState({
              selectedIndex
            })
          }
        />
      </View>
    )
  }
}
