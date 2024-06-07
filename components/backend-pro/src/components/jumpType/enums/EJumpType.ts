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
  /** 直播页面 */
  LivePage = 4,
  /** 装修页面 */
  DecorationPage = 5,
  /** 自定义链接 */
  CustomLink = 6,

}

/** 描述数据 */
export const MJumpType = {
  [EJumpType.SystemPage]: '功能页面',
  [EJumpType.GoodCate]: '商品分类',
  [EJumpType.GoodDetail]: '商品详情',
  [EJumpType.LivePage]: '直播页面',
  [EJumpType.DecorationPage]: '装修页面',
  [EJumpType.CustomLink]: '自定义链接'
}
