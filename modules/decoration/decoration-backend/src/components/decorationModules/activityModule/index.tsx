import { FC, memo } from 'react'
import styles from './index.module.less'
import { getDefaultProps, IActivityModuleProps } from './const'
import { BasicModuleSignEnum, IModuleInfo } from '@wmeimob-modules/decoration-data'
import icon from './icon.png'
import { EModuleCategory } from '@wmeimob-modules/decoration-data/src/enums/EModuleCategory'
import settingComponet from './settingComponet'
import useComponentStyle from '../../../hooks/useComponentStyle'
import TabList from '../../commModuleComponents/activityModule/tabList'
import BuyCountDown from '../../commModuleComponents/activityModule/buyCountDown'
import GoodList from '../../commModuleComponents/activityModule/goodList'
import useActivityService from '../../commModuleComponents/activityModule/useActivityService'

const Component: FC<IActivityModuleProps> = (props) => {
  const { componentStyle } = props

  const { style } = useComponentStyle(componentStyle)
  const { localData, showCardTitle, activeIndex, setActiveIndex } = useActivityService(props, { btnName: '去抢购' })

  return (
    <div className={styles.activityModuleStyle} style={style}>
      {!showCardTitle && <TabList activeIndex={activeIndex} data={localData} onChange={(idx) => setActiveIndex(idx)} />}

      {localData.map((item, index) => {
        return (
          <div className={styles.card} key={item.showActivityTitle + `${index}`} style={{ display: activeIndex === index ? 'block' : 'none' }}>
            {showCardTitle && (
              <div className={styles.card_title}>
                <span>{item.showActivityTitle}</span>
                <BuyCountDown endTime={item.endTime} startTime={item.startTime} />
              </div>
            )}
            <GoodList btnName={item.btnName} data={[...Array(item.showGoodNum)]} />
          </div>
        )
      })}
    </div>
  )
}

Component.displayName = 'ActivityModule'

const ActivityModule = memo(Component)
export default ActivityModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.MarketingActivity,
  cname: '营销活动',
  icon,
  category: EModuleCategory.Content,
  getDefaultProps,
  settingComponet
}
