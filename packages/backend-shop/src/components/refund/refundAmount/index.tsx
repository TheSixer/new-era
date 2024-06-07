import { FC, memo } from 'react'
import { IRefundAmountProps } from './const'
import mmCurrenty, { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { Space } from 'antd'
import useRefundAmount from '~/hooks/refund/useRefundAmount'

/**
 * 售后申请金额信息
 * 退款金额为：商品金额+运费
 */
const Component: FC<IRefundAmountProps> = ({ data = {} }) => {
  const { applyFreightAmount, applyRefundAmount } = useRefundAmount(data)

  return (
    <Space>
      <span>{mmCurrenty(mmAdds(applyRefundAmount, applyFreightAmount))}</span>

      {!!applyFreightAmount && <span>(含运费{mmCurrenty(applyFreightAmount)})</span>}
    </Space>
  )
}

Component.displayName = 'RefundAmount'

const RefundAmount = memo(Component)
export default RefundAmount
