import { BasicModuleNavigationDTO } from '@wmeimob-modules/decoration-data'
import { ENavArrangeType } from '@wmeimob-modules/decoration-data/src/enums/ENavArrangeType'
import { getDefaultComponetStyle, getDefaultImageLink } from '../../utils'

export interface INavigationModuleProps extends BasicModuleNavigationDTO {}

export function getDefaultProps(): BasicModuleNavigationDTO {
  return {
    size: 'default',
    iconShape: 'circle',
    arrangeType: ENavArrangeType.Average,
    data: [getDefaultImageLink({ name: '导航1' }), getDefaultImageLink({ name: '导航2' })],
    componentStyle: getDefaultComponetStyle(
      {},
      {
        backgroundColor: 'transparent'
      }
    )
  }
}
