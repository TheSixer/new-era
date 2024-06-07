/* eslint-disable no-nested-ternary */
import { Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import GoodsPriceWithIntegral from '@wmeimob-modules/goods-taro/src/components/goodsPriceWithIntegral'
import { useAtom } from 'jotai'
import { useRef, FC, memo, ReactNode, useEffect, useMemo, useState } from 'react'
import GoodPrice from '../../../components/good/goodPrice'
import GoodsPrice from '@wmeimob-modules/goods-taro/src/components/goodsPrice'
import OrderGood from '../../../components/order/orderGood'
import { disableUser, useCheckUserStatus } from '../../../globalStore'
import { PageContainer, useDialog, useToast } from '@wmeimob/taro-design'
import { routeNames } from '../../../routes'
import CellTitle from './components/cellTitle'
import ReceivingAddress from './components/receivingAddress'
import Remark from './components/remark'
import SubmitBotBar from './components/submitBotBar'
import { EOrderType, IConfirmOrderProps } from './const'
import styles from './index.module.less'
import { addressAtom, confirmGoodsAtom, remarkAtom, showCouponPopAtom } from './store'
import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { EGoodsType } from '@wmeimob/shop-data/goods/enums/EGoodsType'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { isH5, isWeapp } from '../../../config'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import { h5Pay } from '../../../utils/h5Pay'
import { OrderCalculateResponse, api } from '@wmeimob/taro-api'
import { EOrderChannelType } from '@wmeimob/shop-data/src/enums/order/EOrderChannelType'

const divider = <MMDivider style={{ margin: `${shopVariable.spacingLarge / 2}px ${shopVariable.spacingLarge}px` }} />

const Component: FC<IConfirmOrderProps> = () => {
  const { address, isNotEnoughScore, orderCalculateInfo, handleBuyClick, orderGoods } = useConfirmOrderService()

  const { scoreBO = {} } = orderCalculateInfo

  function renderShippingFeeCell() {
    let content: ReactNode = null

    if (!address.id) {
      content = <Text className={styles.emptyAddress}>选择收货地址后计算</Text>
    } else if (orderCalculateInfo.realFreightAmount) {
      content = <GoodPrice value={orderCalculateInfo.realFreightAmount} fontSize={13} color="#333333" />
    } else {
      content = <View className={styles.normalWeight}>包邮</View>
    }

    return <MMCell title={<CellTitle title="运费" />}>{content}</MMCell>
  }

  return (
    <PageContainer className={styles.confirmOrderStyle} noPlace>
      <MMNavigation title="确认订单" />
      {/* 收货地址 */}
      <ReceivingAddress />
      <View className="spacing" />

      <MMCellGroup>
        {orderGoods.map((item) => (
          <MMCell key={item.goodsId! + item.skuId!} valueAlign="left">
            <OrderGood data={item} showMarketPrice={false} color="#F11C27" />
          </MMCell>
        ))}

        {renderShippingFeeCell()}

        {/* {divider} */}

        <MMCell title={<CellTitle title="商品总额" />}>
          <View className={styles.priceInfo}>
            {!!orderCalculateInfo.goodsAmount! && <GoodsPrice value={orderCalculateInfo.goodsAmount!} pureStyle />}

            {!!orderCalculateInfo.goodsAmount && !!scoreBO.usedScore && <View style={{ margin: '0 3px' }}>+</View>}

            {!!scoreBO.usedScore && (
              <>
                <View>{scoreBO.usedScore}</View>
                <View>积分</View>
              </>
            )}
          </View>
        </MMCell>

        <Remark />

        {divider}

        <View className={styles.allPrice}>
          <MMSpace>
            <View className={styles.sum}>合计:</View>
            <GoodsPriceWithIntegral salePrice={orderCalculateInfo.payAmount!} exchangeIntegral={scoreBO.usedScore} fontSize={18} />
          </MMSpace>
        </View>
      </MMCellGroup>

      <View className="spacing" />

      {/* <MMCellGroup>
        <MMCell title={<CellTitle title='商品总额' />}>
          <View className={styles.priceInfo}>
            {!!orderCalculateInfo.goodsAmount! && <GoodsPrice value={orderCalculateInfo.goodsAmount!} pureStyle />}

            {!!orderCalculateInfo.goodsAmount && !!scoreBO.usedScore && <View style={{ margin: '0 3px' }}>+</View>}

            {!!scoreBO.usedScore && (
              <>
                <View>{scoreBO.usedScore}</View>
                <View>积分</View>
              </>
            )}
          </View>
        </MMCell>

        <MMCell title={<CellTitle title='运费' />}>
          <GoodPrice value={orderCalculateInfo.realFreightAmount!} fontSize={13} color={shopVariable.fontColor} />
        </MMCell>

        {divider}

        <View className={styles.allPrice}>
          <MMSpace>
            <View className={styles.sum}>合计:</View>
            <GoodsPriceWithIntegral salePrice={orderCalculateInfo.payAmount!} exchangeIntegral={scoreBO.usedScore}
                                    fontSize={18} />
          </MMSpace>
        </View>
      </MMCellGroup> */}

      <View className="spacing" />

      <MMFixFoot border>
        <SubmitBotBar data={orderCalculateInfo} disabled={isNotEnoughScore} onSubmit={handleBuyClick} isTop isConfirm />
      </MMFixFoot>
    </PageContainer>
  )
}

const ConfirmOrder = memo(Component)
export default ConfirmOrder

function useConfirmOrderService() {
  const { params } = useRouter()
  const [toast] = useToast()
  const dialog = useDialog()
  const [checkedCouponNo, setCheckedCouponNo] = useState('') // 当前选中的优惠券

  const [_couponVisible, setCouponVisible] = useAtom(showCouponPopAtom)
  // 收货地址
  const [address, setAddress] = useAtom(addressAtom)
  const [remark, setRemark] = useAtom(remarkAtom)
  const [itemGoodsInfoList, setItemGoodsInfoList] = useAtom(confirmGoodsAtom)

  const [orderCalculateInfo, setOrderCalculateInfo] = useState<OrderCalculateResponse>({})

  // 下单类型
  const orderType = useMemo<EOrderType>(() => (params.orderType as any) || EOrderType.Buy, [params.orderType])

  // 优惠券减免金额。 是从活动列表里面取出来的
  const couponAmount = useMemo(
    () =>
      orderCalculateInfo.marketingActivityList?.find(
        (item) => item.marketingType === EActivityType.Coupon && [ECouponType.Discount, ECouponType.Deduction].includes(item.discountType!)
      )?.discountAmount ?? 0,
    [orderCalculateInfo]
  )

  // 订单商品
  const orderGoods = useMemo(() => orderCalculateInfo.items || [], [orderCalculateInfo])

  // 积分是否足够
  const isNotEnoughScore = useMemo(() => {
    const { availableScore = 0, usedScore = 0 } = orderCalculateInfo.scoreBO || {}
    return availableScore < usedScore
  }, [orderCalculateInfo])

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
        orderCalculate(address.id)
      }
    }

    getInitData()
  }, [address])

  useEffect(() => {
    if (isNotEnoughScore) {
      toast?.message('可用积分不足')
    }
  }, [isNotEnoughScore])

  useEffect(() => () => resetStore(), [])

  // 选择优惠券
  function handleCouponModalOk(couponNo) {
    setCheckedCouponNo(couponNo)
    orderCalculate(address.id, couponNo)
    setCouponVisible(false)
  }

  function handleScoreChange() {
    orderCalculate()
  }

  /** 计算订单数据 */
  async function orderCalculate(addressId?: number, couponNo?: string) {
    const formData = (await formRef.current?.validateFields()) || {}

    toast?.loading()
    try {
      const { data = {} } = await api['/wechat/orders/calculate_POST']({
        type: orderType,
        goodsType: EGoodsType.Integral,
        itemGoodsInfoList,
        addressId: addressId || address.id,
        couponNo: couponNo || checkedCouponNo,
        orderChannelType: isWeapp ? EOrderChannelType.WeiXin : EOrderChannelType.WebApp,
        scoreBO: {
          usedScore: formData.score || 0
        }
      })
      const { memCouponVoList = [] } = data
      setOrderCalculateInfo(data)

      // 选中的优惠券 （初始化会选择最优）
      if (memCouponVoList.length) {
        const selectedNo = memCouponVoList.find((item) => item.selected!)?.couponNo || 'NOSELECT'
        setCheckedCouponNo(selectedNo)
      }
    } catch (error) {}

    toast?.hideLoading()
  }

  async function validate() {
    const err = () => Promise.reject(new Error('校验不通过'))

    // 用户被禁用时不允许下单购买
    if (disableUser) {
      toast?.message('当前用户已禁用，无法购买')
      return err()
    }

    await formRef.current?.validateFields()

    // 验证数据 -------------------------
    if (!address.id) {
      toast?.message('请选择地址')
      return err()
    }
  }

  async function handleBuyClick() {
    await validate()

    // 提交订单
    const { scoreBO = {} } = orderCalculateInfo
    const usedScore = scoreBO.usedScore ?? 0

    const isPureIntegralPay = await pureIntegralPay()
    const { data: orderData = {} } = await api['/wechat/orders_POST']({
      type: orderType,
      goodsType: EGoodsType.Integral,
      itemGoodsInfoList,
      addressId: address.id,
      userComments: remark,
      couponNo: checkedCouponNo,
      orderChannelType: isWeapp ? EOrderChannelType.WeiXin : EOrderChannelType.WebApp,
      scoreBO: { usedScore }
      // payType: payTypeService.payType!.value
    })

    // 纯积分支付 或者零元购 直接支付成功
    if (isPureIntegralPay || (orderData.payAmount === 0 && usedScore === 0)) {
      return paySuccess(orderData.orderNo!)
    }
    // 纯金额支付 或者 积分 + 金额支付
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
            // Taro.redirectTo({ url: routeNames.orderOrderDetail, params: { orderNo: orderData.orderNo! } })
          })
        }
      } catch (error) {
        toast?.fail({ message: '获取支付参数出错', mask: true })
      }
    }
  }

  /**
   * 是否纯积分支付
   * 弹窗确认
   * @returns
   */
  function pureIntegralPay() {
    const { payAmount = 0, scoreBO = {} } = orderCalculateInfo
    const usedScore = scoreBO.usedScore ?? 0
    return new Promise<boolean>((resolve, reject) => {
      if (payAmount === 0 && usedScore !== 0) {
        // 纯积分支付 弹窗确认
        dialog?.show({
          title: '确认兑换?',
          onOk: () => {
            resolve(true)
          },
          onCancel: () => {
            reject()
          }
        })
      } else {
        resolve(false)
      }
    })
  }

  /** 支付成功 */
  function paySuccess(orderNo: string) {
    toast?.success(
      {
        message: '支付成功',
        mask: true
      },
      () => {
        navByLink(EJumpType.RedirectTo, {
          url: routeNames.integralGoodsPaySuccess,
          params: { orderNo }
        })
        // Taro.redirectTo({
        //   url: routeNames.integralGoodsPaySuccess,
        //   params: { orderNo }
        // })
      }
    )
  }

  /** 重置store变量 */
  function resetStore() {
    setCouponVisible(false)
    setAddress({})
    setRemark('')
    setItemGoodsInfoList([])
  }

  return {
    formRef,
    address,
    remark,
    orderCalculateInfo,
    couponAmount,
    handleBuyClick,
    resetStore,
    handleCouponModalOk,
    handleScoreChange,
    checkedCouponNo,
    setCouponVisible,
    orderGoods,
    isNotEnoughScore
  }
}
