/** 链接跳转类型 */
export enum EJumpType {
  /** 不跳转 */
  None = 0,
  /** 功能页面 */
  SystemPage = 1,
  /** 商品分类 */
  GoodCate = 2,
  /** 商品详情 */
  GoodDetail = 3,
  /** 店铺详情 */
  ShopDetail = 4,
  /** 装修页面 */
  DecorationPage = 5,
  /** 自定义链接 */
  CustomLink = 6,
  /** 直播页面 */
  LivePage = 7,
  /** H5链接 */
  H5Link,
  /** 默认跳转 */
  DefaultNav,
  /** 关闭当前页跳转 */
  RedirectTo
}

/** 描述数据 */
export const MJumpType = {
  [EJumpType.None]: '不跳转',
  [EJumpType.SystemPage]: '功能页面',
  [EJumpType.GoodCate]: '商品分类',
  [EJumpType.GoodDetail]: '商品详情',
  [EJumpType.LivePage]: '直播页面',
  [EJumpType.ShopDetail]: '店铺详情',
  [EJumpType.DecorationPage]: '装修页面',
  [EJumpType.CustomLink]: '自定义链接',
  [EJumpType.H5Link]: 'H5链接',
  [EJumpType.DefaultNav]: '默认跳转',
  [EJumpType.RedirectTo]: '关闭跳转'
}
