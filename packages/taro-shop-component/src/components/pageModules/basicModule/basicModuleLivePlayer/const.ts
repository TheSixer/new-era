import { IBasicModuleLiverPlayer } from '@wmeimob-modules/decoration-data'
import { getDefaultComponetStyle } from '../../utils'

export interface IBasicModuleLivePlayerProps extends IBasicModuleLiverPlayer {}

export function getModuleLivePlayerDefaultProps(): IBasicModuleLiverPlayer {
  return {
    data: [],
    componentStyle: getDefaultComponetStyle()
  }
}

export interface ILiveInfos {
  id: any
  /** 直播间名称 */
  name: string
  /** 房间号 */
  roomId: string
  /** 封面图片 */
  coverImg: string
  /** 商品图片 */
  goods: {
    goodsNo: string
    id: number
    goodsCoverImage: string
  }[]
  /** 直播间状态 0 - 未开始 1-开始中 2-已结束 */
  state: 0 | 1 | 2

  expectStartTime: string
  expectEndTime: string
  day: number
  hour: number
  minute: number
  seconds: number
}
