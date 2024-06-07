import Taro from '@tarojs/taro'
import { IMMAction, IMMActionSheetProps } from '@wmeimob/taro-design/src/components/action-sheet/const'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { IButtonProps, MMButtonType } from '@wmeimob/taro-design/src/components/button/const'
import { useSetAtom } from 'jotai'
import { ReactNode, useEffect, useState } from 'react'
import { EOrderStatus } from '../../enums/EOrderStatus'
import { EOrderOperation, MOrderOperation } from '../../enums/order/EOrderOperation'
import { EOrderPageType } from '../../enums/order/EOrderPageType'
import { useDialog, useToast } from '@wmeimob/taro-design'
import { canGoodsAfterSales } from '../../pages/order/orderDetail/components/orderGoods/utils'
import { aftersalesGoodsInfoAtom, commentOrderAtom, IAfterSalesGoodInfo, orderShippingDtoAtom } from '../../pages/order/store'
import { api } from '@wmeimob/taro-api'
import { OrderVO } from '@wmeimob/taro-api'
import { routeNames } from '../../routes'
import useOrderTypes from '../useOrderTypes'
import { EOrderType } from '@wmeimob/shop-data/src/enums/order/EOrderType'
import { navByLink } from '../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import { h5Pay } from '../../utils/h5Pay'
import { isH5, isWeapp } from '../../config'

interface IUseOrderOperationsOption {
  /** 订单数据 */
  order: OrderVO

  /** 页面来源 */
  from?: EOrderPageType

  /** 页面刷新事件 */
  onRefresh: () => void
}

/**
 * 订单操作hooks
 */
