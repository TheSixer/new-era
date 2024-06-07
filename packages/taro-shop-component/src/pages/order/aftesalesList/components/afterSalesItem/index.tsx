import Taro from '@tarojs/taro'
import { memo, useMemo, FC } from 'react'
import { Text, View } from '@tarojs/components'
import { IAfterSalesItemProps } from './const'
import styles from './index.module.less'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import OrderGood from '../../../../../components/order/orderGood'
import MMButton from '@wmeimob/taro-design/src/components/button'
import GoodPrice from '../../../../../components/good/goodPrice'
import { ERefundStatus, RefundStatusTitle } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'
import { routeNames } from '../../../../../routes'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'
import useAfterSaleOperation from '../../../../../hooks/aftersale/useAfterSaleOperation'
import { ERefundType, MRefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import useAfterSale from '../../../../../hooks/aftersale/useAfterSale'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import { plus } from 'number-precision'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const Component: FC<IAfterSalesItemProps> = (props) => {
  const { item, handleRefresh, onShowReturnLogistics } = props

  const { deleteRecord, logisticsClick } = useAfterSale(item, {
    onDeleted: handleRefresh
  })

  const { showDelete, showLogistics, showReturnLogisitcs } = useAfterSaleOperation(item.refundStatus!, item.refundType!)

  const totalRefundAmount = useMemo(() => plus(item.freightAmount || 0, item.refundAmount || 0), [item])
  const totalApplyAmount = plus(0, item.applyRefundAmount!, item.freightState ? 0 : item.orderFreightAmount!)

  return (
    <MMCard
      className={styles.afterSalesItemStyle}
      title={
        <View className={styles.header}>
          <View className={styles.title}>售后编号：{item.refundNo}</View>
          <MMSpace gap={4}>
            <View
              className={`${styles.rgStatus} ${item.refundStatus! === ERefundStatus.StoreRefuse && item.refundType! === ERefundType.Every && styles.gray}`}>
              {MRefundType[item.refundType!]}
            </View>
            <View
              className={`${styles.rgStatus} ${item.refundStatus! === ERefundStatus.StoreRefuse && item.refundType! === ERefundType.Every && styles.gray}`}>
              {RefundStatusTitle[item.refundStatus!]}
            </View>
          </MMSpace>
        </View>
      }
    >
      <View className={styles.goodsList}>
        {item.refundItemList!.map((ite) => (
          <OrderGood
            key={ite.skuNo}
            data={ite}
            className={styles.goods}
            showQuantity={false}
            renderPrice={
              !!ite.refundAmount && (
                <MMSpace gap={0}>
                  <Text>退款：</Text>
                  <GoodPrice value={ite.refundAmount!} blod={false} fontSize={13} color={shopVariable.fontColor} />
                </MMSpace>
              )
            }
          />
        ))}
      </View>

      <View className={styles.allPrice}>
        申请退款总金额：&nbsp;
        <GoodPrice value={totalApplyAmount} color={shopVariable.primaryColor}
                   fontSize={[18, shopVariable.fontSizeSm]} />
      </View>

      {item.refundStatus === ERefundStatus.Complete && (
        <View className={styles.allPrice}>
          退款成功，退款：&nbsp;
          <GoodPrice value={totalRefundAmount} color={shopVariable.primaryColor}
                     fontSize={[18, shopVariable.fontSizeSm]} />
        </View>
      )}

      <View className={styles.btnBox}>
        <MMSpace gap={10}>
          {showDelete && (
            <MMButton type={MMButtonType.default} style={{ width: 70 }} size='tiny' onClick={() => deleteRecord()}>
              删除记录
            </MMButton>
          )}

          <MMButton
            size='tiny'
            type={MMButtonType.default}
            style={{ width: 70 }}
            onClick={() => {
              Taro.navigateTo({ url: getParamsUrl(routeNames.orderAftersalesDetail, { refundNo: item.refundNo }) })
            }}
          >
            查看详情
          </MMButton>

          {showLogistics && item.expressNo && (
            <MMButton type={MMButtonType.default} size='tiny' style={{ width: 92 }}
                      onClick={() => logisticsClick(item)}>
              退货物流
            </MMButton>
          )}

          {showReturnLogisitcs && (
            <MMButton type={MMButtonType.default} size='tiny' style={{ width: 92 }}
                      onClick={() => onShowReturnLogistics(item.refundNo!)}>
              填写退货信息
            </MMButton>
          )}
        </MMSpace>
      </View>
    </MMCard>
  )
}

const AfterSalesItem = memo(Component)
export default AfterSalesItem
