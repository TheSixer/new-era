/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { AppConfig } from '@tarojs/taro'

export default {
  pages: [
    'pages/datePicker/index'
    // 'pages/home/index' // 首页
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'WeChat',
    navigationStyle: 'custom'
  }
} as AppConfig
