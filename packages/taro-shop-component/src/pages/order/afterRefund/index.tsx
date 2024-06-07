import { useRef, FC, memo, useEffect, useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IAfterFormValues, IAfterRefundProps, IAfterResons } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMImagePicker from '@wmeimob/taro-design/src/components/image-picker'
import OrderGood from '../../../components/order/orderGood'
import GoodPrice from '../../../components/good/goodPrice'
import { routeNames } from '../../../routes'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import MMFeild from '@wmeimob/taro-design/src/components/feild'
import { useAtom, useAtomValue } from 'jotai'
import { aftersalesGoodsInfoAtom, afterSalesGoodsTotalAmount } from '../store'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import MMForm from '@wmeimob/taro-design/src/components/form'
import { RefundItemDto, api } from '@wmeimob/taro-api'
import { upload } from '../../../components/aliyun'
import { ERefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import { ERefundScene } from '@wmeimob/shop-data/src/enums/refund/ERefundScene'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import classNames from 'classnames'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'

const Component: FC<IAfterRefundProps> = () => {
  const [afterInfo, setAfterInfo] = useAtom(aftersalesGoodsInfoAtom) // 申请售后的商品
  const goodsTotalAmount = useAtomValue(afterSalesGoodsTotalAmount)

  const [toast] = useToast()

  const { refundType, afterOrderGoods = [], orderDetail, isUnshipped, isFullOrder } = afterInfo || {} // refundType 0 仅退款 1 退货退款

  // 最大退款金额
  const maximumAmount = goodsTotalAmount

  const formRef = useRef<IMMFormInstance>(null)

  const [formInfo, setFormnfo] = useState<IAfterFormValues>({
    goodsStatus: refundType === ERefundType.Refund ? ERefundScene.REFUND : ERefundScene.RETURN_REFUND,
    refundAmount: maximumAmount
  })

  const { reasonOptions } = userRefundReasonService(formInfo.goodsStatus)

  const [refundNote, setRefundNote] = useState<string>('')

  const [images, setImages] = useState<string[]>([]) // 售后图片

  // 订单售后没有退过运费的情况下显示
  const [showFreightAmount, setShowFreightAmount] = useState<number>()

  useEffect(() => {
    api['/wechat/web/refund/refundableFreightAmount_GET']({ orderNo: afterInfo!.orderDetail.orderNo }).then((data) => {
      setShowFreightAmount(data.data)
    })
  }, [])

  // const showFreightAmount = orderDetail?.freightAmount && isUnshipped

  const updateInputValue = (data) => setFormnfo((pre) => ({ ...pre, ...data }))

  const [submitData] = useSuperLock(async () => {
    try {
      await formRef.current!.validateFields()
      toast?.loading()

      let uploadImage: string[] = []
      if (images.length) {
        uploadImage = await upload(images)
      }

      const refundAmount = Number(formInfo.refundAmount)

      const refundItemList: RefundItemDto[] = afterOrderGoods.map((orderGoods) => {
        return {
          ...orderGoods,
          refundQuantity: orderGoods.saleQuantity,
          applyRefundAmount: orderGoods.itemsPayAmount,
          goodsStatus: formInfo.goodsStatus as unknown as number
        }
      })

      const submitParams = {
        orderNo: orderDetail?.orderNo,
        refundNote,
        reason: formInfo.refundReson,
        reasonTxt: reasonOptions.find((sel) => sel.value === formInfo.refundReson)?.label || '',
        images: uploadImage.join(','),
        refundType,
        refundAmount,
        refundItemList
      }

      try {
        const { data } = isFullOrder ? await api['/wechat/web/refund/allsave_POST'](submitParams) : await api['/wechat/web/refund/save_POST'](submitParams)
        setAfterInfo(null)
        navByLink(EJumpType.RedirectTo, { url: routeNames.committedStateAfterSaleSuccess, params: { refundNo: data } })
        // Taro.redirectTo({ url: routeNames.committedStateAfterSaleSuccess, params: { refundNo: data } })
      } catch (error) {}
      toast?.hideLoading()
    } catch (error) {
      toast?.message(error)
    }
  })

  return (
    <PageContainer className={styles.afterRefundStyle} noPlace>
      <MMNavigation title="申请售后" />
      <View className="spacing" />

      <MMCard>
        {afterOrderGoods.map((orderGoods, idx) => (
          <OrderGood className={styles.goods} data={orderGoods} key={idx} showPrice={false} showMarketPrice={false} />
        ))}
      </MMCard>

      <View className="spacing" />

      <MMForm ref={formRef}>
        <MMCellGroup title={<View className={styles.cardTitle}>退款信息</View>}>
          {refundType === ERefundType.Every && (
            <>
              <MMCell title={<View className={styles.required}>退货方式</View>} titleAlign="top">
                自行寄回
              </MMCell>
              <View className={styles.refundExplain}>请在商家同意售后后自行寄回，运费自行支付/垫付</View>
            </>
          )}

          {/* 仅为商品的金额，运费又卖家后台操作决定 */}
          <MMCell title={<View className={styles.required}>退款金额</View>} titleAlign="top">
            <GoodPrice value={maximumAmount} fontSize={15} />
          </MMCell>
          <View className={styles.refundExplain}>
            不可修改，最多可退
            <GoodPrice value={maximumAmount} color={shopVariable.fontColorAssistant} fontSize={shopVariable.fontSizeSm} />
          </View>

          {!!showFreightAmount && (
            <>
              <MMCell title="运费金额" titleAlign="top">
                <GoodPrice value={orderDetail?.freightAmount || 0} fontSize={15} />
              </MMCell>
              <View className={styles.refundExplain}>实际退回金额请与卖家协商</View>
            </>
          )}
        </MMCellGroup>

        <View className="spacing" />

        <MMCellGroup>
          <MMCell title={<View className={classNames(styles.required, styles.cardTitle)}>请选择原因</View>}>
            <MMFeild.Select
              name="refundReson"
              suffix
              noStyle
              fieldProps={{ title: '退款原因', titleAlign: 'left' }}
              value={formInfo.refundReson}
              options={reasonOptions}
              rules={[{ required: true, message: '请选择退款原因' }]}
              onChange={(val) => {
                updateInputValue({ refundReson: val })
              }}
            />
          </MMCell>
        </MMCellGroup>
      </MMForm>

      <View className="spacing" />

      <MMCard title={<View className={styles.cardTitle}>补充描述及凭证</View>}>
        <MMFeild.TextArea
          value={refundNote}
          noStyle
          valueAlign="left"
          onChange={setRefundNote}
          feildProps={{
            className: styles.texterea,
            maxlength: 200,
            showLimit: true,
            placeholder: '补充描述，有助于商家更好的处理售后问题',
            onBlur: (event) => setRefundNote(event.detail.value)
          }}
        />

        <View className="spacing" />

        <View className={styles.saledetail_onload}>
          <MMImagePicker value={images} count={3} onChange={(value) => setImages(value)} />
        </View>
      </MMCard>

      <View className="spacing" />

      <MMFixFoot border>
        <MMButton
          block
          onClick={() => {
            submitData()
          }}
        >
          提交
        </MMButton>
      </MMFixFoot>
    </PageContainer>
  )
}

const AfterRefund = memo(Component)
export default AfterRefund

function userRefundReasonService(refundResonType: ERefundScene) {
  const [allReson, setAllReson] = useState<IAfterResons[]>([])

  const reasonOptions = useMemo(() => {
    return allReson.filter((item) => item.types.some((type) => type === (refundResonType as any)))
  }, [refundResonType, allReson])

  useEffect(() => {
    async function getAllReason() {
      const { data = [] } = await api['/wechat/mall/refundReason/queryAll_GET']({})
      if (data.length) {
        setAllReson(
          data.map((item) => {
            return {
              ...item,
              label: item.name!,
              value: item.id!,
              types: item.type!.split(',')
            }
          })
        )
      }
    }
    getAllReason()
  }, [])

  return {
    allReson,

    reasonOptions
  }
}
