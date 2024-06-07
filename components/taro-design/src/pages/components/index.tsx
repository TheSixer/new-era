import { View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import H3 from '~/components/head/h3'
import MMItem from '~/components/item'
import MMNavigation from '~/components/navigation'
import MMPopup from '~/components/popup'
import H2 from '~/components/head/h2'
import MMTabBar from '~/components/tab-bar'
import { routeNames } from '~/routes'

@autobind
export default class Index extends Component {
  tabBar: MMTabBar

  render() {
    const { router } = getCurrentInstance()
    return (
      <View>
        <MMNavigation title="UI库" />
        <MMPopup />
        <View className="container">
          <View className="spacing" />
          <H2>组件</H2>
          <View className="spacing" />
          <View className="container">
            <H3>Layout</H3>
            <View className="spacingSmall" />
            <MMItem
              text="分割线 divider"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/divider/index'
                })
              }
            />
          </View>

          <View className="spacing" />
          <View className="container">
            <H3>Navigation</H3>
            <View className="spacingSmall" />
            <MMItem
              text="头部导航 navigation"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/navigation/index'
                })
              }
            />
            <MMItem
              text="标签栏 tab-bar"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/tab-bar/index'
                })
              }
            />
            <MMItem
              text="标签页 tabs"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/tabs/index'
                })
              }
            />
            <MMItem
              text="菜单 menu"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/menu/index'
                })
              }
            />
            <MMItem
              text="气泡 popover"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/popover/index'
                })
              }
            />
          </View>

          <View className="spacing" />
          <View className="container">
            <H3>Data Entry</H3>
            <View className="spacingSmall" />
            <MMItem
              text="按钮 button"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/button/index'
                })
              }
            />
            <MMItem
              text="选择器 picker"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/picker/index'
                })
              }
            />
            <MMItem
              text="复选框 checkbox"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/checkbox/index'
                })
              }
            />
            <MMItem
              text="滑动开关 switch"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/switch/index'
                })
              }
            />
            <MMItem
              text="步进器 stepper"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/stepper/index'
                })
              }
            />
            <MMItem
              text="搜索栏 input-search"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/input-search/index'
                })
              }
            />

            <MMItem text="搜索栏2 search-input" onClick={() => Taro.navigateTo({ url: routeNames.searchInput })} />

            <MMItem
              text="图片选择器 image-picker"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/image-picker/index'
                })
              }
            />
            <MMItem
              text="日期选择器 date-picker"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/date-picker/index'
                })
              }
            />
            <MMItem
              text="城市选择器 citys-picker"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/citys-picker/index'
                })
              }
            />
            <MMItem
              text="星级 stars"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/stars/index'
                })
              }
            />
            <MMItem
              text="下拉选项 drop-down"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/drop-down/index'
                })
              }
            />
            <MMItem
              text="多行输入 textarea"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/textarea/index'
                })
              }
            />
          </View>

          <View className="spacing" />
          <View className="container">
            <H3>Data Display</H3>
            <View className="spacingSmall" />
            <MMItem
              text="空状态 empty"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/empty/index'
                })
              }
            />
            <MMItem
              text="规格列表 sku-list"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/sku-list/index'
                })
              }
            />
            <MMItem
              text="走马灯 carousel"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/carousel/index'
                })
              }
            />
            <MMItem
              text="字体图标 icon-font"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/icon-font/index'
                })
              }
            />
            <MMItem
              text="图片图标 icon-image"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/icon-image/index'
                })
              }
            />
            <MMItem
              text="列表 item"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/item/index'
                })
              }
            />
            <MMItem
              text="索引栏 index-bar"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/index-bar/index'
                })
              }
            />
          </View>

          <View className="spacing" />
          <View className="container">
            <H3>Feedback</H3>
            <View className="spacingSmall" />
            <MMItem
              text="弹窗 modal"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/modal/index'
                })
              }
            />
            <MMItem text="toast" onClick={() => Taro.navigateTo({ url: '/pages/toast/index' })} />
            <MMItem
              text="动作面板 action-sheet"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/action-sheet/index'
                })
              }
            />
          </View>

          <View className="spacing" />
          <View className="container">
            <H3>Gesture</H3>
            <View className="spacingSmall" />
            <MMItem
              text="下拉刷新 pull-to-refresh"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/pull-to-refresh/index'
                })
              }
            />
          </View>

          <View className="spacing" />
          <View className="container">
            <H3>其他</H3>
            <View className="spacingSmall" />
            <MMItem
              text="徽章 badge"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/badge/index'
                })
              }
            />
            <MMItem
              text="加载中 loading"
              onClick={() =>
                Taro.navigateTo({
                  url: '/pages/loading/index'
                })
              }
            />
          </View>
        </View>
        <View style={{ height: '100px' }} />

        <MMTabBar path={router?.path} />
      </View>
    )
  }
}
