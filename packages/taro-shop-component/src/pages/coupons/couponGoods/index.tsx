import Taro from '@tarojs/taro'
import { FC, memo, useCallback, useEffect } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { ICouponGoodsProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { PageContainer } from '@wmeimob/taro-design'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { api } from '@wmeimob/taro-api'
import { useAtom } from 'jotai'
import { couponGoodNoAtom } from './store'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import GoodList from '../../../components/good/goodList'
import { EGoodListType } from '../../../components/good/goodList/const'
import { routeNames } from '../../../routes'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

const Component: FC<ICouponGoodsProps> = () => {
  const [goodNos, setGoodNos] = useAtom(couponGoodNoAtom)

  const [info, pullToRefresh] = useMMPullToRefresh({
    getData: (pa) => api['/wechat/goods/listByNos_POST']({ ...pa, goodNos })
  })

  const jumpToDetail = useCallback((item) => {
    navByLink(EJumpType.GoodDetail,  { goodsNo: item.goodsNo })
    // Taro.navigateTo({ url: routeNames.goodsGoodDetail, params: { goodsNo: item.goodsNo } })
  }, [])

  useEffect(() => {
    return () => {
      setGoodNos([])
    }
  }, [])

  return (
    <PageContainer noPlace className={styles.couponGoodsStyle}>
      <MMNavigation title="可用商品" />

      <MMPullToRefresh {...pullToRefresh} empty={info.isEmpty && <MMEmpty type="record" text="暂无商品" fixed />}>
        <View className={styles.commentsBox}>
          <GoodList list={info.list} type={EGoodListType.Item} onClick={jumpToDetail} />
        </View>
      </MMPullToRefresh>
    </PageContainer>
  )
}

const CouponGoods = memo(Component)
export default CouponGoods
