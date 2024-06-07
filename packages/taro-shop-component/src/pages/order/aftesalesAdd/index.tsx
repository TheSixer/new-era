import Taro, { useDidShow } from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { IAftesalesAddProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { routeNames } from '../../../routes'
import MMCard from '@wmeimob/taro-design/src/components/card'
import OrderGood from '../../../components/order/orderGood'
import icon_1 from './images/icon_1.png'
import icon_2 from './images/icon_2.png'
import { useAtom } from 'jotai'
import { aftersalesGoodsInfoAtom } from '../store'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import { ERefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'

const Component: FC<IAftesalesAddProps> = () => {
  const [afterInfo, setAfterInfo] = useAtom(aftersalesGoodsInfoAtom) // 申请售后的商品

  useDidShow(() => {
    if (!afterInfo) {
      Taro.navigateBack()
    }
  })

  function handleRefuseClick(refundType: ERefundType) {
    setAfterInfo((pre) => ({ ...pre!, refundType }))
    Taro.navigateTo({ url: routeNames.orderAfterRefund })
  }

  return (
    <View className={styles.aftesalesAddStyle}>
      <MMNavigation title="申请售后" />
      <View className="spacing" />

      {afterInfo && (
        <MMCard>
          {afterInfo.afterOrderGoods.map((orderGoods, idx) => (
            <OrderGood className={styles.goods} data={orderGoods} key={idx} showPrice={false} showMarketPrice={false} />
          ))}
        </MMCard>
      )}

      <View className="spacing" />

      <MMCellGroup>
        <MMCell
          icon={<Image className={styles.icon} src={icon_1} />}
          title={
            <View>
              <View className={styles.title}>仅退款</View>
              <View className={styles.subTitle}>未收到货，或与客服协商同意仅退款</View>
            </View>
          }
          arrow
          onClick={() => handleRefuseClick(ERefundType.Refund)}
        />
      </MMCellGroup>

      {afterInfo && !afterInfo.isUnshipped && (
        <>
          <View className="spacing" />
          <MMCellGroup>
            <MMCell
              icon={<Image className={styles.icon} src={icon_2} />}
              title={
                <View>
                  <View className={styles.title}>退货退款</View>
                  <View className={styles.subTitle}>已收到货，需要退还商品</View>
                </View>
              }
              arrow
              onClick={() => handleRefuseClick(ERefundType.Every)}
            />
          </MMCellGroup>
        </>
      )}

      <View className="spacing" />
    </View>
  )
}

const Aftesales = memo(Component)
export default Aftesales
