import { FC, memo } from 'react'
import { Avatar, Space, Tag } from 'antd'
import styles from './index.module.less'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import { IGoodCardColumnProps } from './const'
import { EOrderRefundStatus, MOrderRefundStatus } from '@wmeimob/shop-data/src/enums/refund/EOrderRefundStatus'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const Component: FC<IGoodCardColumnProps> = (props) => {
  const { good = {} } = props

  const goodImg = good.skuImg ? good.skuImg + getResizeUrl({ width: 64 }) : ''

  return (
    <div className={styles.goodCardColumnStyle}>
      <Avatar src={goodImg} size={64} shape="square" />

      <div className={styles.goodsItem}>
        <div>
          <Space>
            <strong>{good.goodsName}</strong>
            {good.refundStatus !== undefined && good.refundStatus !== EOrderRefundStatus.None && (
              <Tag color="processing" icon={<ExclamationCircleOutlined />}>
                {MOrderRefundStatus[good.refundStatus!]}
              </Tag>
            )}
          </Space>
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
