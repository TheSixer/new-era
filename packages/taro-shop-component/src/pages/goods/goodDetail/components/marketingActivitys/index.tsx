import { View } from '@tarojs/components'
import { getActivityFormatText, getValidActivities } from '@wmeimob/shop-data/goods/utils/activities'
import { memo, useContext, useMemo, FC } from 'react'
import GoodDetailContext from '../../context'
import { IMarketingActivitysProps } from './const'
import styles from './index.module.less'

const Component: FC<IMarketingActivitysProps> = (props) => {
  const { good, setShowActivityPop, setSctivityPopDto } = useContext(GoodDetailContext)

  const formatActivitiesText = useMemo(() => {
    const activities = getValidActivities(good.marketingActivityList || [])
    const format = activities.reduce<ReturnType<typeof getActivityFormatText>>((result, activity) => result.concat(getActivityFormatText(activity)), [])

    return format
  }, [good])

  function handldClickTag(activityNo: string) {
    const activity = good.marketingActivityList!.find((item) => item.activityNo === activityNo)!
    setSctivityPopDto(activity)
    setShowActivityPop(true)
  }

  return (
    <View className={styles.marketingActivitysStyle}>
      {formatActivitiesText.map((item) => {
        return (
          <View key={item.text + item.activityNo} className={styles.tagItem} onClick={() => handldClickTag(item.activityNo!)}>
            {item.text}
          </View>
        )
      })}
    </View>
  )
}

const MarketingActivitys = memo(Component)
export default MarketingActivitys
