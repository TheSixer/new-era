/** 链接跳转类型 */
export enum EHomePageType {
  /** 不跳转 */
  None = 0,
  /** Banner */
  Banner = 1,
  /** 主推故事 */
  KeyStory = 2,
  /** 玩转积分 */
  EarnPoints = 3,
  /** 尖货 */
  Premium = 5,
  /** 品牌故事 */
  AboutUs = 6,
  /** 直播页面 */
  LivePage = 7,
  /** H5链接 */
  H5Link = 8
}

/** 描述数据 */
export const MHomePageType = {
  [EHomePageType.Banner]: 'Banner',
  [EHomePageType.KeyStory]: '主推故事',
  [EHomePageType.EarnPoints]: '玩转积分',
  [EHomePageType.Premium]: '尖货',
  [EHomePageType.AboutUs]: '品牌故事'
}
