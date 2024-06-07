import { FC, memo, useMemo } from 'react'
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
    <div
      className={classnames(styles.couponItemStyle, disabled && styles.disabled, styles.small)}
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

      {/* 最右侧 */}
      <div
        className={styles.right}
        onClick={(ev) => {
          ev.stopPropagation()
          handleClickRight()
        }}
      >
        {rightText && <span className={styles.rightspan}>{rightText}</span>}
      </div>
    </div>
  )
}

const MMShopCoupon = memo(Component)
export default MMShopCoupon
