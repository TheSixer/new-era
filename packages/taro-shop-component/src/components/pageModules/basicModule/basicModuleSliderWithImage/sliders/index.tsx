import { View, Swiper, SwiperItem } from '@tarojs/components'
import { ISlidersProps } from './const'
import styles from './index.module.less'
import { getModuleSliderWithImageDefaultProps } from '../const'
import { EJumpLinkMode } from '@wmeimob-modules/decoration-data/src/enums/EJumpLinkMode'
import { ImageLinkDataDTO } from '@wmeimob-modules/decoration-data'
import { navByLink } from '~/components/pageModules/utils'
import HotZone from '~/components/pageModules/hotZone'
import { PageContext } from '~/components/pageModules/const'
import { useContext, FC } from 'react'
import { getGlobalData } from '@wmeimob/taro-global-data'

const Component: FC<ISlidersProps> = (props) => {
  const { slider, contentStyle } = props
  const { interval, data } = slider

  const { pageType, pageParams } = useContext(PageContext)

  function handleClickSwiper({ jumpMode, link }: ImageLinkDataDTO, index: number) {
    if (jumpMode === EJumpLinkMode.Link) {
      navByLink(link.type, link.content, pageType, pageParams)
    }
  }

  const isH5 = getGlobalData('isH5')
  return (
    <View className={styles.slidersStyle}>
      {!!data.length && (
        <Swiper autoplay={!!interval} interval={interval * 1000} style={{ height: `100%` }} circular={!isH5}>
          {data.map((item, index) => (
            <SwiperItem key={item.key} className={styles.swiperItem} onClick={() => handleClickSwiper(item, index)}>
              <View className={styles.img} style={{ backgroundImage: `url(${item.url})`, borderRadius: contentStyle.borderRadius + 'px' }} />
              <HotZone data={item.hotZones} mode={item.jumpMode} />
            </SwiperItem>
          ))}
        </Swiper>
      )}
    </View>
  )
}

Component.options = {
  addGlobalClass: true
}
Component.defaultProps = getModuleSliderWithImageDefaultProps()

const Sliders = Component
export default Sliders
