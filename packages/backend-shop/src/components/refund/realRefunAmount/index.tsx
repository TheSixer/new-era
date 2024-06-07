import { FC, memo } from 'react'
import { IRealRefunAmountProps } from './const'
import mmCurrenty, { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { Space } from 'antd'
import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'

/**
 * 实际退款金额
 */
const Component: FC<IRealRefunAmountProps> = ({ data = {} }) => {
  const { refundStatus, refundAmount = 0, freightAmount = 0 } = data

  return [ERefundStatus.Complete, ERefundStatus.Process].includes(refundStatus as any) ? (
    <Space>
      <span>{mmCurrenty(mmAdds(refundAmount, freightAmount))}</span>

      {!!freightAmount && <span>(含运费{mmCurrenty(freightAmount)})</span>}
    </Space>
  ) : null
}

Component.displayName = 'RealRefunAmount'

const RealRefunAmount = memo(Component)
export default RealRefunAmount
