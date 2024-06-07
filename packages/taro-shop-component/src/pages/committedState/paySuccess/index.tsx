import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo } from 'react'
import { Image, Text, View } from '@tarojs/components'
import styles from './index.module.less'
import { IPaySuccessProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMButton from '@wmeimob/taro-design/src/components/button'
import iconSuccess from './images/icon_success.png'
import { routeNames } from '../../../routes'
import AdvertSwiper from '../../../components/advertSwiper'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

const Component: FC<IPaySuccessProps> = () => {
  const { params = {} } = useRouter()

  function handleToOrder() {
    navByLink(EJumpType.RedirectTo, {
      url: routeNames.orderOrderDetail,
      params: { orderNo: params.orderNo }
    })
    // Taro.redirectTo({
    //   url: routeNames.orderOrderDetail,
    //   params: { orderNo: params.orderNo }
    // })
  }

  return (
    <View className={styles.paySuccessStyle}>
      <MMNavigation title="支付完成" />

      <View className={styles.wrap}>
        <View className={styles.flexC}>
          <Image src={iconSuccess} className={styles.icon_success} />
        </View>

        <View className={`${styles.flexC} ${styles.text}`}>
          <Text className={styles.subText}>-</Text>
          支付成功!
          <Text className={styles.subText}>-</Text>
        </View>

        <View className={styles.ModalBtn}>
          <View className={styles.flex}>
            <MMButton
              onClick={() => {
                Taro.navigateTo({ url: routeNames.goodsGoodsList })
              }}
              text="继续逛逛"
              type="default"
              radius={21}
              style={{ width: '132px', lineHeight: '20px' }}
            />
            <View className="spacing" />
            <MMButton noBorder={true} onClick={handleToOrder} text="查看订单" radius={21} style={{ width: '132px', lineHeight: '20px' }} />
          </View>
        </View>
      </View>

      <AdvertSwiper type="PaySuccess" />
    </View>
  )
}

const PaySuccess = memo(Component)
export default PaySuccess
