import { FC, memo } from 'react'
import styles from './index.module.less'
import { IPaidAmountProps } from './const'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import useOrderAmount from '@wmeimob/shop-data/src/hooks/order/useOrderAmount'
import { EOrderType } from '@wmeimob/shop-data/src/enums/order/EOrderType'
import { Space } from 'antd'

/**
 * 实付金额
 *
 * 实付 + 积分
 * @param props
 * @returns
 */
const Component: FC<IPaidAmountProps> = (props) => {
  const { orderType, payStatus } = props.data
  const { payAmount, scoreDeductionCount, exchangeIntegral } = useOrderAmount(props.data)

  if (orderType !== EOrderType.Integral) {
    return payStatus === 0 ? (
      <span>-</span>
    ) : (
      <div className={styles.paidAmountStyle}>
        {mmCurrenty(payAmount)}
        {!!scoreDeductionCount && ` + ${scoreDeductionCount}积分`}
      </div>
    )
  }

  return payStatus === 1 ? (
    <Space>
      {!!payAmount && <span>{mmCurrenty(payAmount)}</span>}

      {!!payAmount && !!exchangeIntegral && <span>+</span>}

      {!!exchangeIntegral && <span>{exchangeIntegral}积分</span>}
    </Space>
  ) : (
    <span>-</span>
  )
}

Component.displayName = 'PaidAmount'

const PaidAmount = memo(Component)
export default PaidAmount
