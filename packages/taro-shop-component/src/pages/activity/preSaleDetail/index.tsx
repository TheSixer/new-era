import Taro from '@tarojs/taro'
import PreSaleDetailPage from '@wmeimob-modules/activity-taro/src/pages/preSaleDetail'
import { FC, memo } from 'react'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { isNoStatusBar } from '../../../config'

interface IPreSaleDetailProps {}

const Component: FC<IPreSaleDetailProps> = (props) => {
  return (
    <PreSaleDetailPage
      isNoStatusBar={isNoStatusBar}
      onGoodsDetail={(goods, activity) => {
        navByLink(EJumpType.GoodDetail,{
          goodsNo: goods.goodsNo,
          activityType: activity.activityType
        } )
        // Taro.navigateTo({
        //   url: routeNames.goodsGoodDetail,
        //   params: {
        //     goodsNo: goods.goodsNo,
        //     activityType: activity.activityType
        //   } as IRouteParams
        // })
      }}
    />
  )
}

const PreSaleDetail = memo(Component)
export default PreSaleDetail
