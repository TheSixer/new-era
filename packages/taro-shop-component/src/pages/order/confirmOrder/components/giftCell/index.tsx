import { View } from '@tarojs/components'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { OrderCalculateResponse } from '@wmeimob/taro-api'
import { Card, Cell } from '@wmeimob/taro-design'
import { ICellProps } from '@wmeimob/taro-design/src/components/cell/const'
import { FC, memo, useMemo } from 'react'
import CellTitle from '../cellTitle'
import GiveGood from '../giveGood'
import styles from './index.module.less'

interface IGiftCellProps {
  order: OrderCalculateResponse

  /**
   * 是否显示活动相关cell
   */
  showGift?: boolean

  cellProps?: ICellProps
}

const Component: FC<IGiftCellProps> = (props) => {
  const { order, showGift = true, cellProps } = props

  const { giftItemList = [] } = order

  // 满赠活动
  const activities = useMemo(
    () => (order.marketingActivityList || []).filter((item) => item.marketingType === EActivityType.Presented),
    [order.marketingActivityList]
  )

  // 是否没有赠送商品。 (当赠品下架时)
  const inValidGift = showGift && !!activities.length && !giftItemList.length

  return (
    <>
      {activities.map((item) => (
        <Cell title={<CellTitle title="活动优惠" />} key={item.relNo} titleAlign="baseline" {...cellProps}>
          <View className={styles.normalWeight}>
            <View>{item.relName}</View>
            {inValidGift && <View className={styles.giveTip}>*该赠品已下架，请确认支付</View>}
          </View>
        </Cell>
      ))}

      {showGift &&
        giftItemList.map((item) => (
          <Card key={item.goodsId}>
            <GiveGood data={item} />
          </Card>
        ))}
    </>
  )
}

const GiftCell = memo(Component)
export default GiftCell
