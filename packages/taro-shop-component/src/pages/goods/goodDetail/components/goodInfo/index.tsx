import { Image, Text, View } from '@tarojs/components'
import { EGoodsTagKey } from '@wmeimob-modules/goods-data/src/enums/EGoodsTagKey'
import MemberDiscountTag from '@wmeimob-modules/goods-taro/src/components/tags/memberDiscountTag'
import { EActivityStep } from '@wmeimob/shop-data/goods/enums/EActivityStep'
import classNames from 'classnames'
import { memo, useContext, useMemo, FC } from 'react'
import shareImg from '../../../../../assets/images/goodDetail/share.png'
import GoodPrice from '../../../../../components/good/goodPrice'
import GoodDetailContext from '../../context'
import { useCountdownActivity } from '../../store'
import MarketingActivitys from '../marketingActivitys'
import RecevieCouponCell from '../recevieCouponCell'
import { IGoodInfoProps } from './const'
import styles from './index.module.less'

const Component: FC<IGoodInfoProps> = (props) => {
  const { data = {} } = props
  const { handleShareClick } = useContext(GoodDetailContext)

  const sales = useMemo(() => (data.actualSales ?? 0) + (data.customStartSales ?? 0), [data.actualSales, data.customStartSales]) // 销量 实际销量 + 虚拟销量

  const { earlyIsFlashSale, earlyActivity } = useCountdownActivity()

  const memberTag = data.goodsTagList?.some((item) => item.tagKey === EGoodsTagKey.memberDiscount) && <MemberDiscountTag />

  return (
    <View className={styles.goodInfoStyle}>
      {/*  价格 */}
      <View className={styles.salePriceBox}>
        <GoodPrice value={data.salePrice!} fontSize={[24, 14]} />

        {!!data.marketPrice && (
          <View className={styles.marketPrice}>
            <GoodPrice value={data.marketPrice!} color="#999" fontSize={12} blod={false} lineThrough />
          </View>
        )}

        <View className={styles.saled}>销量:&nbsp;{sales}</View>
      </View>

      {/* 商品名称 */}
      <View className={styles.goodsNameBox}>
        <View className={classNames(styles.goodsName, 'text-over-flow-2')}>
          {/* 限时抢购进行中时不显示会员减免标记 */}
          {!earlyIsFlashSale && earlyActivity?.activityStep !== EActivityStep.InProgress && memberTag}
          <Text>{data.goodsName}</Text>
        </View>

        <View className={styles.share}>
          <Image src={shareImg} style={{ width: 20, height: 20 }} onClick={handleShareClick} />
          <View>分享</View>
        </View>
      </View>

      {/* 活动 */}
      <MarketingActivitys />

      {/* 领券 */}
      <RecevieCouponCell data={props.coupons} onClick={props.onShowCoupon} />
    </View>
  )
}

const GoodInfo = memo(Component)
export default GoodInfo
