import { CSSProperties, FC, memo } from 'react'
import styles from './index.module.less'
import { getDefaultProps, ICouponModuleProps } from './const'
import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import icon from './icon.png'
import { EModuleCategory } from '@wmeimob-modules/decoration-data/src/enums/EModuleCategory'
import settingComponet from './settingComponet'
import CouponWrapper from './CouponWrapper'
import useComponentStyle from '../../../hooks/useComponentStyle'

const Component: FC<ICouponModuleProps> = (props) => {
  const { data, componentStyle } = props

  const { style } = useComponentStyle(componentStyle)

  const isSmall = data.length > 1

  const contentStyle: CSSProperties =
    data.length === 2
      ? {
          display: 'flex',
          justifyContent: 'space-between'
        }
      : data.length > 2
      ? {
          display: 'flex'
        }
      : {}

  const itemStyle: CSSProperties =
    data.length === 2
      ? {
          width: `calc(50% - 5px)`
        }
      : data.length > 2
      ? {
          width: `calc(50% - 20px)`,
          flexShrink: 0,
          marginRight: 10
        }
      : {}

  return (
    <div className={styles.couponModuleStyle} style={style}>
      {data.length ? (
        <div style={{ marginBottom: -10, ...contentStyle }}>
          {data.map((item) => (
            <div key={item.id} style={itemStyle}>
              <CouponWrapper size={isSmall ? 'small' : 'default'} data={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.imgPlace}>
          <img src={icon} />
        </div>
      )}
    </div>
  )
}

Component.displayName = 'CouponModule'

const CouponModule = memo(Component)
export default CouponModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.Coupon,
  cname: '优惠券',
  icon,
  category: EModuleCategory.Basic,
  getDefaultProps,
  settingComponet
}
