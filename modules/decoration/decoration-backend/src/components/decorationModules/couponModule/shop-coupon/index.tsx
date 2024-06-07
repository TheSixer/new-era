import React, { FC, memo, useMemo } from 'react'
import { ICouponProps } from './const'
import styles from './index.module.less'
import classnames from 'classnames'
import SmallShopCoupon from './small'
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
    <div
      className={classnames(styles.couponItemStyle, disabled && styles.disabled)}
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
      <div className={styles.split}>
        <div className={styles.split_circleTop} />
        <div className={styles.split_line} />
        <div className={styles.split_circleBottom} />
      </div>

      {/* 内容区 */}
      <div className={classnames(styles.center, isRenderCheck && styles.checkable)}>
        {/* 主标题 */}
        <div className={styles.center_title}>{data.title}</div>

        {/* 副标题 */}
        {data.subTitle && <span className={classnames(styles.center_subTitle, 'span-over-flow-1')}>{data.subTitle}</span>}

        {/* 时间 */}
        <div className={styles.center_des}>{data.description}</div>
      </div>

      {/* 最右侧 */}
      <div
        className={styles.right}
        onClick={(ev) => {
          ev.stopPropagation()
          handleClickRight()
        }}
      >
        {rightText && (
          <div className={styles.rightspan} style={{ padding: '0 10px' }}>
            {rightText}
          </div>
        )}
      </div>
    </div>
  )
}

const MMShopCoupon = memo(Component) as unknown as React.NamedExoticComponent<ICouponProps> & {
  Small: typeof SmallShopCoupon
}
MMShopCoupon.Small = SmallShopCoupon

export default MMShopCoupon
