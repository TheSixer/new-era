import { memo, FC, useContext, useMemo } from 'react'
import { View } from '@tarojs/components'
import { IActInfoPopProps } from './const'
import styles from './index.module.less'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import MMRichText from '../../../../../components/richText/index'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import GoodDetailContext from '../../context'
import { getActivityFormatText } from '@wmeimob/shop-data/goods/utils/activities'

const { FlashSale } = EActivityType

const Component: FC<IActInfoPopProps> = () => {
  const { showActivityPop, setShowActivityPop, activityPopDto } = useContext(GoodDetailContext)

  const rules = useMemo(() => getActivityFormatText(activityPopDto), [activityPopDto])

  const { promotionParam = {}, content = '', activityType, activityName, endTime, startTime } = activityPopDto
  const isRenderPreferential = activityType !== FlashSale && promotionParam

  return (
    <MMPopup title="活动" titleAlign="center" visible={showActivityPop} onClose={() => setShowActivityPop(false)}>
      <View className={styles.activityInfoModel}>
        <MMCell title="活动名称" noStyle valueAlign="left">
          <View className={styles.rContent}>{activityName}</View>
        </MMCell>

        <MMCell title="活动时间" noStyle valueAlign="left">
          <View className={styles.rContent}>
            {startTime} ~ {endTime}
          </View>
        </MMCell>

        {isRenderPreferential && (
          <MMCell title="优惠内容" noStyle titleAlign="baseline" valueAlign="left">
            <View className={styles.rContent}>
              {/* 满减满折 */}
              {rules.map(({ activityNo: aNo, text }) => {
                return (
                  <View key={aNo + text} className={styles.block}>
                    {text}
                  </View>
                )
              })}
            </View>
          </MMCell>
        )}

        <MMCell title="活动规则" noStyle titleAlign="baseline" valueAlign="left">
          <View className={styles.rContent}>{showActivityPop && <MMRichText html={content} />}</View>
        </MMCell>
      </View>
    </MMPopup>
  )
}

const ActInfoPop = memo(Component)
export default ActInfoPop
