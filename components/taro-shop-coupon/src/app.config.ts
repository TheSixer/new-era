/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { AppConfig } from '@tarojs/taro'

export default {
  pages: ['pages/index/index', 'pages/index2/index'],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'WeChat',
    navigationStyle: 'custom'
  }
} as AppConfig
