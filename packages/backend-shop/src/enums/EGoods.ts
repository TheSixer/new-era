import { LabeledValue } from 'antd/es/select'

/** 商品售卖类型 */
export enum GoodsWayEnum {
  /** 直接售卖 */
  RightAway,
  /** 等待手动售卖 */
  Manual,
  /** 自定义售卖时间 */
  Custom
}

export const GoodsWayName = {
  [GoodsWayEnum.RightAway]: '直接售卖',
  [GoodsWayEnum.Manual]: '等待手动售卖',
  [GoodsWayEnum.Custom]: '自定义售卖时间'
}

/** 商品类型 */
export enum GoodsTypeEnum {
  /** 实物商品 */
  Normal,
  /** 虚拟商品 */
  Virtual
}
export const GoodsTypeName = {
  [GoodsTypeEnum.Normal]: '实物商品',
  [GoodsTypeEnum.Virtual]: '虚拟商品'
}
export const goodsTypeOptions: LabeledValue[] = [
  { label: '实物商品', value: GoodsTypeEnum.Normal },
  { label: '虚拟商品', value: GoodsTypeEnum.Virtual }
]

/** 虚拟商品类型 */
export enum GoodsVirtualEnum {
  /** 核销码 */
  Code,
  /** 卡号卡密 */
  Card
}

export const GoodsVirtualName = {
  [GoodsVirtualEnum.Code]: '券码核销',
  [GoodsVirtualEnum.Card]: '卡号密码'
}

export const goodsVirtualOptions: LabeledValue[] = [
  { label: '券码核销', value: GoodsVirtualEnum.Code },
  { label: '卡号密码', value: GoodsVirtualEnum.Card }
]

/** 虚拟商品券码生成类型 */
export enum GoodsVirtualCreateEnum {
  /** 外部导入 */
  Export,
  /** 系统生成 */
  System
}

export const GoodsVirtualCreateName = {
  [GoodsVirtualCreateEnum.System]: '系统生成',
  [GoodsVirtualCreateEnum.Export]: '外部导入'
}

export const goodsVirtualCreateOptions: LabeledValue[] = [
  { label: '系统生成', value: GoodsVirtualCreateEnum.System },
  { label: '外部导入', value: GoodsVirtualCreateEnum.Export }
]

/** 商品状态 */
export enum GoodsStatusEnum {
  /** 待上架(未开始) */
  Ready,
  /** 待审核 */
  Reviewed,
  /** 售卖中 */
  Sell,
  /** 拒绝 */
  Reject,
  /** 平台下架 */
  ForceDown,
  /** 商家下架 */
  Over = -1
}

export const GoodsStatusName = {
  [GoodsStatusEnum.Over]: '下架',
  [GoodsStatusEnum.Sell]: '上架',
  [GoodsStatusEnum.Ready]: '待上架',
  [GoodsStatusEnum.Reviewed]: '审核中',
  [GoodsStatusEnum.Reject]: '已拒绝',
  [GoodsStatusEnum.ForceDown]: '平台下架'
}

export const goodsStatusOptions: LabeledValue[] = [
  { label: '下架', value: GoodsStatusEnum.Over },
  { label: '上架', value: GoodsStatusEnum.Sell },
  { label: '待上架', value: GoodsStatusEnum.Ready },
  { label: '审核中', value: GoodsStatusEnum.Reviewed },
  { label: '已拒绝', value: GoodsStatusEnum.Reject },
  { label: '平台下架', value: GoodsStatusEnum.ForceDown }
]

/** 商品库存单类型 */
export enum GoodsInventoryEnum {
  /** 入库 */
  InStock,
  /** 出库 */
  OutStock,
  /** 盘点 */
  CheckStock
}

export const GoodsInventoryName = {
  [GoodsInventoryEnum.InStock]: '商品入库',
  [GoodsInventoryEnum.OutStock]: '商品出库',
  [GoodsInventoryEnum.CheckStock]: '商品盘点'
}

/** 虚拟商品状态 */
export enum GoodsVirtualUseEnum {
  /** 未使用 */
  Unused,
  /** 已使用 */
  Used,
  /** 已过期 */
  Expire,
  /** 已作废 */
  Voided,
  /** 已锁定 */
  Locked,
  /** 已购买 */
  Purchased
}
export const GoodsVirtualUseName = {
  [GoodsVirtualUseEnum.Unused]: '未使用',
  [GoodsVirtualUseEnum.Used]: '已使用',
  [GoodsVirtualUseEnum.Expire]: '已过期',
  [GoodsVirtualUseEnum.Voided]: '已作废',
  [GoodsVirtualUseEnum.Locked]: '已锁定',
  [GoodsVirtualUseEnum.Purchased]: '已购买'
}
export const goodsVirtualUseOptions: LabeledValue[] = [
  { label: '未使用', value: GoodsVirtualUseEnum.Unused },
  { label: '已使用', value: GoodsVirtualUseEnum.Used },
  { label: '已过期', value: GoodsVirtualUseEnum.Expire },
  { label: '已作废', value: GoodsVirtualUseEnum.Voided },
  { label: '已购买', value: GoodsVirtualUseEnum.Purchased }
]
