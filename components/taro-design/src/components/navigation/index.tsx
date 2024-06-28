import { View } from '@tarojs/components'
import { FC, memo, PropsWithChildren, useMemo } from 'react'
import Taro, { getCurrentInstance, getCurrentPages, getMenuButtonBoundingClientRect, getSystemInfoSync } from '@tarojs/taro'
import classnames from 'classnames'
import MMIconFont from '../icon-font'
import styles from './index.modules.less'
import MMIconFontName from '../icon-font/const'
import { IMMNavigationProps, MMNavigationType } from './const'
import { isH5, isWebApp } from '../../../../taro-pages/src/config'

const isWeapp = process.env.TARO_ENV === 'weapp'
// h5暂时不支持 API getMenuButtonBoundingClientRect, 模拟导航栏iphone6/7/8固定高度
const statusBarHeight = isWeapp ? getSystemInfoSync().statusBarHeight : 20

const menuButtonBoundingClientRect = isWeapp
  ? getMenuButtonBoundingClientRect()
  : {
      bottom: 56,
      height: 32,
      left: 278,
      right: 365,
      top: 24,
      width: 87
    }

const stateHeigth = (menuButtonBoundingClientRect.top - statusBarHeight) * 2 + menuButtonBoundingClientRect.height

export const navigationHeight = isWeapp ? stateHeigth + statusBarHeight : stateHeigth

const Component: FC<PropsWithChildren<IMMNavigationProps>> = (props) => {
  const { title, place = true, shadow = true, type = MMNavigationType.Default, renderLeft, beforeNavBack } = props

  const rootStyle = useMemo(
    () => ({
      height: !place ? 0 : `${navigationHeight}px`,
      borderBottom: place ? '0.5px solid transparent' : 'unset',
      ...props.style
    }),
    [place, props.style]
  )

  const className = useMemo(() => {
    return classnames(
      styles.fixed,
      {
        [MMNavigationType.Transparent]: styles.fixed__transparent,
        [MMNavigationType.Primary]: styles.fixed__primary
      }[type],
      props.contentClass
    )
  }, [type, props.contentClass])

  async function hanldeNavBack() {
    let result = true
    if (beforeNavBack) {
      result = await beforeNavBack()
    }
    if (result) {
      const { router } = getCurrentInstance()
      // 如果是嵌套,去调用新方法
      const { redirectUrl = '', isTabber = false } = router.params
      if (redirectUrl && isTabber === 'true') {
        Taro.switchTab({ url: redirectUrl })
      } else {
        Taro.navigateBack({ delta: 1 })
      }
    }
  }

  // 判断是否是h5来增加返回按钮
  const getCanGoBack = () => {
    const { router } = getCurrentInstance()
    const { isTabber = false } = router.params
    let length: Number
    if (process.env.TARO_ENV === 'h5') {
      length = window.history.length
    } else {
      length = getCurrentPages().length
    }
    return length > 1 || isTabber
  }
  const renderGoBack = () => {
    return (
      <View className={styles.goback} onClick={hanldeNavBack}>
        <MMIconFont color={type === MMNavigationType.Default ? undefined : 'white'} value={MMIconFontName.Back} />
      </View>
    )
  }

  return (
    <View className={classnames(styles.MMNavigation, props.className)} style={rootStyle}>
      <View
        className={className}
        style={{
          zIndex: 1000,
          boxShadow: shadow && type !== MMNavigationType.Transparent ? styles.boxShadow : 'none',
          paddingTop: isWeapp ? `${statusBarHeight}px` : 0,
          ...props.contentStyle
        }}
      >
        <View className={styles.content} style={{ height: `${stateHeigth}px` }}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {renderLeft === false ? null : renderLeft ? <View className={styles.leftBox}>{props.renderLeft}</View> : renderGoBack()}

          <View className={styles.title}>{props.children || title}</View>
        </View>
      </View>
    </View>
  )
}

const MMNavigation = memo(Component) as React.NamedExoticComponent<PropsWithChildren<IMMNavigationProps>> & {
  /**
   * 导航占位高度
   * 当你使用place： false时。你可以通过这个属性拿到原本导航占据的高度
   */
  navigationHeight: number
}

MMNavigation.navigationHeight = navigationHeight

export default MMNavigation
