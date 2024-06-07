/* eslint-disable no-nested-ternary */
import { Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { EGoodsType } from '@wmeimob/shop-data/goods/enums/EGoodsType'
import { api, CalculateOrderContext, OrderCalculateResponse } from '@wmeimob/taro-api'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import { useAtom } from 'jotai'
import { useRef, FC, memo, ReactNode, useEffect, useMemo } from 'react'
import GoodPrice from '../../../components/good/goodPrice'
import { useCheckUserStatus } from '../../../globalStore'
import { routeNames } from '../../../routes'
import CellTitle from './components/cellTitle'
import CouponSelect from './components/couponSelect'
import DiscountCells from './components/discountCells'
import OrderGoods from './components/orderGoods'
import ReceivingAddress from './components/receivingAddress'
import Remark from './components/remark'
import SubmitBotBar from './components/submitBotBar'
import { EOrderType, IConfirmOrderProps } from './const'
import { EOrderChannelType } from '@wmeimob/shop-data/src/enums/order/EOrderChannelType'
import { useAmountInfo } from './hooks/useAmountInfo'
import useCommonCouponSelect from './hooks/useCommonCouponSelect'
import useExchangeCouponSelect from './hooks/useExchangeCouponsSelect'
import useFreeShippingCouponSelect from './hooks/useFreeShippingCouponSelect'
import useGiftCouponSelect from './hooks/useGiftCouponSelect'
import styles from './index.module.less'
import {
  addressAtom,
  checkedCouponNoAtom,
  confirmGoodsAtom,
  exchangeCouponNoAtom,
  freeShippingCouponNoAtom,
  giftCouponNoAtom,
  orderCalculateInfoAtom,
  remarkAtom,
  useResetStore
} from './store'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { isH5, isWeapp } from '../../../config'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import dayjs from 'dayjs'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import { h5Pay } from '../../../utils/h5Pay'

const divider = <MMDivider style={{ margin: `${shopVariable.spacingLarge / 2}px ${shopVariable.spacingLarge}px` }} />

const Component: FC<IConfirmOrderProps> = () => {
  const { formRef, orderCalculateInfo, address, handleBuyClick, orderCalculate } = useConfirmOrderService()
  const { realFreightAmount } = useAmountInfo(orderCalculateInfo)

  const commonCouponProps = useCommonCouponSelect({
    orderCalculate: (couponNo) => orderCalculate({ couponNo })
  })
  const exchangeCouponProps = useExchangeCouponSelect({
    orderCalculate: (exchangeCouponNo) => orderCalculate({ exchangeCouponNo, couponNo: '' })
  })
  const freeShippingCouponProps = useFreeShippingCouponSelect({
    orderCalculate: (freeShippingCouponNo) => orderCalculate({ freeShippingCouponNo })
  })
  const giftCouponProps = useGiftCouponSelect({
    orderCalculate: (giftCouponNo) => orderCalculate({ giftCouponNo })
  })

  function renderShippingFeeCell() {
    let content: ReactNode = null

    if (!address.id) {
      content = <Text className={styles.emptyAddress}>选择收货地址后计算</Text>
    } else if (realFreightAmount) {
      content = <GoodPrice value={realFreightAmount} blod={false} fontSize={13} color="#333333" />
    } else {
      content = <View className={styles.normalWeight}>包邮</View>
    }

    return <MMCell title={<CellTitle title="运费" />}>{content}</MMCell>
  }

  function findActivity(order, type: EActivityType) {
    return order.marketingActivityList?.find(({ marketingType }) => marketingType === type)
  }

  const preSale = useMemo(() => {
    const activity = findActivity(orderCalculateInfo, EActivityType.PreSale)
    const shippingTime = activity ? dayjs(activity.shippingTime).format('YYYY年MM月DD日') : ''

    /** 将有参与预售活动的商品捞出 */
    const preSaleGoods =
      orderCalculateInfo.items?.reduce(
        (obj, { skuNo, orderItemMarketingList = [] }) => ({
          ...obj,
          [skuNo!]: orderItemMarketingList.some((goodsActivity) => goodsActivity.marketingType === EActivityType.PreSale)
        }),
        {} as Record<string, boolean>
      ) || {}

    return {
      show: !!activity,
      shippingTime,
      preSaleGoods
    }
  }, [orderCalculateInfo])

  return (
    <PageContainer className={styles.confirmOrderStyle} noPlace>
      <MMNavigation title="确认订单" />
      {preSale.show && (
        <View className={styles.preSale}>
          <View>预售发货时间</View>
          <View>{preSale.shippingTime}后发货</View>
        </View>
      )}
      {/* 收货地址 */}
      <ReceivingAddress />
      <View className="spacing" />

      <MMCellGroup>
        <OrderGoods order={orderCalculateInfo} />

        <MMCell title={<CellTitle title="商品总额" />}>
          <GoodPrice value={orderCalculateInfo.goodsAmount!} blod={false} fontSize={13} color={shopVariable.fontColor} />
        </MMCell>

        {renderShippingFeeCell()}

        {divider}

        <Remark />
      </MMCellGroup>

      <View className="spacing" />

      <DiscountCells order={orderCalculateInfo} formRef={formRef} onRefresh={orderCalculate} />

      <View className="spacing" />

      {/* 满减满折券 */}
      <CouponSelect title="优惠券" {...commonCouponProps} />
      {/* 兑换券弹窗 */}
      <CouponSelect title="兑换券" {...exchangeCouponProps} />
      {/* 免邮券弹窗 */}
      <CouponSelect title="免邮券" {...freeShippingCouponProps} />
      {/* 赠品券弹窗 */}
      <CouponSelect title="赠品券" {...giftCouponProps} />

      <SubmitBotBar data={orderCalculateInfo} onSubmit={handleBuyClick} />
    </PageContainer>
  )
}

const ConfirmOrder = memo(Component)
export default ConfirmOrder

function useConfirmOrderService() {
  const { params } = useRouter()
  const [toast] = useToast()
  const [checkedCouponNo, setCheckedCouponNo] = useAtom(checkedCouponNoAtom) // 当前选中的优惠券
  const [exchangeCouponNo, setExchangeCouponNo] = useAtom(exchangeCouponNoAtom) // 当前选中的兑换优惠券
  const [freeShippingCouponNo, setFreeShippingCouponNo] = useAtom(freeShippingCouponNoAtom) // 当前选中的包邮优惠券
  const [giftCouponNo, setGiftCouponNo] = useAtom(giftCouponNoAtom) // 当前选中的赠品优惠券

  // 收货地址
  const [address, setAddress] = useAtom(addressAtom)
  const [remark, setRemark] = useAtom(remarkAtom)
  const [itemGoodsInfoList, setItemGoodsInfoList] = useAtom(confirmGoodsAtom)

  const [orderCalculateInfo, setOrderCalculateInfo] = useAtom(orderCalculateInfoAtom)

  // 下单类型
  const orderType = useMemo<EOrderType>(() => (params.orderType as any) || EOrderType.Buy, [params.orderType])

  const formRef = useRef<IMMFormInstance>(null)

  const checkUserStatus = useCheckUserStatus()

  useEffect(() => {
    async function getInitData() {
      if (!address.id) {
        // 获取默认收货地址
        const { data: defaultAddress } = await api['/wechat/mall/address/getDefault_GET']()
        if (defaultAddress) {
          setAddress(defaultAddress)
        } else {
          orderCalculate()
        }
      } else {
        orderCalculate()
      }
    }

    getInitData()
  }, [address])

  /** 重置store变量 */
  useResetStore()

  /** 计算订单数据 */
  async function orderCalculate(params: CalculateOrderContext = {}) {
    // h5直接刷新页面 会丢失商品信息。
    if (!itemGoodsInfoList.length) {
      Taro.switchTab({ url: routeNames.tabBarHome })
      return
    }

    const formData = (await formRef.current?.validateFields()) || {}

    toast?.loading()
    try {
      const { data = {} } = await api['/wechat/orders/calculate_POST']({
        type: orderType,
        goodsType: EGoodsType.General,
        itemGoodsInfoList,
        addressId: address.id,
        couponNo: checkedCouponNo,
        exchangeCouponNo,
        freeShippingCouponNo,
        giftCouponNo,
        orderChannelType: isWeapp ? EOrderChannelType.WeiXin : EOrderChannelType.WebApp,
        scoreBO: {
          usedScore: formData.score || 0
        },
        ...params
      })
      validCoupon(data)
      setOrderCalculateInfo(data)
    } catch (error) {}

    toast?.hideLoading()
  }

  function validCoupon({ couponGoodsItems = [], memCouponVoList = [] }: OrderCalculateResponse) {
    // 过滤满减满折券
    const commonCoupons = memCouponVoList.filter((item) => [ECouponType.Discount, ECouponType.Deduction].includes(item.couponType!))
    // 选中的优惠券 （初始化会选择最优）
    if (commonCoupons.length) {
      const selectedNo = commonCoupons.find((item) => item.selected!)?.couponNo || 'NOSELECT'
      setCheckedCouponNo(selectedNo)
    } else {
      setCheckedCouponNo('')
    }
    // 校验赠品库存
    const giftGoods = couponGoodsItems.find((item) => item.couponType === ECouponType.Present)
    if (giftGoods?.saleQuantity === 0) {
      toast?.message('赠品库存不足')
      setGiftCouponNo('')
    }
  }

  async function handleBuyClick() {
    // 用户被禁用时不允许下单购买
    await checkUserStatus.check('当前用户已禁用，无法购买')

    const formData = await formRef.current?.validateFields()

    // 验证数据
    if (!address.id) return toast?.message('请选择地址')

    // 提交订单
    const { data: orderData = {} } = await api['/wechat/orders_POST']({
      type: orderType,
      goodsType: EGoodsType.General,
      itemGoodsInfoList,
      addressId: address.id,
      userComments: remark,
      couponNo: checkedCouponNo,
      exchangeCouponNo,
      freeShippingCouponNo,
      giftCouponNo,
      orderChannelType: isWeapp ? EOrderChannelType.WeiXin : EOrderChannelType.WebApp,
      scoreBO: {
        usedScore: formData.score || 0
      }
    })

    // 如果是零元。直接支付成功
    if (orderData.payAmount !== 0) {
      try {
        try {
          if (isWeapp) {
            // 获取支付参数
            const res = await api['/wechat/orders/pay/{orderNo}_GET']({
              orderNo: orderData.orderNo!,
              payType: 1,
              tradeType: 'JSAPI'
            })
            const { nonceStr, packageValue, paySign, timeStamp, signType }: any = res.data?.payParam || {}
            await Taro.requestPayment({ nonceStr, package: packageValue, paySign, timeStamp, signType })
            paySuccess(orderData.orderNo!)
          }
          if (isH5) {
            await h5Pay(orderData.orderNo!)
          }
        } catch (error) {
          toast!.message('支付取消', () => {
            Taro.redirectTo({ url: getParamsUrl(routeNames.orderOrderDetail, { orderNo: orderData.orderNo! }) })
          })
        }
      } catch (error) {
        toast?.fail({
          message: '获取支付参数出错',
          mask: true
        })
      }
    } else {
      paySuccess(orderData.orderNo!)
    }
  }

  /** 支付成功 */
  function paySuccess(orderNo: string) {
    toast?.success(
      {
        message: '支付成功',
        mask: true
      },
      () => {
        navByLink(EJumpType.RedirectTo, { url: routeNames.committedStatePaySuccess, params: { orderNo } })
        // Taro.redirectTo({ url: routeNames.committedStatePaySuccess, params: { orderNo } })
      }
    )
  }

  /** 重置store变量 */
  function resetStore() {
    setCheckedCouponNo('')
    setExchangeCouponNo('')
    setFreeShippingCouponNo('')
    setGiftCouponNo('')
    setAddress({})
    setRemark('')
    setItemGoodsInfoList([])
    setOrderCalculateInfo({})
  }

  return {
    formRef,
    address,
    remark,
    orderCalculateInfo,
    handleBuyClick,
    orderCalculate
  }
}

// export interface IConfirmOrderGood {
//   goodsId?: number
//   skuId?: number
//   goodsNo?: string
//   skuNo?: string
//   goodsName?: string
//   specNames?: string
//   coverImg?: string
//   skuPrice?: number
//   marketPrice?: number
//   skuStock?: number
//   skuImg?: string
//   buyCounts?: number
//   // shelved?: boolean
//   // goodsDel?: boolean
//   // skuDel?: boolean
// }
