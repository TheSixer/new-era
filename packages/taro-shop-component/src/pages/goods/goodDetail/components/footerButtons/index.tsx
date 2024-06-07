import { FC, memo } from 'react'
import { Text, View } from '@tarojs/components'
import styles from './index.module.less'
import { useCountdownActivity } from '../../store'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { useCheckUserStatus, useGlobalStore } from '../../../../../globalStore'
import dayjs from 'dayjs'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { EActivityStep } from '@wmeimob/shop-data/goods/enums/EActivityStep'
import { navByLink } from '../../../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'
import classNames from 'classnames'
import { authorizationLogin } from '../../../../../utils/authorizationLogin'

type TFooterButtonType = EActivityType | 'normal'

interface IFooterButtonsProps {
  /** 指定显示类型 */
  type?: TFooterButtonType
  disabled?: boolean
  showCart?: boolean
  onBuy?(): void
  onAddCart?(): void
}

const Component: FC<IFooterButtonsProps> = (props) => {
  const { type, disabled, showCart = false } = props

  const { user } = useGlobalStore()
  const checkUserStatus = useCheckUserStatus()

  const { earlyActivity } = useCountdownActivity()

  async function handleBuy(cart = false) {
    await checkUserStatus.check()

    if (!user.mobile) {
      authorizationLogin(false)
      return
    }

    cart ? props.onAddCart?.() : props.onBuy?.()
  }

  switch (type) {
    case EActivityType.PreSale: {
      return (
        <View className={styles.btnBox}>
          <MMButton className={styles.footBar_button} onClick={() => handleBuy()} type={MMButtonType.h5Red} disabled={disabled}>
            <Text>立即购买（{earlyActivity ? dayjs(earlyActivity.shippingTime).format('YYYY年MM月DD日') : ''}后发货）</Text>
          </MMButton>
        </View>
      )
    }

    case EActivityType.FlashSale: {
      const canBuy = earlyActivity?.activityStep === EActivityStep.InProgress

      return (
        <View className={styles.btnBox}>
          <MMButton type={MMButtonType.h5Red} className={styles.footBar_button} onClick={() => handleBuy()} disabled={disabled || !canBuy}>
            立即购买
          </MMButton>
        </View>
      )
    }

    // 常规
    case 'normal': {
      return (
        <View className={styles.btnBox} style={{ justifyContent: 'flex-end' }}>
          <MMButton
            className={classNames(styles.footBar_button, styles.noPadding, showCart && styles.w100)}
            disabled={disabled}
            type="warning"
            noBorder={true}
            onClick={() => handleBuy(true)}
          >
            加入购物车
          </MMButton>

          <MMButton
            type={MMButtonType.h5Red}
            className={classNames(styles.footBar_button, styles.noPadding, showCart && styles.w100)}
            disabled={disabled}
            onClick={() => handleBuy()}
          >
            立即购买
          </MMButton>
        </View>
      )
    }

    default:
      return null
  }
}

const FooterButtons = memo(Component)
export default FooterButtons
