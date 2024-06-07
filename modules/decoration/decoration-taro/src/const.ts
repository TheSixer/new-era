import Taro from '@tarojs/taro'

/**
 * 获取最大的屏幕宽度
 * 默认直接获取.最大768px
 */
export function getMaxScreenWitdh() {
  const { screenWidth } = Taro.getSystemInfoSync()
  return screenWidth >= 768 ? 768 : screenWidth
}
