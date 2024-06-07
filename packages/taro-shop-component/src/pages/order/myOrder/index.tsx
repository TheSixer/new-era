import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import { FC, Fragment, memo, useEffect, useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IMyOrderProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMFixHead from '@wmeimob/taro-design/src/components/fix-head'
import OrderItem from './components/orderItem'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { api } from '@wmeimob/taro-api'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import { PageContainer } from '@wmeimob/taro-design'
import OrderSearchInput from './components/orderSearchInput'
import OrderTab from './components/orderTab'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import icon_empty from './images/icon_empty.png'

const Component: FC<IMyOrderProps> = () => {
  const { params } = useRouter()
  const [orderType, setOrderType] = useState(params.id || '0')
  const [keyword, setKeyword] = useState('')
  const [isFirst, setIsFirst] = useState(true)

  const headHeight = useMemo(() => (!keyword ? MMNavigation.navigationHeight + 49 + 52 : MMNavigation.navigationHeight + 52), [keyword])

  const [info, pullToRefresh] = useMMPullToRefresh({
    initRequest: false,
    getData: (pa) => api['/wechat/orders_GET']({ ...pa, queryType: Number(orderType), goodsName: keyword })
  })

  useDidShow(() => {
    if (isFirst) {
      setIsFirst(false)
    } else {
      pullToRefresh.onRefresh()
    }
  })

  useEffect(() => {
    pullToRefresh.onRefresh()
  }, [keyword, orderType])

  return (
    <PageContainer className={styles.myOrderStyle} noPlace>
      <MMFixHead height={headHeight}>
        <MMNavigation title="我的订单" shadow={false} type="Primary" />

        <View>
          {/*  搜索框 */}
          <OrderSearchInput onSearch={setKeyword} />
          {/* 订单tab */}
          {!keyword && <OrderTab queryType={orderType} onTabChange={setOrderType} />}
        </View>
      </MMFixHead>

      <MMPullToRefresh {...pullToRefresh} empty={info.isEmpty && <MMEmpty fixed text="暂无订单" src={icon_empty} imgStyle={{ width: 160, height: 160 }} />}>
        {info.list.map((item) => (
          <Fragment key={item.id}>
            <View className="spacing" />
            <OrderItem data={item} handleRefresh={() => pullToRefresh.onRefresh()} />
          </Fragment>
        ))}
      </MMPullToRefresh>
    </PageContainer>
  )
}

const MyOrder = memo(Component)
export default MyOrder
