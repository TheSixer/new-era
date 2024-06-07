import Taro from '@tarojs/taro'
import { getIsNewIphone } from './getIsNewIphone'

/**
 * 获取状态栏高度
 */
export function getStatusBarHeight() {
  return getIsNewIphone() ? 44 : Taro.getSystemInfoSync().statusBarHeight
}
