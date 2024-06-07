import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 下单渠道
 */
export enum EOrderChannelType {
  /** 小程序 */
  WeiXin = 'WeiXin',

  /** H5 */
  WebApp = 'WebApp',

  Android = 'Android',

  IOS = 'IOS'
}

export const [MOrderChannelType, OOrderChannelType] = convertEnum([
  [EOrderChannelType.WeiXin, '小程序'],
  [EOrderChannelType.WebApp, 'H5'],
  [EOrderChannelType.Android, '安卓App'],
  [EOrderChannelType.IOS, 'iOSApp']
])
