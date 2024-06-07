import { BasicModuleNavigationDTO } from '@wmeimob-modules/decoration-data'
import { ENavArrangeType } from '@wmeimob-modules/decoration-data/src/enums/ENavArrangeType'
import { getDefaultComponetStyle } from '../../utils'

export interface IBasicModuleNavigationProps extends BasicModuleNavigationDTO {}

export function getModuleNavigationDefaultProps(): BasicModuleNavigationDTO {
  return {
    size: 'default',
    iconShape: 'circle',
    arrangeType: ENavArrangeType.Average,
    data: [],
    componentStyle: getDefaultComponetStyle(
      {},
      {
        backgroundColor: 'transparent'
      }
    )
  }
}
