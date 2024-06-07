import { BasicModuleSliderDTO } from '@wmeimob-modules/decoration-data'
import { getDefaultComponetStyle } from '../../utils'

export interface IBasicModuleSliderProps extends BasicModuleSliderDTO {}

export interface IBasicModuleSliderState {
  width: number
  // height: number
  innerAutoPlay: boolean,
  current: number
}

export function getModuleSliderDefaultProps(): BasicModuleSliderDTO {
  return {
    interval: 5,
    height: 140,
    data: [],
    componentStyle: getDefaultComponetStyle()
  }
}
