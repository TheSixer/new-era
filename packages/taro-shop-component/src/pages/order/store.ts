import { atom, useAtom } from 'jotai'
import { plus } from 'number-precision'
import { ERefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import { api } from '@wmeimob/taro-api'
import { CommentsVO, MallExpressCompanyVo, OrderItemsVO, OrderShippingDto, OrderVO } from '@wmeimob/taro-api'

export interface IAfterSalesGoodInfo {
  /** 订单详情 */
  orderDetail: OrderVO
  /** 售后商品 */
  afterOrderGoods: OrderItemsVO[]
  /** 是否待发货状态 */
  isUnshipped: boolean
  /** 售后类型 */
  refundType?: ERefundType
  /** 是否整单售后 */
  isFullOrder: boolean
}

export interface ICommentOrderInfo {
  /** 订单编号，追评时不传 */
  orderNo?: OrderVO['orderNo']
  /** 评价的商品信息，追评时仅传 1 项 */
  items: (Pick<OrderItemsVO, 'orderNo' | 'goodsNo' | 'skuNo' | 'skuImg' | 'goodsImg' | 'goodsName'> & {
    /** 追评时不传 */
    gift?: boolean
  })[]
  /** 追评的评价 id */
  commentId?: CommentsVO['id']
}

/**
 * 快递公司
 */
interface IExpressCompany extends MallExpressCompanyVo {
  label: string
  value: string
}

/** 申请售后的商品 */
export const aftersalesGoodsInfoAtom = atom<IAfterSalesGoodInfo | null>(null)

/** 售后商品总的退款金额 */
export const afterSalesGoodsTotalAmount = atom(
  (get) => get(aftersalesGoodsInfoAtom)?.afterOrderGoods.reduce((total, { itemsPayAmount = 0 }) => plus(total, itemsPayAmount), 0) ?? 0
)

// 去评价的商品
export const commentOrderAtom = atom<ICommentOrderInfo | null>(null)

/**
 * 订单发货明细数据
 *
 * 拆包发货可能会存在多个
 */
export const orderShippingDtoAtom = atom<OrderShippingDto[]>([])

export const expressCompanysAtom = atom<IExpressCompany[]>([])

/**
 * 获取物流
 */
export function useExpressCompany() {
  const [expressCompanys, setExpressCompanys] = useAtom(expressCompanysAtom)

  /**
   * 获取物流公司信息
   */
  async function getExpressCompany() {
    // 获取所有物流公司
    const { data = [] } = await api['/wechat/mall/logisticsCompany/expressCompanyAll_GET']({})
    const allList = data.map((list) => {
      return {
        ...list,
        label: list.expressCompany!,
        value: list.expressCompanyCode!
      }
    })
    setExpressCompanys(allList)
  }

  return {
    expressCompanys,
    setExpressCompanys,
    getExpressCompany
  }
}
