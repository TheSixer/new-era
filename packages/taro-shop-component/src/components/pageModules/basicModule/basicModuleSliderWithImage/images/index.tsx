import { View, Block } from '@tarojs/components'
import { IImagesProps } from './const'
import styles from './index.module.less'
import { getModuleSliderWithImageDefaultProps } from '../const'
import HotZone from '~/components/pageModules/hotZone'
import { ImageLinkDataDTO } from '@wmeimob-modules/decoration-data'
import { EJumpLinkMode } from '@wmeimob-modules/decoration-data/src/enums/EJumpLinkMode'
import { navByLink } from '~/components/pageModules/utils'
import { PageContext } from '~/components/pageModules/const'
import { useContext, FC } from 'react'

const Component: FC<IImagesProps> = (props) => {
  const { images, contentStyle } = props
  const { pageType, pageParams } = useContext(PageContext)

  const handleClick = ({ jumpMode, link }: ImageLinkDataDTO, index: number) => {
    if (jumpMode === EJumpLinkMode.Link) {
      navByLink(link.type, link.content, pageType, pageParams)
    }
  }
  return (
    <View className={styles.imagesStyle}>
      <View className={styles.imgContent}>
        {images.map((image, index) => (
          <Block key={index}>
            <View style={{ flex: 1, position: 'relative' }} onClick={() => handleClick(image, index)}>
              <View style={{ backgroundImage: `url(${image.url})`, borderRadius: contentStyle.borderRadius + 'px' }} className={styles.imgContent_item} />
              <HotZone data={image.hotZones} mode={image.jumpMode} />
            </View>
            {index === 0 && <View style={{ height: contentStyle.imageMargin + 'px', flexShrink: 0 }} />}
          </Block>
        ))}
      </View>
    </View>
  )
}

Component.options = {
  addGlobalClass: true
}
Component.defaultProps = getModuleSliderWithImageDefaultProps()

const Images = Component
export default Images
