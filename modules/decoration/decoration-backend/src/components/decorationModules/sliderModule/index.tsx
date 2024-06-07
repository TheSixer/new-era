import { Carousel } from 'antd'
import { FC, memo } from 'react'
import useCarousel from '../../../hooks/useCarousel'
import ModuleInfoCard from '../../moduleInfoCard'
import useComponentStyle from '../../../hooks/useComponentStyle'
import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { getDefaultProps, ISliderModuleProps } from './const'
import icon from './icon.png'
import styles from './index.module.less'
import settingComponet from './settingComponet'

const Component: FC<ISliderModuleProps> = (props) => {
  const { interval, height, data, componentStyle } = props
  const { carouselRef } = useCarousel(interval)
  const { style } = useComponentStyle(componentStyle)

  return (
    <div className={styles.sliderModuleStyle} style={style}>
      {data.length ? (
        <Carousel ref={carouselRef} className={styles.content}>
          {data.map((item, index) => {
            return (
              <div key={item.key}>
                <div className={styles.img} style={{ backgroundImage: `url(${item.url})`, height }} />
              </div>
            )
          })}
        </Carousel>
      ) : (
        <ModuleInfoCard type={BasicModuleSignEnum.Slider} text={false} style={{ minHeight: 140 }} />
      )}
    </div>
  )
}

Component.displayName = 'SliderModule'
Component.defaultProps = getDefaultProps()

const SliderModule = memo(Component)
export default SliderModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.Slider,
  cname: '轮播广告',
  icon,
  getDefaultProps,
  settingComponet
}
