import { FC, memo, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import useTabbar, { IMMTabBarData } from '../store'
import classNames from 'classnames'
import { useGlobalStore } from '../../globalStore'
import { isNewIphone } from '@wmeimob/taro-design/src/components/utils'
import MMBadgeTabbar from '../badgeTabbar'
import { noLoginRoutes } from '../../config'
import { authorizationLogin } from '../../utils/authorizationLogin'
import { setSilentAuthorization } from '../../request/instance'

interface ITabBarProps {}

const Component: FC<ITabBarProps> = (props) => {
  const { data } = useTabbar()

  const { isLogin, getUserAction } = useGlobalStore()

  const currentIndex = useMemo(() => {
    const route = Taro.getCurrentPages()[0].route
    // 不能写  === 小程序和h5 得到的url 不一样。
    return data.findIndex((item) => route?.includes(item.url.replace('/', '')))
  }, [])

  function getClassName(index) {
    return classNames(styles.item, currentIndex === index ? styles.selected : {})
  }

  const handleBeforeClick = async (index) => {
    // 如果没登录还需要授权
    if (!isLogin && !noLoginRoutes.includes(data[index].url)) {
      // 尝试静默授权
      setSilentAuthorization(true)
      await getUserAction()
      setSilentAuthorization(false)

      // 静默授权失败
      if (!Taro.getStorageSync('token')) {
        authorizationLogin(false)
        return false
      }
      return true
    }

    return true
  }

  async function handleClick({ url }: IMMTabBarData, index: number) {
    if (await handleBeforeClick(index)) {
      Taro.switchTab({ url })
    }
  }

  return (
    <View className={styles.MMTabBar}>
      <View className={styles.content}>
        {data.map((value, index) => {
          return (
            <View key={value.url + index} className={getClassName(index)} onClick={() => handleClick(value, index)}>
              <View className={styles.iconfont}>
                <View
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${value.image})`,
                    visibility: currentIndex === index ? 'hidden' : 'initial',
                    position: currentIndex === index ? 'absolute' : 'relative'
                  }}
                />
                <View
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${value.imageSelected})`,
                    visibility: currentIndex === index ? 'initial' : 'hidden',
                    position: currentIndex === index ? 'relative' : 'absolute'
                  }}
                />
                {!!data[index].redHot && <MMBadgeTabbar absolute dot />}
                {!!data[index].count && (
                  <View className={styles.count}>
                    <MMBadgeTabbar value={data[index].count} absolute />
                  </View>
                )}
              </View>
              <View className={styles.text}>{value.text}</View>
            </View>
          )
        })}
      </View>
      {isNewIphone && <View style={{ height: 34 }} />}
    </View>
  )
}

const TabBar = memo(Component)
export default TabBar
