import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import styles from './index.module.less'
import { ICouponCenterProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import CouponItem from '../../../components/couponItem'
import { CouponTemplateVo, api } from '@wmeimob/taro-api'
import { Button, PageContainer, useToast } from '@wmeimob/taro-design'
import { getCouponOperationText } from '../../../utils/coupon'
import { View } from '@tarojs/components'
import { isNewIphone } from '@wmeimob/taro-design/src/components/utils'
import icon_empty from '../images/icon_empty.png'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'

const Component: FC<ICouponCenterProps> = () => {
  const [toast] = useToast()
  const [info, pullToRefresh] = useMMPullToRefresh({
    getData: (pa) => api['/wechat/web/memCoupon/getAvailableCoupon_GET'](pa as any)
  })

  const [handleReceiveCoupon] = useSuperLock(async (coupon: CouponTemplateVo) => {
    const { templateNo = '', receiveNum = 0, stock } = coupon
    toast?.loading()
    try {
      await api['/wechat/web/memCoupon/receive_GET']({ templateNo })

      const newCoupon = { ...coupon, stock: stock! - 1, receiveNum: receiveNum + 1 }
      info.updateLisItem(newCoupon, 'templateNo')
      const { receivedStock } = getCouponOperationText(newCoupon)
      toast?.message('领取成功!' + (receivedStock ? `还可领取${receivedStock}张` : ''))
    } catch (error) {}
    toast?.hideLoading()
  })

  return (
    <PageContainer className={styles.couponCenterStyle}>
      <MMNavigation title="领券中心" />

      <MMPullToRefresh {...pullToRefresh} empty={info.isEmpty && <MMEmpty src={icon_empty} imgStyle={{ width: 160, height: 160 }} fixed />}>
        <View className={styles.content}>
          {info.list.map((item) => {
            const { disabled, rightText } = getCouponOperationText(item)
            return (
              <CouponItem
                data={item}
                key={item.id}
                rightText={rightText}
                disabled={disabled}
                onClickRight={() => {
                  handleReceiveCoupon(item)
                }}
              />
            )
          })}
        </View>
      </MMPullToRefresh>
    </PageContainer>
  )
}

const CouponCenter = memo(Component)
export default CouponCenter
