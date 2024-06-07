import Taro from '@tarojs/taro'
import { EActivityStep } from '@wmeimob/shop-data/goods/enums/EActivityStep'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import { FC, memo } from 'react'
import useGoodsSkuPopup from '../../../../../hooks/goods/useGoodsSkuPopup'
import { GoodsVO } from '@wmeimob/taro-api'
import { useCountdownActivity } from '../../store'
import FooterBarNormal from '../footerBarNormal'
import home_icon from '../../images/home_icon.png'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { routeNames } from '../../../../../routes'
import FooterButtons from '../footerButtons'
import FootOperation from '../../../../../components/footOperation'
import { View } from '@tarojs/components'
import styles from './index.module.less'

interface IFooterBarProps {
  goods: GoodsVO
  cartCount?: number
  isCollection?: boolean
  showCart?: boolean
  onOpenSku: ReturnType<typeof useGoodsSkuPopup>['open']
  onCollection(): Promise<void>
}

const Component: FC<IFooterBarProps> = (props) => {
  const { goods, cartCount, onOpenSku, isCollection = false, onCollection,showCart= false } = props

  const { inFlashSale, earlyActivity, earlyIsPreSale } = useCountdownActivity()

  // 预售活动商品详情页，不需要显示其他活动的倒计时
  // 未开始的预售活动，隐藏按钮
  // 结束的预售活动，会直接下架
  if (earlyIsPreSale) {
    return earlyActivity?.activityStep === EActivityStep.InProgress ? (
      <MMFixFoot dynamic>
        <View className={styles.buttons}>
          <FootOperation src={home_icon} text="首页" onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })} />
          <View className="spacingBig" style={{ flex: 'none' }} />
          <FooterButtons type={EActivityType.PreSale} onBuy={() => onOpenSku(goods)} />
        </View>
      </MMFixFoot>
    ) : null
  }

  // 处于进行中的限时抢购 或 【未开始的限时抢购 且没有其他常规活动】
  if (inFlashSale) {
    return (
      <MMFixFoot dynamic>
        <View className={styles.buttons}>
          <FootOperation src={home_icon} text="首页" onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })} />
          <View className="spacingBig" style={{ flex: 'none' }} />
          <FooterButtons type={EActivityType.FlashSale} disabled={earlyActivity?.activityStep !== EActivityStep.InProgress} onBuy={() => onOpenSku(goods)} />
        </View>
      </MMFixFoot>
    )
  }

  return (
    <MMFixFoot dynamic border>
      <FooterBarNormal
        isCollection={isCollection}
        handleCollect={onCollection}
        onBuy={() => onOpenSku(goods, 'open')}
        onAddCart={() => onOpenSku(goods, 'open')}
        cartCount={cartCount}
        showCart={showCart}
      />
    </MMFixFoot>
  )
}

const FooterBar = memo(Component)
export default FooterBar