export default function useOrderOperations({ order, onRefresh, from = EOrderPageType.List }: IUseOrderOperationsOption) {
  const [toast] = useToast()
  const dialog = useDialog()

  const setCommentOrder = useSetAtom(commentOrderAtom)

  const setOrderShippingDtoAtom = useSetAtom(orderShippingDtoAtom)

  const setAfterSalesInfo = useSetAtom(aftersalesGoodsInfoAtom)

  const { orderState } = useOrderTypes(order.orderStatus)

  const [buttonList, setButtonList] = useState<ReactNode[]>([])
  const [actionSheetOptions, setActionSheetOptions] = useState<IMMAction[]>([])
  const [actionSheetVisible, setActionSheetVisible] = useState(false)

  const actionSheetProps: IMMActionSheetProps = {
    visible: actionSheetVisible,
    actions: actionSheetOptions,
    onSelect: ({ id }) => {
      buttonEventMap[id]()
      setActionSheetVisible(false)
    },
    onClosed: () => setActionSheetVisible(false)
  }

  const buttonEventMap = {
    [EOrderOperation.Cancel]: () => handleCancel(),
    [EOrderOperation.Paying]: () => handlePay(),
    [EOrderOperation.Logistics]: () => handleLogistics(),
    [EOrderOperation.Confirm]: () => handleConfirmReceipt(),
    [EOrderOperation.Comment]: () => handleToComment(),
    [EOrderOperation.SeeComment]: () => handleLookComment(),
    [EOrderOperation.Del]: () => handleDel(),
    [EOrderOperation.AfterSales]: () => handleAfterSales(),
    [EOrderOperation.More]: () => handleMore()
  }

  useEffect(() => {
    const initData = () => {
      const { shippingList = [], selfPicked, orderType } = order
      const isFromList = from === EOrderPageType.List
      const isIntegralOrder = orderType === EOrderType.Integral
      const empty: EOrderOperation[] = []
      const currentStatusButtonList =
        {
          [EOrderStatus.PENDING_PAYMENT]: [EOrderOperation.Cancel, EOrderOperation.Paying],
          // 待发货如果有发货物流。表示存在部分发货的
          [EOrderStatus.UNSHIPPED]: shippingList.length ? [EOrderOperation.Logistics] : empty,
          // 待收货如果是自提 无法查看物流
          [EOrderStatus.WAIT_RECEIVING]: [!selfPicked && EOrderOperation.Logistics, EOrderOperation.Confirm],
          [EOrderStatus.PART_COMPLETED]: [EOrderOperation.Del, !selfPicked && EOrderOperation.Logistics, !isIntegralOrder && EOrderOperation.Comment],
          [EOrderStatus.COMPLETED]: [EOrderOperation.Del, !selfPicked && EOrderOperation.Logistics, !isIntegralOrder && EOrderOperation.SeeComment],
          [EOrderStatus.CANCEL]: [EOrderOperation.Del]
        }[orderState!] || []

      const buttons: EOrderOperation[] = (currentStatusButtonList as any[]).filter((it) => it !== false) // 过滤掉false

      const buttonProps: Partial<IButtonProps> = {
        size: 'tiny',
        style: { width: 70 }
      }

      const getButtonConfig = (operation: EOrderOperation): IButtonProps => {
        const text = MOrderOperation[operation]
        const onClick = buttonEventMap[operation]

        switch (operation) {
          case EOrderOperation.Cancel:
            return { text, type: MMButtonType.default, onClick }
          case EOrderOperation.Paying:
            return {
              text,
              onClick,
              backGround: 'linear-gradient(90deg, #FF577E 0%, #FF023C 100%)',
              color: '#EC131E',
              noBorder: !isFromList,
              ghost: isFromList
            }
          case EOrderOperation.Logistics:
            return { text, type: MMButtonType.default, onClick }
          case EOrderOperation.Confirm:
            return {
              text,
              onClick,
              backGround: 'linear-gradient(90deg, #FF577E 0%, #FF023C 100%)',
              color: '#EC131E',
              noBorder: !isFromList,
              ghost: isFromList
            }
          case EOrderOperation.Comment:
            return {
              text,
              onClick,
              backGround: 'linear-gradient(90deg, #FF577E 0%, #FF023C 100%)',
              color: '#EC131E',
              noBorder: !isFromList,
              ghost: isFromList
            }
          case EOrderOperation.SeeComment:
            return {
              text,
              onClick,
              backGround: 'linear-gradient(90deg, #FF577E 0%, #FF023C 100%)',
              color: '#EC131E',
              noBorder: !isFromList,
              ghost: isFromList
            }
          case EOrderOperation.Del:
            return { text, type: MMButtonType.default, onClick }
          case EOrderOperation.AfterSales:
            return { text, type: MMButtonType.default, onClick }
          case EOrderOperation.More:
            return { text, type: MMButtonType.default, onClick }
          default:
            return <></>
        }
      }

      // 详情页中且整单可退
      canFullOrderAfterSales() && !isFromList && order.orderType !== EOrderType.Integral && buttons.unshift(EOrderOperation.AfterSales)

      // 超出 4 个收纳至【更多】中
      const maxButton = 4
      const over = buttons.length > maxButton ? buttons.splice(0, buttons.length - (maxButton - 1), EOrderOperation.More) : []
      const list = buttons.map((operation, idx) => {
        return <MMButton key={idx} {...buttonProps} {...getButtonConfig(operation)} />
      })

      const sheetOptions: IMMAction[] = over.map((operation) => ({
        text: getButtonConfig(operation).text,
        id: `${operation}`
      }))

      setActionSheetOptions(sheetOptions)
      setButtonList(list)
    }

    initData()
  }, [orderState, from, order])

  /** 能否整单售后 */
  function canFullOrderAfterSales() {
    const everyCan = order.items?.every((orderGoods) => {
      // 赠品时跳过
      return orderGoods.gift ? true : canGoodsAfterSales(orderGoods, orderState!, order)
    })
    return everyCan
  }

  /** 支付成功 */
  function paySuccess(orderNo: string) {
    navByLink(EJumpType.RedirectTo, { url: routeNames.committedStatePaySuccess, params: { orderNo } })
    // Taro.redirectTo({ url: routeNames.committedStatePaySuccess, params: { orderNo } })
  }

  /** 取消支付 */
  async function handleCancel() {
    Taro.showModal({
      title: '提示',
      content: '是否确认取消订单？',
      async success(res) {
        if (res.confirm) {
          await api['/wechat/orders/cancel/{orderNo}_POST'](order.orderNo!)
          onRefresh()
        }
      }
    })
  }

  /** 支付 */
  async function handlePay() {
    try {
      if (isWeapp) {
        const { data: payParam = {} } = await api['/wechat/orders/pay/{orderNo}_GET']({
          orderNo: order.orderNo!,
          payType: 1,
          tradeType: 'JSAPI'
        })
        const { nonceStr, packageValue, paySign, timeStamp, signType }: any = payParam.payParam || {}
        await Taro.requestPayment({ nonceStr, package: packageValue, paySign, timeStamp, signType })
        paySuccess(order.orderNo!)
      }
      if (isH5) {
        await h5Pay(order.orderNo!)
      }
    } catch (error) {
      toast!.message('支付取消')
      throw error
    }
  }

  /** 查看物流 */
  async function handleLogistics() {
    const { shippingList = [], orderNo } = order

    // 只有一个物流信息且没拆包
    const isMulti = (orderState === EOrderStatus.UNSHIPPED && shippingList.length === 1) || shippingList.length > 1

    setOrderShippingDtoAtom(shippingList)
    if (!isMulti) {
      Taro.navigateTo({
        url: getParamsUrl(routeNames.orderLogistics, {
          orderNo,
          expressNo: shippingList[0].expressNo
        })
      })
    } else {
      // 拆包且全部发货、拆包但部分发货
      Taro.navigateTo({ url: getParamsUrl(routeNames.orderSplitLogistics, { orderNo }) })
    }
  }

  /** 确认收货 */
  async function handleConfirmReceipt() {
    dialog?.show({
      title: '提示',
      content: '是否确认收货？',
      okLoading: true,
      onOk: async () => {
        await api['/wechat/orders/confirm/{orderNo}_POST'](order.orderNo!)
        onRefresh()
      }
    })
  }

  /** 评论 */
  async function handleToComment() {
    setCommentOrder({
      orderNo: order.orderNo,
      items: order.items!
    })
    Taro.navigateTo({ url: routeNames.orderCommentAdd })
  }

  async function handleLookComment() {
    Taro.navigateTo({ url: getParamsUrl(routeNames.orderCommentCenter, { tabid: '1' }) })
  }

  /** 删除订单 */
  async function handleDel() {
    dialog?.show({
      title: '提示',
      content: '是否确认删除订单？',
      okLoading: true,
      onOk: async () => {
        await api['/wechat/orders/{orderNo}_DELETE'](order.orderNo!)
        if (from === EOrderPageType.List) {
          onRefresh()
        } else {
          Taro.navigateBack()
        }
      }
    })
  }

  function handleAfterSales() {
    const info: IAfterSalesGoodInfo = {
      orderDetail: order,
      afterOrderGoods: order.items!.filter((item) => !item.gift), // 剔除赠品
      isUnshipped: orderState === EOrderStatus.UNSHIPPED,
      isFullOrder: true
    }

    setAfterSalesInfo(info)
    Taro.navigateTo({ url: routeNames.orderAftesalesAdd })
  }

  function handleMore() {
    setActionSheetVisible(true)
  }

  return {
    buttonList,
    actionSheetProps
  }
}
