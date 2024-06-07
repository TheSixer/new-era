import Taro, { useDidShow } from '@tarojs/taro'
import { FC, memo, useRef, useState } from 'react'
import styles from './index.module.less'
import { IAftesalesListProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { api } from '@wmeimob/taro-api'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import AfterSalesItem from './components/afterSalesItem'
import { PageContainer } from '@wmeimob/taro-design'
import ReturnLogisticsPop from '../../../components/afterSales/returnLogisticsPop'
import { RefundMasterDto } from '@wmeimob/taro-api'
import { View } from '@tarojs/components'
import icon_empty from '../myOrder/images/icon_empty.png'

const Component: FC<IAftesalesListProps> = () => {
  const [showPop, setShowPop] = useState(false)

  const refundNo = useRef('')
  const returnLogisticsInfo = useRef<RefundMasterDto>()

  const [info, pullToRefresh] = useMMPullToRefresh({
    initRequest: false,
    getData: (pa) => api['/wechat/web/refund_GET'](pa as any)
  })

  useDidShow(() => {
    pullToRefresh.onRefresh()
  })

  return (
    <PageContainer className={styles.aftesalesListStyle} noPlace>
      <MMNavigation title="售后中心" />

      <MMPullToRefresh {...pullToRefresh} empty={info.isEmpty && <MMEmpty fixed text="暂无订单" src={icon_empty} imgStyle={{ width: 160, height: 160 }} />}>
        <View className="spacing" />
        {info.list.map((item) => (
          <AfterSalesItem
            item={item}
            key={item.refundNo}
            handleRefresh={() => pullToRefresh.onRefresh()}
            onShowReturnLogistics={(rNo) => {
              refundNo.current = rNo
              returnLogisticsInfo.current = item
              setShowPop(true)
            }}
          />
        ))}
      </MMPullToRefresh>

      <ReturnLogisticsPop
        visible={showPop}
        addressInfo={returnLogisticsInfo.current}
        refundNo={refundNo.current}
        onClose={() => setShowPop(false)}
        onOk={() => {
          setShowPop(false)
          pullToRefresh.onRefresh()
        }}
      />
    </PageContainer>
  )
}

const AftesalesList = memo(Component)
export default AftesalesList
