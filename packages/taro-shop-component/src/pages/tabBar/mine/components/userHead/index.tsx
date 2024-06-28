import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import styles from './index.module.less'
import { IUserHeadProps } from './const'
import MMAvatar from '@wmeimob/taro-design/src/components/avatar'
import { View } from '@tarojs/components'
import { routeNames } from '../../../../../routes'
import useGlobalStore from '../../../../../globalStore'
import { ArrowFilled } from '../../../../../components/Icons'

// const { enableSignTask } = systemConfig.config

const Component: FC<IUserHeadProps> = () => {
  const { user, isLogin } = useGlobalStore()

  // const desensitizationMobile = useMemo(() => (user.mobile ? user.mobile.replace(/(\d{3})(\d+)(\d{4})/, '$1****$3') : '授权手机号'), [user.mobile])

  // 点击头像部分
  const handleClick = () => {
    if (!user.mobile) {
      Taro.navigateTo({ url: routeNames.auth })
    } else if (!user.registerIs) {
      Taro.navigateTo({ url: routeNames.webAuth })
    } else {
      Taro.navigateTo({ url: routeNames.minePersonal })
    }
  }

  return (
    <View className={styles.userHeadStyle}>
      <MMAvatar src={user.headImg || ''} size={50} shape="circle" onClick={handleClick} />

      {!isLogin && (
        <View className={styles.noAuth} onClick={handleClick}>
          <View className={styles.auth}>登录NEW ERA会员</View>
          {/* <MMIconFont value={MMIconFontName.Next} size={14} color="#ffffff" /> */}
        </View>
      )}

      {isLogin && (
        <>
          <View className={styles.userInfo} onClick={handleClick}>
            <View className={styles.nickName}>{user.nickName}</View>

            {/* {enableSignTask && (
              <View
                className={styles.signButton}
                onClick={(ev) => {
                  ev.stopPropagation()
                  Taro.navigateTo({ url: routeNames.taskCenterSignTask })
                }}
              >
                <SignButton />
              </View>
            )} */}

            {/* 手机号 */}
            {/* <View className={styles.info}>
              <View className={classNames(styles.info_item, styles.mobil)}>
                <Image src={iconMobile} className={styles.info_item_icon} />
                {desensitizationMobile}
              </View>
            </View> */}

            <View className={styles.info}>
              <View className={styles.info_item} style={{textDecoration: 'underline'}}>
                完善个人信息
                <ArrowFilled />
              </View>
            </View>
          </View>

          {/* {!enableSignTask && <MMIconFont value={MMIconFontName.Next} size={14} color="#ffffff" />} */}
        </>
      )}
    </View>
  )
}

Component.displayName = 'UserHead'

const UserHead = memo(Component)
export default UserHead
