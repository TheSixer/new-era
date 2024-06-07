import { FC, memo } from 'react'
import styles from './index.module.less'
import { getDefaultProps, IActivityFreeShippingModuleProps } from './const'
import icon from './icon.png'
import { EModuleCategory } from '@wmeimob-modules/decoration-data/src/enums/EModuleCategory'
import settingComponet from './settingComponet'
import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import useComponentStyle from '../../../hooks/useComponentStyle'
import TabList from '../../commModuleComponents/activityModule/tabList'
import BuyCountDown from '../../commModuleComponents/activityModule/buyCountDown'
import GoodList from '../../commModuleComponents/activityModule/goodList'
import useActivityService from '../../commModuleComponents/activityModule/useActivityService'

const Component: FC<IActivityFreeShippingModuleProps> = (props) => {
  const { componentStyle } = props

  const { style } = useComponentStyle(componentStyle)
  const { localData, showCardTitle, activeIndex, setActiveIndex } = useActivityService(props, { showActivityTitle: '包邮活动', btnName: '去购买' })

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

Component.displayName = 'ActivityFreeShippingModule'

const ActivityFreeShippingModule = memo(Component)
export default ActivityFreeShippingModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.FreeShipping,
  cname: '包邮活动',
  icon,
  category: EModuleCategory.Content,
  getDefaultProps,
  settingComponet
}
