import { BasicModuleSliderWithImageDTO } from '@wmeimob-modules/decoration-data'
import { ESliderWithImageMode } from '@wmeimob-modules/decoration-data/src/enums/ESliderWithImageMode'
import { getDefaultComponetStyle } from '../../utils'

export interface IBasicModuleSliderWithImageProps extends BasicModuleSliderWithImageDTO {}

export function getModuleSliderWithImageDefaultProps(): BasicModuleSliderWithImageDTO {
  return {
    mode: ESliderWithImageMode.SliderLeft,
    slider: {
      interval: 5,
      data: []
    },
    images: [],
    contentStyle: {
      borderRadius: 0,
      imageMargin: 0
    },
    componentStyle: getDefaultComponetStyle()
  }
}
