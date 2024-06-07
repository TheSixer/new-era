import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.less'
import { ICommentSuccessProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMButton from '@wmeimob/taro-design/src/components/button'
import iconSuccess from './images/icon_success.png'
import { routeNames } from '../../../routes'
import { ECommentType } from '../../../enums/comment/ECommentType'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

const Component: FC<ICommentSuccessProps> = () => {
  function toDetail() {
    navByLink(EJumpType.RedirectTo, { url: routeNames.orderCommentCenter, params: { tabid: ECommentType.Done } })
    // Taro.redirectTo({ url: routeNames.orderCommentCenter, params: { tabid: ECommentType.Done } })
  }

  return (
    <View className={styles.commentSuccessStyle}>
      <MMNavigation title="评价" />
      <View className={styles.wrap}>
        <View className={styles.flexC}>
          <Image src={iconSuccess} className={styles.icon_success} />
        </View>
        <View className={`${styles.flexC} ${styles.text}`}>
          <Text className={styles.subText}>-</Text>
          发布成功！审核通过后将展示
          <Text className={styles.subText}>-</Text>
        </View>
        <View className={styles.ModalBtn}>
          <View className={styles.flex}>
            <MMButton
              onClick={() => Taro.navigateBack()}
              text="继续逛逛"
              type="default"
              radius={21}
              style={{ width: '132px', lineHeight: '20px' }}
              backGround="
background: #F6F6F6;"
            />
            <View className="spacing" />
            <MMButton noBorder onClick={() => toDetail()} text="查看评价" radius={21} style={{ width: '132px', lineHeight: '20px' }} />
          </View>
        </View>
      </View>
    </View>
  )
}

const CommentSuccess = memo(Component)
export default CommentSuccess
