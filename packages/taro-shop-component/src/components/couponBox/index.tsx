import Taro from '@tarojs/taro'
import { memo, FC } from 'react'
import { ICouponBoxProps } from './const'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import CouponItem from '../couponItem'
import { useAtomValue } from 'jotai'
import useGlobalStore, { isLoginAtom } from '../../globalStore'
import { routeNames } from '../../routes'
import { navByLink } from '../pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

const Component: FC<ICouponBoxProps> = (props) => {
  const { data, couponVisible, onClose, onReceiveCoupon } = props

  const { isLogin } = useGlobalStore()

  return (
    <MMPopup visible={couponVisible} onClose={onClose} title="优惠券" titleAlign="center" backgroundColor="#f5f5f5">
      {data.map((item) => {
        const { receiveNum = 0, memberLimit = 0, stock = 0 } = item
        let rightText = ''
        let disabled = !stock || memberLimit <= 0

        if (disabled) {
          rightText = receiveNum > 0 ? '已领取' : '已领完'
        } else {
          disabled = receiveNum >= memberLimit
          rightText = disabled ? '已领取' : '立即领取'
        }
        return (
          <CouponItem
            key={item.id}
            data={item}
            rightText={rightText}
            disabled={disabled}
            onClickRight={() => {
              if (!isLogin) {
                return Taro.navigateTo({ url: routeNames.auth })
              }
              onReceiveCoupon?.(item)
            }}
          />
        )
      })}
    </MMPopup>
  )
}

const CouponBox = memo(Component)
export default CouponBox
