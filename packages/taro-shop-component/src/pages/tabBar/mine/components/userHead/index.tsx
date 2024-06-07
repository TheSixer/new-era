import Taro from '@tarojs/taro'
import { FC, memo, useMemo } from 'react'
import styles from './index.module.less'
import { IUserHeadProps } from './const'
import MMAvatar from '@wmeimob/taro-design/src/components/avatar'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import { Image, Text, View } from '@tarojs/components'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import { routeNames } from '../../../../../routes'
import useGlobalStore from '../../../../../globalStore'
import classNames from 'classnames'
import iconMobile from './images/icon_mobile.png'
import iconBirthday from './images/icon_birthday.png'
import { systemConfig } from '../../../../../config'
import SignButton from '@wmeimob-modules/task-taro/src/components/signButton'
import { navByLink } from '../../../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

const { enableSignTask } = systemConfig.config

const Component: FC<IUserHeadProps> = () => {
  const { user, isLogin } = useGlobalStore()

  const desensitizationMobile = useMemo(() => (user.mobile ? user.mobile.replace(/(\d{3})(\d+)(\d{4})/, '$1****$3') : '授权手机号'), [user.mobile])

  // 点击头像部分
  const handleClick = () => {
    if (!user.mobile) {
      navByLink(EJumpType.None, {})
      // return Taro.navigateTo({ url: routeNames.auth })
    }

    Taro.navigateTo({ url: routeNames.minePersonal })
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

            {enableSignTask && (
              <View
                className={styles.signButton}
                onClick={(ev) => {
                  ev.stopPropagation()
                  Taro.navigateTo({ url: routeNames.taskCenterSignTask })
                }}
              >
                <SignButton />
              </View>
            )}

            <View className={styles.info}>
              {/* 手机号 */}
              <View className={classNames(styles.info_item, styles.mobil)}>
                <Image src={iconMobile} className={styles.info_item_icon} />
                {desensitizationMobile}
              </View>

              {/* 生日 */}
              {user.birthday && (
                <View className={classNames(styles.info_item, styles.birthday)}>
                  <Image src={iconBirthday} className={styles.info_item_icon} />
                  {user.birthday}
                </View>
              )}
            </View>
          </View>

          {!enableSignTask && <MMIconFont value={MMIconFontName.Next} size={14} color="#ffffff" />}
        </>
      )}
    </View>
  )
}

Component.displayName = 'UserHead'

const UserHead = memo(Component)
export default UserHead
