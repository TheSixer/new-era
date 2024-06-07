/* eslint-disable no-shadow */
import { FC } from 'react'
import { View } from '@tarojs/components'
import { getModuleSliderWithImageDefaultProps, IBasicModuleSliderWithImageProps } from './const'
import styles from './index.module.less'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import { ESliderWithImageMode } from '@wmeimob-modules/decoration-data/src/enums/ESliderWithImageMode'
import Sliders from './sliders'
import Images from './images'

const Component: FC<IBasicModuleSliderWithImageProps> = (props) => {
  // 通过解构定义defaultProp
  const { mode, contentStyle, componentStyle } = props
  const { style } = useComponentStyle(componentStyle)

  return (
    <View className={styles.basicModuleSliderWithImageStyle} style={style}>
      <View className={styles.content}>
        <View className={styles.item}>{mode === ESliderWithImageMode.SliderRight ? <Images {...props} /> : <Sliders {...props} />}</View>
        <View style={{ width: contentStyle.imageMargin + 'px', flexShrink: 0 }} />
        <View className={styles.item}>{mode === ESliderWithImageMode.SliderRight ? <Sliders {...props} /> : <Images {...props} />}</View>
      </View>
    </View>
  )
}

Component.defaultProps = getModuleSliderWithImageDefaultProps()

const BasicModuleSliderWithImage = Component
export default BasicModuleSliderWithImage
