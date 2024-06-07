import { Text, View } from '@tarojs/components'
import { OrderCalculateResponse } from '@wmeimob/taro-api'
import { Cell, CellGroup, Divider, MMForm } from '@wmeimob/taro-design'
import Feild from '@wmeimob/taro-design/src/components/feild'
import { IMMFormInstance } from '@wmeimob/taro-design/src/components/form/const'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { FC, memo, RefObject } from 'react'
import GoodPrice from '../../../../../components/good/goodPrice'
import { systemConfig } from '../../../../../config'
import { goodsPriceProps } from '../../const'
import { useAmountInfo } from '../../hooks/useAmountInfo'
import useCouponGoodsItems from '../../hooks/useCouponGoodsItems'
import { useOrderActivity } from '../../hooks/useOrderActivity'
import { useScoreCellService } from '../../hooks/useScoreCellService'
import {
  checkedCouponNoAtom,
  orderCouponsInfo,
  showCouponPopAtom,
  showExchangeCouponPopAtom,
  showFreeShippingCouponNoAtom,
  showGiftCouponNoAtom
} from '../../store'
import CellTitle from '../cellTitle'
import GiftCell from '../giftCell'
import styles from './index.module.less'

interface IDiscountCellsProps {
  order: OrderCalculateResponse
  formRef: RefObject<IMMFormInstance<any>>
  onRefresh(): void
}

const Component: FC<IDiscountCellsProps> = (props) => {
  const { formRef, order, onRefresh } = props

  const activity = useOrderActivity({ activityList: order.marketingActivityList })
  const { giftCouponGoods } = useCouponGoodsItems(order)

  const { commonCoupons, exchangeCoupons, noFreightCoupons, presentCoupons } = useAtomValue(orderCouponsInfo)

  const canUseCoupon = !!commonCoupons?.length

  const [, setCouponVisible] = useAtom(showCouponPopAtom)
  const [checkedCouponNo] = useAtom(checkedCouponNoAtom)
  const setShowExchangeCouponPop = useSetAtom(showExchangeCouponPopAtom)
  const setShowFreeShippingCouponNo = useSetAtom(showFreeShippingCouponNoAtom)
  const setShowGiftCouponNo = useSetAtom(showGiftCouponNoAtom)

  const { couponAmount, memberDiscount, freeShippingDiscountAmount } = useAmountInfo(order)

  const scoreCell = useScoreCellService({ order, onRefresh })

  /* 输入可用积分 */
  function renderScoreCell() {
    const { score, disabled, visible, useable, maxCanInputScore, userAvailableScore, setScore, triggerVisible, validator, handleBlur } = scoreCell

    // 右侧显示部分的最大积分，不可用时固定显示 0
    const displayMaxCanInputScore = useable ? maxCanInputScore : 0

    const title = (
      <Text>
        当前积分<Text style={{ marginLeft: shopVariable.spacingSmall }}>{userAvailableScore}</Text>
      </Text>
    )

    return (
      <View>
        {visible && (
          <Cell title={<CellTitle title={title} />}>
            <Feild
              value={score}
              name="score"
              onChange={setScore}
              noStyle
              readonly={!useable}
              rules={[{ validate: validator }]}
              fieldProps={{
                maxlength: 10,
                type: 'number',
                disabled,
                placeholder: `可用${displayMaxCanInputScore}积分`,
                onBlur: handleBlur
              }}
            />
          </Cell>
        )}

        {!useable && (
          <Cell valueAlign="center" onClick={triggerVisible}>
            <View className={styles.scoreCell_visibleBar}>
              <Text>{visible ? '收起' : '已隐藏不可使用的虚拟资产'}</Text>
              <MMIconFont value={visible ? MMIconFontName.Up : MMIconFontName.Down} size={10} style={{ marginLeft: 5 }} />
            </View>
          </Cell>
        )}
      </View>
    )
  }

  return (
    <CellGroup title="优惠信息">
      {/* 满减满折活动 */}
      {activity.isShowFullMinusDiscount && (
        <Cell title={<CellTitle title="活动优惠" />} titleAlign="baseline">
          <View>
            {activity.activityCellsText.map((text, idx) => (
              <View className={styles.normalWeight} key={idx}>
                {text}
              </View>
            ))}
          </View>
        </Cell>
      )}

      {/* 满赠活动（多个） */}
      <GiftCell order={order} />

      {/* 包邮活动（多个） */}
      {activity.freeShippingActivityCellsText.map(({ name, discountAmount }, idx) => (
        <Cell title={<CellTitle title={<Text>包邮活动 <Text className={styles.giveText}>{name}</Text></Text>}/>} key={idx}>
          {discountAmount}
        </Cell>
      ))}

      {/* 优惠券 */}
      <Cell title={<CellTitle title="优惠券" />} arrow={canUseCoupon} onClick={() => canUseCoupon && setCouponVisible(true)}>
        {!canUseCoupon ? (
          <Text className={styles.normalWeight}>当前无可用优惠券</Text>
        ) : checkedCouponNo === 'NOSELECT' ? (
          <Text className={styles.normalWeight}>本次不使用优惠券</Text>
        ) : (
          <GoodPrice value={couponAmount} prefix="-" {...goodsPriceProps} />
        )}
      </Cell>

      {/* 兑换券 */}
      {!!exchangeCoupons.length && (
        <Cell title={<CellTitle title="兑换券" />} arrow onClick={() => setShowExchangeCouponPop(true)}>
          {activity.exchangeCouponText || `${exchangeCoupons.length}张兑换券可用`}
        </Cell>
      )}

      {/* 赠品券 */}
      {!!presentCoupons.length && (
        <Cell title={<CellTitle title="赠品券" />} arrow onClick={() => setShowGiftCouponNo(true)}>
          {giftCouponGoods?.goodsName || `${presentCoupons.length}张赠品券可用`}
        </Cell>
      )}

      {/* 免邮券 */}
      {!!noFreightCoupons.length && (
        <Cell title={<CellTitle title="免邮券" />} arrow onClick={() => setShowFreeShippingCouponNo(true)}>
          {activity.freeShippingCouponText || `${noFreightCoupons.length}张免邮券可用`}
        </Cell>
      )}

      {/* 会员减免 */}
      {!!memberDiscount && (
        <Cell title={<CellTitle title="会员减免" />}>
          <GoodPrice value={memberDiscount} prefix="-" {...goodsPriceProps} />
        </Cell>
      )}

      <Divider style={{ margin: `${shopVariable.spacingLarge / 2}px ${shopVariable.spacingLarge}px` }} />

      {/* 使用积分抵扣 */}
      <MMForm ref={formRef}>{systemConfig.config.enableScore && renderScoreCell()}</MMForm>
    </CellGroup>
  )
}

const DiscountCells = memo(Component)
export default DiscountCells
