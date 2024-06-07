import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { ESliderWithImageMode } from '@wmeimob-modules/decoration-data/src/enums/ESliderWithImageMode'
import Carousel, { CarouselRef } from 'antd/lib/carousel'
import { FC, Fragment, memo, useEffect, useRef } from 'react'
import useComponentStyle from '../../../hooks/useComponentStyle'
import ModuleInfoCard from '../../moduleInfoCard'
import { getDefaultProps, ISliderWithImageModuleProps } from './const'
import styles from './index.module.less'
import settingComponet from './settingComponet'

const Component: FC<ISliderWithImageModuleProps> = (props) => {
  const { slider, mode, images, contentStyle, componentStyle } = props
  const ref = useRef<CarouselRef>(null)
  const timeout = useRef<any>()

  const { style } = useComponentStyle(componentStyle)
  const renderDefault = !slider.data.length && !images.length

  useEffect(() => {
    function doNext() {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
      timeout.current = setTimeout(() => {
        ref.current?.next()
        doNext()
      }, slider.interval * 1000)
    }

    doNext()

    return () => {
      clearTimeout(timeout.current)
    }
  }, [slider.interval])

  const renderSliderItem = (
    <div className={styles.item}>
      {slider.data.length ? (
        <Carousel ref={ref} className={styles.carousel}>
          {slider.data.map((item, index) => {
            return (
              <div key={item.key}>
                <div className={styles.img} style={{ backgroundImage: `url(${item.url})`, borderRadius: contentStyle.borderRadius }} />
              </div>
            )
          })}
        </Carousel>
      ) : (
        <Carousel className={styles.carousel}>
          <div className={styles.contentStyle} />
          <div className={styles.contentStyle} />
          <div className={styles.contentStyle} />
          <div className={styles.contentStyle} />
        </Carousel>
      )}
    </div>
  )

  const renderImageItem = (
    <div className={styles.item}>
      <div className={styles.imgContent}>
        {images.map((image, index) => (
          <Fragment key={image.key}>
            <div style={{ backgroundImage: `url(${image.url})`, borderRadius: contentStyle.borderRadius }} className={styles.imgContent_item} />
            {index === 0 && <div style={{ height: contentStyle.imageMargin, flexShrink: 0 }} />}
          </Fragment>
        ))}
      </div>
    </div>
  )

  return (
    <div className={styles.sliderWithImageModuleStyle} style={style}>
      {renderDefault ? (
        <ModuleInfoCard type={BasicModuleSignEnum.SliderWithImage} text={false} style={{ minHeight: 140 }} />
      ) : (
        <div className={styles.content}>
          {mode === ESliderWithImageMode.SliderRight ? renderImageItem : renderSliderItem}
          <div style={{ width: contentStyle.imageMargin, flexShrink: 0 }} />
          {mode === ESliderWithImageMode.SliderRight ? renderSliderItem : renderImageItem}
        </div>
      )}
    </div>
  )
}

Component.displayName = 'SliderWithImageModule'
Component.defaultProps = getDefaultProps()

const SliderWithImageModule = memo(Component)
export default SliderWithImageModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.SliderWithImage,
  cname: '魔方',
  icon: 'data:image/png;base64,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',
  getDefaultProps,
  settingComponet
}
