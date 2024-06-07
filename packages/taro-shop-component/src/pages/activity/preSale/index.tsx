import Taro from '@tarojs/taro'
import PreSalePage from '@wmeimob-modules/activity-taro/src/pages/preSale'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { FC, memo } from 'react'
import { routeNames } from '../../../routes'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

interface IPreSaleProps {
}

const Component: FC<IPreSaleProps> = (props) => {
  return (
    <PreSalePage
      onDetail={(goods) => {
        // Taro.navigateTo({
        //   url: routeNames.goodsGoodDetail,
        //   params: {
        //     goodsNo: goods.goodsNo,
        //     activityType: EActivityType.PreSale
        //   } as IRouteParams
        // })
        navByLink(EJumpType.GoodDetail, {
          goodsNo: goods.goodsNo,
          activityType: EActivityType.PreSale
        })
      }}
      onMoreClick={(activity) => {
        Taro.navigateTo({
          url: getParamsUrl(routeNames.activityPreSaleDetail,
            {
              activityNo: activity.activityNo
            })
        })
      }}
    />
  )
}

const PreSale = memo(Component)
export default PreSale
