import { memo, useMemo, FC } from 'react'
import { View } from '@tarojs/components'
import { IHandleInfoProps } from './const'
import styles from './index.module.less'
import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import { getProcessResult } from '@wmeimob/shop-data/src/enums/refund/EProcessResult'
import { ERefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import GoodPrice from '../../../../../components/good/goodPrice'
import { MMoneybackStatus } from '@wmeimob/shop-data/src/enums/refund/EMoneybackStatus'
import { plus } from 'number-precision'

const Component: FC<IHandleInfoProps> = (props) => {
  const { refundData = {}, totalAmount = 0 } = props

  const { refundType, refundStatus, returnTime, storeNote, processTime, processResult, freightAmount = 0 } = refundData

  const isComplete = refundStatus === ERefundStatus.Complete

  // 退回积分，由各个积分商品退回积分累加
  const refundTotalScore = useMemo(() => {
    const total = refundData.refundItemList?.reduce((sum, { refundScore = 0 }) => plus(sum, refundScore), 0)
    return total
  }, [refundData])

  // 退款金额
  const returnMoney = isComplete && (
    <MMCell title="退款金额">
      <GoodPrice value={totalAmount} fontSize={14} color="#333333" />
      {!!freightAmount && (
        <View style={{ display: 'flex', alignItems: 'center' }}>
          (含运费&nbsp;
          <GoodPrice value={freightAmount} fontSize={14} color="#333333" />)
        </View>
      )}
    </MMCell>
  )

  // 有退积分字段
  const returnScore = isComplete && !!refundTotalScore && <MMCell title="退积分">{refundTotalScore}积分</MMCell>

  // 商家处理中无处理说明
  if (refundStatus === ERefundStatus.StoreProcess) {
    return null
  }

  return (
    <MMCellGroup title="处理信息" style={{ marginBottom: '10px' }}>
      {/* 仅退款 */}
      {refundType === ERefundType.Refund && (
        <>
          <MMCell title="处理时间">{processTime}</MMCell>

          <MMCell title="处理结果">{getProcessResult(refundType!, processResult!)}</MMCell>

          {returnMoney}

          {returnScore}

          {!!storeNote && (
            <MMCell title="处理说明" titleAlign="top">
              {refundData.storeNote}
            </MMCell>
          )}
        </>
      )}

      {/* 退货退款 */}
      {refundType === ERefundType.Every && (
        <>
          <MMCell title="处理时间">{processTime}</MMCell>

          <MMCell title="处理结果">{getProcessResult(refundType!, processResult!)}</MMCell>

          {/* 退货退款不通过显示处理备注 */}
          {!!storeNote && refundStatus === ERefundStatus.StoreRefuse && (
            <MMCell title="处理说明" titleAlign="top">
              {refundData.storeNote}
            </MMCell>
          )}

          {!!returnTime && <MMCell title="退货时间">{returnTime!}</MMCell>}

          {!!refundData.completeResult && <MMCell title="退款状态">{MMoneybackStatus[refundData.completeResult!]}</MMCell>}

          {!!refundData.processCheckTime && <MMCell title="处理时间">{refundData.processCheckTime}</MMCell>}

          {returnMoney}

          {returnScore}

          {!!refundData.processCheckNote && (
            <MMCell title="处理备注" titleAlign="top">
              {refundData.processCheckNote}
            </MMCell>
          )}
        </>
      )}
    </MMCellGroup>
  )
}

const HandleInfo = memo(Component)
export default HandleInfo
