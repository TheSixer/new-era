import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IFullMinusDiscountProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import dayjs from 'dayjs'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { api } from '@wmeimob/taro-api'
import { MarketingActivityDto } from '@wmeimob/taro-api'
import { EDateFormat } from '@wmeimob/data-model/src/enums/EDateFormat'
import GoodActivityItem from '../../../components/activity/goodActivityItem'

const Component: FC<IFullMinusDiscountProps> = () => {
  const { params = {} } = useRouter()

  const [activity, setActivity] = useState<MarketingActivityDto>({})
  const [info, pullToRefreshProps] = useMMPullToRefresh({
    getData: queryParams => api['/wechat/activity/goods_GET']({ activityNo: params.activityNo!, ...queryParams })
  })

  useEffect(() => {
    api['/wechat/activity/{activityNo}_GET'](params.activityNo!).then(({ data = {} }) => {
      setActivity(data)
    })
  }, [])

  return (
    <View className={styles.fullMinusDiscountStyle}>
      <MMNavigation title="满减满折" />

      <View className={styles.out}>
        <View className={styles.actTime}>
          {dayjs(activity.startTime).format(EDateFormat.Date)} ~ {dayjs(activity.endTime).format(EDateFormat.Date)}
        </View>

        <MMPullToRefresh {...pullToRefreshProps} empty={info.isEmpty && <MMEmpty type="record" text="暂无活动商品" />}>
          {info.list.map(item => (
            <GoodActivityItem data={item} key={item.goodsNo} hasSign={false} />
          ))}
        </MMPullToRefresh>
      </View>
    </View>
  )
}

const FullMinusDiscount = memo(Component)
export default FullMinusDiscount
