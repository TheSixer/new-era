import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 配送方式 */
export enum EOrderShipMethod {
  /** 商家配送 */
  Store,
  /** 无需物流 */
  NoShip
}

/** 配送方式 */
export const [MOrderShipMethod, OOrderShipMethod] = convertEnum([
  [EOrderShipMethod.Store, '商家配送'],
  [EOrderShipMethod.NoShip, '无需物流']
])
