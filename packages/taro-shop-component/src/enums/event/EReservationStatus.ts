import { createEnumOptions } from '../utils'

/**
 * 活动状态
 * 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 状态为0和1时前端展示启用和未启用功能
 */
export enum EReservationStatus {
  /** 未核销 */
  NoUse = 0,

  Arranged = 1,

  /** 已核销 */
  Used = 2,

  /** 已取消 */
  Canceled = 3,
}

export const MReservationStatus = {
  [EReservationStatus.NoUse]: '待分配座位',
  [EReservationStatus.Arranged]: '已分配座位',
  [EReservationStatus.Used]: '已核销',
  [EReservationStatus.Canceled]: '已取消'
}

export const OReservationStatus = createEnumOptions(MReservationStatus)

export enum ECardType {
  /** 身份证 */
  ID_CARD = 'ID_CARD',

  /** 港澳通行证 */
  GANG_AO = 'GANG_AO',

  /** 护照 */
  HU_ZHAO = 'HU_ZHAO',

  /** 台胞证 */
  TAI_BAO = 'TAI_BAO',
}

export const MCardType = {
  [ECardType.ID_CARD]: '身份证',
  [ECardType.GANG_AO]: '港澳通行证',
  [ECardType.HU_ZHAO]: '护照',
  [ECardType.TAI_BAO]: '台胞证'
}

export const OCardTypes = createEnumOptions(MCardType)
