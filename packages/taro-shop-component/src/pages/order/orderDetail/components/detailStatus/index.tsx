import Taro from '@tarojs/taro'
import { memo, useMemo, FC } from 'react'
import { View, Image } from '@tarojs/components'
import { IDetailStatusProps } from './const'
import styles from './index.module.less'
import { EOrderStatus } from '../../../../../enums/EOrderStatus'
import status_dzf from '../../images/status_dzf.png'
import status_dfh from '../../images/status_dfh.png'
import status_dsh from '../../images/status_dsh.png'
import status_jywc from '../../images/status_jywc.png'
import useCountDown from '@wmeimob/utils/src/hooks/useCountDown'

const iconStyle = { width: 20, height: 20 }
const Component: FC<IDetailStatusProps> = (props) => {
  const { order, orderState } = props

  // 是否交易完成
  const isCompleted = useMemo(() => {
    return orderState !== undefined && [EOrderStatus.COMPLETED, EOrderStatus.PART_COMPLETED].includes(orderState)
  }, [orderState])

  const { minute, hour, seconds } = useCountDown({
    countLevel: 'hour',
    endTime: order.payEndAt!,
    onTimeEnd: onEnd
  })

  function onEnd() {
    Taro.navigateBack()
  }

  return (
    <>
      {orderState === EOrderStatus.PENDING_PAYMENT && (
        <View className={styles.detailStatusStyle}>
          <Image style={iconStyle} src={status_dzf} />
          <View className={styles.title}>{order.orderStatusName}</View>
          <View className={styles.right}>剩余支付时间：{`${hour}:${minute}:${seconds}`}</View>
        </View>
      )}

      {orderState === EOrderStatus.UNSHIPPED && (
        <View className={styles.detailStatusStyle}>
          <Image style={iconStyle} src={status_dfh} />
          <View className={styles.title}>{order.orderStatusName}</View>
        </View>
      )}

      {orderState === EOrderStatus.WAIT_RECEIVING && (
        <View className={styles.detailStatusStyle}>
          <Image style={iconStyle} src={status_dsh} />
          <View className={styles.title}>{order.orderStatusName}</View>
        </View>
      )}

      {isCompleted && (
        <View className={styles.detailStatusStyle}>
          <Image style={iconStyle} src={status_jywc} />
          <View className={styles.title}>{order.orderStatusName}</View>
        </View>
      )}

      {orderState === EOrderStatus.CANCEL && (
        <View className={styles.detailStatusStyle}>
          <Image style={iconStyle} src={status_dsh} />
          <View className={styles.title}>{order.orderStatusName}</View>
        </View>
      )}
    </>
  )
}

const DetailStatus = memo(Component)
export default DetailStatus
