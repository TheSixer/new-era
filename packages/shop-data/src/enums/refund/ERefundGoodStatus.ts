import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 售后货物状态
 *
 * 物状态 0：未收到货 1：部分收货 2:已收到货
 * @deprecated
 */
export enum ERefundGoodStatus {
  /** 未收到货 （未收到货） */
  NotReceived,
  /** 部分收货 */
  PartReceived,
  /** 已收到货（已发货） */
  Received
}

/**
 * @deprecated
 */
export const [MRefundGoodStatus, ORefundGoodStatus] = convertEnum([
  [ERefundGoodStatus.NotReceived, '待发货'],
  [ERefundGoodStatus.PartReceived, '部分收货'],
  [ERefundGoodStatus.Received, '已发货']
])
