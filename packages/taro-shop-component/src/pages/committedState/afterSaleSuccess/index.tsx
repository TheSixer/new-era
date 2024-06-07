import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo } from 'react'
import { Image, Text, View } from '@tarojs/components'
import styles from './index.module.less'
import { IAfterSaleSuccessProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMButton from '@wmeimob/taro-design/src/components/button'
import iconSuccess from './images/icon_success.png'
import { routeNames } from '../../../routes'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { ERouterType } from '@wmeimob-modules/decoration-data/src/enums/ERouterType'

const Component: FC<IAfterSaleSuccessProps> = () => {
  const { params } = useRouter()

  function back() {
    Taro.navigateBack({ delta: 2 })
  }

  function toDetail() {
    navByLink(EJumpType.RedirectTo, { url: routeNames.orderAftersalesDetail, params: { refundNo: params.refundNo } })
    // Taro.redirectTo({ url: routeNames.orderAftersalesDetail, params: { refundNo: params.refundNo } })
  }

  return (
    <View className={styles.afterSaleSuccessStyle}>
      <MMNavigation
        title="申请成功"
        beforeNavBack={() => {
          back()
          return false
        }}
      />
      <View className={styles.wrap}>
        <View className={styles.flexC}>
          <Image src={iconSuccess} className={styles.icon_success} />
        </View>
        <View className={`${styles.flexC} ${styles.text}`}>
          <Text className={styles.subText}>-</Text>
          提交成功!
          <Text className={styles.subText}>-</Text>
        </View>
        {/* <View className={styles.success_text}>您的售后申请已提交，请耐心等待审核~</View> */}
        <View className={styles.ModalBtn}>
          <View className={styles.flex}>
            <MMButton
              onClick={() => {
                back()
              }}
              backGround="background: #F6F6F6;"
              text="返回"
              type="default"
              radius={21}
              style={{ width: '132px', lineHeight: '20px' }}
            />
            <View className="spacing" />
            <MMButton noBorder onClick={() => toDetail()} text="查看售后状态" radius={21} style={{ width: '132px', lineHeight: '20px' }} />
          </View>
        </View>
      </View>
    </View>
  )
}

const CommentSuccess = memo(Component)
export default CommentSuccess
