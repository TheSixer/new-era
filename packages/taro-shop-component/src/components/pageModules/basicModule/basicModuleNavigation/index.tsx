import { View, Image } from '@tarojs/components'
import { getModuleNavigationDefaultProps, IBasicModuleNavigationProps } from './const'
import styles from './index.module.less'
import { getResizeUrl } from '@wmeimob/aliyun'
import { ImageLinkDataDTO } from '@wmeimob-modules/decoration-data'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import { navByLink } from '../../utils'
import { PageContext } from '../../const'
import { memo, useContext, FC } from 'react'
import { ENavArrangeType } from '@wmeimob-modules/decoration-data/src/enums/ENavArrangeType'
import { systemConfig } from '../../../../config'
const { decorationConfig } = systemConfig

const imgSize = decorationConfig.nav.size

const Component: FC<IBasicModuleNavigationProps> = (props) => {
  const { size, data = [], componentStyle, arrangeType, iconShape } = props

  const { style } = useComponentStyle(componentStyle)
  const { paddingTop, paddingBottom, backgroundColor, ...rootStyle } = style

  const { pageType, pageParams } = useContext(PageContext)

  const handleClick = (imageLink: ImageLinkDataDTO, index: number) => {
    navByLink(imageLink.link.type, imageLink.link.content, { pageType, pageParams })
  }

  return (
    <View className={styles.basicModuleNavigationStyle} style={rootStyle}>
      <View className={styles.content} style={{ paddingTop, paddingBottom }}>
        <View className={styles.innerContent} style={{ backgroundColor, borderRadius: `${8}px` }}>
          {data.map((item, index) => (
            <View
              key={item.key}
              className={styles.item}
              style={{ [arrangeType === ENavArrangeType.Average ? 'flex' : 'width']: size === 'large' ? '25%' : '20%' }}
            >
              <View className={styles.item_inner} onClick={() => handleClick(item, index)}>
                <Image
                  src={item.url + getResizeUrl({ width: imgSize, height: imgSize })}
                  style={{ width: imgSize, height: imgSize, borderRadius: iconShape === 'square' ? undefined : '50%' }}
                />
                <View className={styles.text}>{item.name}</View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

Component.defaultProps = getModuleNavigationDefaultProps()

const BasicModuleNavigation = memo(Component)
export default BasicModuleNavigation
