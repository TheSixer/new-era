/**
 * 商品库存操作
 */
export enum EGoodStockOps {
  /** 增加 */
  add = 'add',
  /** 减少 */
  decrease = 'decrease'
}

export const MGoodStockOps = {
  [EGoodStockOps.add]: '增加',
  [EGoodStockOps.decrease]: '减少'
}

/**
 * 库存修改模式
 */
export enum EChangeStockType {
  /** 渐进修改 */
  Progressive = 'Progressive',

  /** 直接修改 */
  Direct = 'Direct'
}

/** 修改的类型 */
export enum EChangeType {
  /** 库存 */
  stock,

  /** 价格 */
  price
}
