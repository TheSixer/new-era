import Taro from '@tarojs/taro'
import { memo, useMemo, useState, FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { ICouponProps } from './const'
import styles from './index.module.less'
import MMCheckbox from '@wmeimob/taro-design/src/components/checkbox'
import MMButton from '@wmeimob/taro-design/src/components/button'
import classnames from 'classnames'
import SmallCoupon from './Small'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import LeftContent from './LeftContent'
import checked_coupon from './checked_coupon.png'

const Component: FC<ICouponProps> = (props) => {
  const { data, disabled = false, rightText, checked } = props

  const [showDetail, setShowDetail] = useState(false)
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

  const renderCouponDetail = () =>
    data.detail && (
      <View
        className={styles.center_detail}
        onClick={(ev) => {
          ev.stopPropagation()
          setShowDetail((pre) => !pre)
        }}
      >
        <Text className={styles.text}>优惠券说明</Text>
        <View className={styles.icon} style={{ transform: showDetail ? 'rotate(180deg)' : '' }}>
          <MMIconFont value={MMIconFontName.Down} size={6} />
        </View>
      </View>
    )

  return (
    <View className={styles.couponItemStyle}>
      <View
        className={classnames(styles.couponItem, disabled && styles.disabled)}
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
          <View className={styles.splitInner}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <View key={item} className={styles.split_circleTop} />
            ))}
          </View>
        </View>

        {/* 内容区 */}
        <View className={classnames(styles.center, isRenderCheck && styles.checkable)}>
          {/* 主标题 */}
          <View className={styles.center_title}>{data.title}</View>

          {/* 副标题 */}
          {data.subTitle && <Text className={classnames(styles.center_subTitle, 'text-over-flow-1')}>{data.subTitle}</Text>}

          {/* 时间 */}
          <View className={styles.center_des}>{data.description}</View>

          {/* 选择框 */}
          {isRenderCheck && (
            <View className={styles.center_check}>
              <MMCheckbox value={checked!} renderCheck={<Image src={checked_coupon} style={{ width: 18, height: 18 }} />} />
            </View>
          )}
        </View>

        {/* 最右侧 */}
        {rightText && (
          <View className={styles.right}>
            <View
              className={styles.rightText}
              onClick={(ev) => {
                ev.stopPropagation()
                handleClickRight()
              }}
            >
              {rightText}
            </View>
          </View>
        )}

        {renderCouponDetail()}
      </View>

      <View className={styles.detailContent} style={{ display: showDetail ? 'block' : 'none' }}>
        {data.detail}
      </View>
    </View>
  )
}

const MMShopCoupon = memo(Component) as unknown as typeof Component & {
  Small: typeof SmallCoupon
}
MMShopCoupon.Small = SmallCoupon

export default MMShopCoupon
