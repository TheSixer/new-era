import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { EProductDataType } from '@wmeimob-modules/decoration-data/src/enums/EProductDataType'
import { Empty } from 'antd'
import { FC, memo } from 'react'
import useComponentStyle from '../../../hooks/useComponentStyle'
import ModuleInfoCard from '../../moduleInfoCard'
import { getDefaultProps, IProductModuleProps } from './const'
import icon from './images/icon.png'
import icon_car from './images/icon_car.png'
import styles from './index.module.less'
import settingComponet from './settingComponet'

const Component: FC<IProductModuleProps> = (props) => {
  const { type, goods, componentStyle } = props

  const { style } = useComponentStyle(componentStyle)

  return (
    <div className={styles.productModuleStyle} style={style}>
      {type === EProductDataType.All && (
        <div className={styles.emptyWrapper}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="按设置自动显示商品列表" />
        </div>
      )}
      {type === EProductDataType.Partial && (
        <div className={styles.goodContent}>
          {goods.map((good, index) => {
            return (
              <div key={good.id} className={styles.goodItem} style={{ paddingRight: index % 2 === 0 ? 5 : 0, paddingLeft: index % 2 === 1 ? 5 : 0 }}>
                <div className={styles.goodItem_content}>
                  <div className={styles.goodItem_img} style={{ backgroundImage: `url(${good.coverImg})` }} />

                  <div className={styles.goodsDetail}>
                    <div className={styles.goodsName}>{good.goodsName}</div>
                    <div className={styles.goodsPrices}>
                      <div className={styles.countPrice}>
                        {good.price && <span>¥{good.price}</span>}
                        {good.price === 0 && <span>¥0.00</span>}
                      </div>
                      <div className={styles.orgPrice}>
                        {good.marketPrice && <span>¥{good.marketPrice}</span>}
                        {good.marketPrice === 0 && <span>¥0.00</span>}
                      </div>
                      <img src={icon_car} className={styles.carIcon} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {!goods.length && <ModuleInfoCard type={BasicModuleSignEnum.Product} text={false} style={{ minHeight: 200 }} />}
        </div>
      )}
    </div>
  )
}

Component.displayName = 'ProductModule'
Component.defaultProps = getDefaultProps()

const ProductModule = memo(Component)
export default ProductModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.Product,
  cname: '商品模块',
  icon,
  getDefaultProps,
  settingComponet
}
