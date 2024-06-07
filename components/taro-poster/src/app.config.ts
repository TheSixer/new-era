/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { AppConfig } from '@tarojs/taro'

export default {
  pages: [
    'pages/bgposter/index',
    'pages/index/index',
    'pages/poster/index' // 首页
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'WeChat',
    navigationStyle: 'custom'
  }
} as AppConfig
