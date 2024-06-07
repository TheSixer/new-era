import Taro from '@tarojs/taro'
import { memo, useMemo, useState, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { ICouponProps } from './const'
import styles from './index.module.less'
import MMCheckbox from '@wmeimob/taro-design/src/components/checkbox'
import classnames from 'classnames'
import SmallCoupon from './Small'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import LeftContent from './LeftContent'

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
          <View className={styles.split_circleTop} />
          <View className={styles.split_line} />
          <View className={styles.split_circleBottom} />
        </View>
        {/* 内容区 */}
        <View className={classnames(styles.center, isRenderCheck && styles.checkable)}>
          {/* 主标题 */}
          <View className={styles.center_title}>{data.title}</View>

          {/* 副标题 */}
          {data.subTitle && <Text className={classnames(styles.center_subTitle, 'text-over-flow-1')}>{data.subTitle}</Text>}

          {/* 时间 */}
          <View className={styles.center_des}>{data.description}</View>

          {/* 详情 */}
          {renderCouponDetail()}

          {/* 选择框 */}
          {isRenderCheck && (
            <View className={styles.center_check}>
              <MMCheckbox value={checked!} />
            </View>
          )}
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
