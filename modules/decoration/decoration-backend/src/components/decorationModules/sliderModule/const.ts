import { BasicModuleSliderDTO } from '@wmeimob-modules/decoration-data'
import { getDefaultComponetStyle } from '../../utils'

export interface ISliderModuleProps extends BasicModuleSliderDTO {}

export function getDefaultProps(url = ''): BasicModuleSliderDTO {
  return {
    interval: 5,
    height: 140,
    data: [],
    componentStyle: getDefaultComponetStyle()
  }
}
