import Taro from '@tarojs/taro'
import FreeShippingPage from '@wmeimob-modules/activity-taro/src/pages/freeShipping'
import { FC, memo } from 'react'
import { routeNames } from '../../../routes'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

interface IFreeShippingProps {
}

const Component: FC<IFreeShippingProps> = (props) => {
  return (
    <FreeShippingPage
      onDetail={(activityNo) => {
        Taro.navigateTo({
          url: getParamsUrl(routeNames.activityGoodsList,
            { activityNo })
        })
      }}
    />
  )
}

const FreeShipping = memo(Component)
export default FreeShipping
