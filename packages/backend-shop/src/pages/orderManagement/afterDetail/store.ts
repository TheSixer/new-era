import { EOrderStatus } from '@wmeimob/shop-data/src/enums/order/EOrderStatus'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { EGoodShippingStatus } from '~/enums/order/EGoodShippingStatus'
import { converType } from '~/hooks/useOrderTypes'
import { api } from '~/request'
import { OrderVO, RefundMasterDto } from '@wmeimob/backend-api'

export const afterDetailAtom = atom<RefundMasterDto>({}) // 售后详情

export const orderAtom = atom<OrderVO>({}) // 售后订单

/**
 * 售后退货明细
 *
 * 从订单中取出货物发货状态
 */
export const refundGoodsListAtom = atom((get) => {
  const { refundItemList = [] } = get(afterDetailAtom)
  const { items = [], orderStatus } = get(orderAtom)

  const orderType = converType(orderStatus)
  return refundItemList.map((item) => {
    const good = items.find((good) => good.skuNo === item.skuNo) || {}

    const goodShippingStatus = orderType === EOrderStatus.COMPLETED ? EGoodShippingStatus.Done : good.shipingStatus
    return { ...item, goodShippingStatus }
  })
})

/**
 * 售后订单信息
 * @param orderNo
 */
export function useRefundOrder(orderNo?: string) {
  const [, setOrder] = useAtom(orderAtom)

  useEffect(() => {
    if (orderNo) {
      api['/admin/orders/{orderNo}_GET'](orderNo).then(({ data = {} }) => {
        setOrder(data)
      })
    }
  }, [orderNo])
}
