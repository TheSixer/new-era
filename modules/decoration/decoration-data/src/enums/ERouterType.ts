/**
 * 基础路由类型
 */
export enum ERouterType {
  /** 默认占位符 */
  switchTab = 'switchTab',
  /** 搜索框 */
  reLaunch = 'reLaunch',
  /** 轮播图 */
  redirectTo = 'redirectTo',
  /** 导航 */
  navigateTo = 'navigateTo',
  /** 商品模块 */
  navigateBack = 'navigateBack',
  /** 页面间事件通信通道 */
  EventChannel = 'EventChannel',
}
