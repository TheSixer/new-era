import { View, Text } from '@tarojs/components'
import { getDefaultProps, IActivityModuleProps } from './const'
import styles from './index.module.less'
import BuyCountDown from './buyCountDown'
import GoodList from './goodList'
import TabList from './tabList'
import { IBasicActivityGoodAdvance } from '@wmeimob-modules/decoration-data'
import { useState, memo, FC } from 'react'
import userActivityModuleService from '../../hooks/userActivityModuleService'

const Component: FC<IActivityModuleProps> = (props) => {
  const { data } = props

  const [activeIndex, setActiveIndex] = useState(0)

  const { componentStyle, activitys, showCardTitle, handleClickMore } = userActivityModuleService(props)

  return !activitys.length ? null : (
    <View className={styles.activityModuleStyle} style={componentStyle}>
      {!showCardTitle && !!activitys.length && <TabList activeIndex={activeIndex} activitys={activitys} data={data} onChange={(idx) => setActiveIndex(idx)} />}

      {activitys.map((activity, index) => {
        const { startTime = '', endTime = '', id: activityId, activityNo, goods } = activity
        const acitivityConfig = data.find((ac) => ac.activityNo === activity.activityNo)!
        const listGoods = goods.map((good) => ({ ...good, activityNo, activityId })) as unknown as IBasicActivityGoodAdvance[]

        return (
          <View className={styles.card} key={acitivityConfig.showActivityTitle + index} style={{ display: activeIndex === index ? 'block' : 'none' }}>
            {showCardTitle && (
              <View className={styles.card_title}>
                <Text>{acitivityConfig.showActivityTitle}</Text>
                <BuyCountDown endTime={endTime} startTime={startTime} />
              </View>
            )}
            <GoodList btnName={acitivityConfig.btnName} data={listGoods} onMore={() => handleClickMore(acitivityConfig, index)} />
          </View>
        )
      })}
    </View>
  )
}

Component.defaultProps = getDefaultProps()

const ActivityModule = memo(Component)
export default ActivityModule
