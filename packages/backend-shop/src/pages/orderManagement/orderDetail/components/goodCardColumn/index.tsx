import { FC, memo } from 'react'
import { Avatar } from 'antd'
import styles from './index.module.less'
import { getResizeUrl } from '@wmeimob/aliyun'
import { IGoodCardColumnProps } from './const'

const Component: FC<IGoodCardColumnProps> = (props) => {
  const { good = {} } = props

  const goodImg = good.skuImg ? good.skuImg + getResizeUrl({ width: 64 }) : ''

  return (
    <div className={styles.goodCardColumnStyle}>
      <Avatar src={goodImg} size={64} shape="square" />

      <div className={styles.goodsItem}>
        <div>
          <strong>{good.goodsName}</strong>
        </div>

        <div>
          <span>规格: [{good.skuName}]</span>
        </div>

        <span>商品SKU编号: {good.skuNo || '无'}</span>
      </div>
    </div>
  )
}

Component.displayName = 'GoodCardColumn'

const GoodCardColumn = memo(Component)
export default GoodCardColumn
