import { View } from '@tarojs/components'
import { OrderCalculateResponse } from '@wmeimob/taro-api'
import { Cell, Divider } from '@wmeimob/taro-design'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import { FC, memo } from 'react'
import { useAmountInfo } from '../../hooks/useAmountInfo'
import styles from './index.module.less'

interface IAmountCellsProps {
  order: OrderCalculateResponse
}

const Component: FC<IAmountCellsProps> = (props) => {
  const { order } = props

  const amount = useAmountInfo(order)

  return (
    <View className={styles.amountCellsStyle}>
      <Cell title="商品总额">{mmCurrenty(amount.goodsAmount)}</Cell>

      {!!amount.realFreightAmount && <Cell title="运费">{mmCurrenty(amount.realFreightAmount)}</Cell>}

      {!!amount.deductionActivityDiscountAmount && <Cell title="活动优惠">{mmCurrenty(-amount.deductionActivityDiscountAmount)}</Cell>}

      {!!amount.couponAmount && <Cell title="优惠券">{mmCurrenty(-amount.couponAmount)}</Cell>}

      {!!amount.exchangeCouponDiscountAmount && <Cell title="兑换券">-{mmCurrenty(amount.exchangeCouponDiscountAmount)}</Cell>}

      {!!amount.memberDiscount && <Cell title="会员折扣">{mmCurrenty(-amount.memberDiscount)}</Cell>}

      {!!amount.freeShippingDiscountAmount && <Cell title="包邮活动">{mmCurrenty(-amount.freeShippingDiscountAmount)}</Cell>}

      {!!amount.freeShippingCouponDiscountAmount && <Cell title="免邮券">-{mmCurrenty(amount.freeShippingCouponDiscountAmount)}</Cell>}

      {!!amount.scoreDiscountAmount && <Cell title="积分抵扣">{mmCurrenty(-amount.scoreDiscountAmount)}</Cell>}

      <Divider style={{ margin: `${shopVariable.spacingLarge / 2}px ${shopVariable.spacingLarge}px` }} />

      <Cell>合计：{mmCurrenty(amount.payAmount)}</Cell>
    </View>
  )
}

const AmountCells = memo(Component)
export default AmountCells
