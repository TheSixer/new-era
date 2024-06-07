import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { ICouponHistoryProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import CouponItem from '../../../components/couponItem'
import { api } from '@wmeimob/taro-api'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { MCouponUseStatus, ECouponUseStatus } from '../../../enums/coupon/ECouponUseStatus'

const Component: FC<ICouponHistoryProps> = () => {
  const [info, pullToRefresh] = useMMPullToRefresh({
    getData: pa => api['/wechat/web/memCoupon/myHistory_GET'](pa as any)
  })

  return (
    <View className={styles.couponHistoryStyle}>
      <MMNavigation title="历史优惠券" />

      <MMPullToRefresh {...pullToRefresh} empty={info.isEmpty && <MMEmpty type="record" text="暂无历史优惠券" fixed />}>
        {info.list.map(item => {
          // 未使用的优惠券等同于已过期
          const rightText = item.useStatus === ECouponUseStatus.NotUse ? MCouponUseStatus[ECouponUseStatus.OutDate] : MCouponUseStatus[item.useStatus!]
          return <CouponItem data={item} key={item.id} disabled rightText={rightText} />
        })}
      </MMPullToRefresh>
    </View>
  )
}

const CouponHistory = memo(Component)
export default CouponHistory
