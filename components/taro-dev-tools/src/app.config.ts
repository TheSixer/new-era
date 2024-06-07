/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { AppConfig } from '@tarojs/taro'

export default {
  pages: [
    'pages/devTools/index'
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'WeChat',
    navigationStyle: 'custom'
  }
} as AppConfig
