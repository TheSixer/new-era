import Taro from '@tarojs/taro'
import { memo, FC } from 'react'
import { View } from '@tarojs/components'
import { IOrderItemProps } from './const'
import styles from './index.module.less'
import OrderGood from '../../../../../components/order/orderGood'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { routeNames } from '../../../../../routes'
import { useAtom } from 'jotai'
import { commentOrderAtom } from '../../../store'
import MMCard from '@wmeimob/taro-design/src/components/card'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const Component: FC<IOrderItemProps> = (props) => {
  const { data = {} } = props
  const { items = [] } = data
  const [_, setComments] = useAtom(commentOrderAtom)

  async function handleToComment() {
    setComments({
      orderNo: data.orderNo,
      items: data.items!
    })
    Taro.navigateTo({ url: routeNames.orderCommentAdd })
  }

  return (
    <MMCard
      // title={<View className={styles.itemTopLeft}>订单：{data.orderNo}</View>}
      // extra={<View className={styles.itemStatus}>{data.orderStatusName}</View>}
      className={styles.orderItemStyle}
    >
      <View onClick={() => Taro.navigateTo( { url: getParamsUrl(routeNames.orderOrderDetail, { orderNo: data.orderNo })  })}>
        {items.map((order) => {
          return <OrderGood key={order.id} data={order} style={{ marginBottom: 15 }} showPrice={false} showMarketPrice={false} />
        })}
      </View>

      <View className={styles.btnBox}>
        <MMButton text="写评价" type="default" size="tiny" onClick={() => handleToComment()} style={{ width: 68 }} />
      </View>
    </MMCard>
  )
}

const OrderItem = memo(Component)
export default OrderItem
