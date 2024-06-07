import { FC, memo } from 'react'
import styles from './index.module.less'
import { IRefundScoreProps } from './const'
import calcRefundScore from '~/utils/refund/calcRefundScore'

const Component: FC<IRefundScoreProps> = (props) => {
  const score = calcRefundScore(props.data)

  return !score ? null : <div className={styles.refundScoreStyle}>退积分: {score}</div>
}

Component.displayName = 'RefundScore'

const RefundScore = memo(Component)
export default RefundScore
