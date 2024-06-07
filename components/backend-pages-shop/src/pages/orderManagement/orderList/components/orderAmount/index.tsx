import { FC, memo } from 'react'
import { IOrderAmountProps } from './const'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import { Space } from 'antd'

/**
 * 订单金额
 * orderAmount = 商品总金额 + 运费
 * @param props
 * @returns
 */
const Component: FC<IOrderAmountProps> = ({ data = {} }) => {
  const { orderAmount = 0, realFreightAmount = 0, exchangeIntegral = 0 } = data

  return (
    <Space>
      {!!orderAmount && <span>{mmCurrenty(orderAmount)}</span>}

      {!!orderAmount && !!exchangeIntegral && <span>+</span>}

      {!!exchangeIntegral && <span>{exchangeIntegral}积分</span>}

      {!!realFreightAmount && <span>(含运费{mmCurrenty(realFreightAmount)})</span>}
    </Space>
  )
}

Component.displayName = 'OrderAmount'

const OrderAmount = memo(Component)
export default OrderAmount
