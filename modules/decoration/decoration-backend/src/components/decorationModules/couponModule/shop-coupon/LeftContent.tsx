import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import classnames from 'classnames'
import { FC, memo } from 'react'
import { IMMShopCouponData } from '../shop-coupon/const'
import styles from './index.module.less'

interface ILeftContentProps {
  data: IMMShopCouponData

  countSize: any
}

const Component: FC<ILeftContentProps> = (props) => {
  const { data, countSize } = props

  const { type } = data

  return (
    <div className={styles.left}>
      <div className={styles.left_content}>
        {data.type === ECouponType.Deduction && <span className={styles.left_iconMoneny}>￥</span>}

        {[ECouponType.FreeShipping, ECouponType.Exchange, ECouponType.Present].includes(type) ? (
          <span className={classnames(styles.left_count)} style={{ fontSize: 20 }}>
            {type === ECouponType.FreeShipping ? '包邮券' : type === ECouponType.Exchange ? '兑换券' : '赠品券'}
          </span>
        ) : (
          <span className={classnames(styles.left_count, styles[countSize])}>{data.count}</span>
        )}

        {data.type === ECouponType.Discount && <div className={styles.left_discount}>折</div>}
      </div>

      <div className={styles.left_condition}>{data.demandPrice ? `满${data.demandPrice}元可用` : '无门槛'}</div>
    </div>
  )
}

const LeftContent = memo(Component)
export default LeftContent
