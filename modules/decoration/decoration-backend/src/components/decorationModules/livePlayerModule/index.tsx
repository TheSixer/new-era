import { FC, memo, useMemo } from 'react'
import styles from './index.module.less'
import { ILivePlayerModuleProps, getDefaultProps } from './const'
import useComponentStyle from '../../../hooks/useComponentStyle'
import useCarousel from '../../../hooks/useCarousel'
import { Carousel } from 'antd'
import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import icon from './icon.png'
import { EModuleCategory } from '@wmeimob-modules/decoration-data/src/enums/EModuleCategory'
import settingComponet from './settingComponet'

const Component: FC<ILivePlayerModuleProps> = (props) => {
  const { data, componentStyle } = props
  const { carouselRef } = useCarousel(5)
  const { style } = useComponentStyle(componentStyle)

  const carData = useMemo(() => {
    return data.length ? data : [{ id: 1, scheduleGroupName: '直播组名称' }]
  }, [data])

  return (
    <div className={styles.basicModuleLivePlayerStyle} style={style}>
      <Carousel ref={carouselRef} className={styles.content}>
        {carData.map((item) => (
          <div className={styles.wrapperContent} key={item.id}>
            <div className={styles.cover} />
            <div className={styles.contentRight}>
              <div>{item.scheduleGroupName}</div>
              <div className={styles.goods}>
                {[1, 2, 3].map((item) => (
                  <div className={styles.goodImg} key={item} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

Component.displayName = 'LivePlayerModule'
Component.defaultProps = getDefaultProps()

const LivePlayerModule = memo(Component)
export default LivePlayerModule

// export const moduleInfo: IModuleInfo = {
//   type: BasicModuleSignEnum.LivePlayer,
//   cname: '直播',
//   icon,
//   category: EModuleCategory.Content,
//   getDefaultProps,
//   settingComponet
// }
