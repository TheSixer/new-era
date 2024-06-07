import Taro from '@tarojs/taro'
import { memo, useMemo, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { ICouponProps } from './const'
import styles from './index.module.less'
import classnames from 'classnames'
import LeftContent from './LeftContent'

const Component: FC<ICouponProps> = (props) => {
  const { data, disabled = false, rightText, checked } = props

  const isRenderCheck = useMemo(() => props.checked !== undefined, [props.checked])

  const countSize = useMemo(() => {
    const { length } = `${data.count || ''}`.replace(/\./g, '')
    // eslint-disable-next-line no-nested-ternary
    return length <= 4 ? '' : length < 8 ? 'small' : 'tiny'
  }, [data])

  const handleClickRight = () => {
    if (!disabled) {
      props.onClickRight?.()
    }
  }

  return (
    <View
      className={classnames(styles.couponItemStyle, styles.couponItem, disabled && styles.disabled, styles.small)}
      onClick={() => {
        if (isRenderCheck) {
          props.onClick?.(!checked)
        } else {
          props.onClick?.()
        }
      }}
    >
      {/* 左侧 */}
      <LeftContent data={data} countSize={countSize} />

      {/* 分割线区域 */}
      <View className={styles.split}>
        <View className={styles.split_circleTop} />
        <View className={styles.split_line} />
        <View className={styles.split_circleBottom} />
      </View>

      {/* 最右侧 */}
      <View
        className={styles.right}
        onClick={(ev) => {
          ev.stopPropagation()
          handleClickRight()
        }}
      >
        {rightText && <Text className={styles.rightText}>{rightText}</Text>}
      </View>
    </View>
  )
}

const MMShopCoupon = memo(Component)
export default MMShopCoupon
