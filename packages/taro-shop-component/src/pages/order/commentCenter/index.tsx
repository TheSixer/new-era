import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { ICommentCenterProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import { api } from '@wmeimob/taro-api'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import GoodComment from '../../../components/good/goodComment'
import MMCard from '@wmeimob/taro-design/src/components/card'
import { PageContainer } from '@wmeimob/taro-design'
import OrderItem from './components/orderItem'
import { ECommentType, MCommentType } from '../../../enums/comment/ECommentType'
import icon_empty from './icon_empty.png'
import ShopTabs from '../../../components/shopTabs'

const Component: FC<ICommentCenterProps> = () => {
  const { params } = useRouter()
  const [orderid, setorderid] = useState<ECommentType>((params.tabid as any) || ECommentType.Pending)

  const tabData = [
    { value: ECommentType.Pending, label: MCommentType[ECommentType.Pending] },
    { value: ECommentType.Done, label: MCommentType[ECommentType.Done] }
  ]

  /** 待评价列表 */
  const [wait, pullToRefreshWait] = useMMPullToRefresh({
    initRequest: false,
    getData: (pa) => api['/wechat/orders_GET']({ ...pa, queryType: 4 })
  })

  /** 已评价列表 */
  const [already, pullToRefreshAlready] = useMMPullToRefresh({
    initRequest: false,
    getData: (pa) => api['/wechat/orders/comment/list_GET'](pa)
  })

  useDidShow(() => {
    if (orderid === ECommentType.Pending) {
      pullToRefreshWait.onRefresh()
    } else {
      pullToRefreshAlready.onRefresh()
    }
  })

  function changeTab(id) {
    setorderid(id)
    if (id === ECommentType.Pending) {
      pullToRefreshWait.onRefresh()
    } else {
      pullToRefreshAlready.onRefresh()
    }
  }

  const empty = <MMEmpty src={icon_empty} imgStyle={{ width: 160, height: 160 }} text="暂无评价" fixed />

  return (
    <PageContainer className={styles.commentCenterStyle} noPlace>
      <MMNavigation title="评价中心" />

      <ShopTabs value={orderid} data={tabData} onChange={(value) => changeTab(value)} />

      {/* 待评价 */}
      {orderid === ECommentType.Pending && (
        <MMPullToRefresh {...pullToRefreshWait} empty={wait.isEmpty && empty}>
          <View className="spacing" />
          {wait.list.map((item) => (
            <OrderItem data={item} key={item.id} />
          ))}
        </MMPullToRefresh>
      )}

      {/* 已评价 */}
      {orderid === ECommentType.Done && (
        <MMPullToRefresh {...pullToRefreshAlready} empty={already.isEmpty && empty}>
          <View className="spacing" />
          {already.list.map((item) => (
            <MMCard key={item.goodsId! + item.orderNo!} className={styles.listOut}>
              <GoodComment data={item} hasHandleBtn hasAppendComment showGood onRefresh={() => pullToRefreshAlready.onRefresh()} />
            </MMCard>
          ))}
        </MMPullToRefresh>
      )}
    </PageContainer>
  )
}

const CommentCenter = memo(Component)
export default CommentCenter
