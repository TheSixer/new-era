import { BasicModuleProductDTO } from '@wmeimob-modules/decoration-data'
import { EProductDataType } from '@wmeimob-modules/decoration-data/src/enums/EProductDataType'
import { getDefaultComponetStyle } from '../../utils'

export interface IBasicModuleProductProps extends BasicModuleProductDTO {}

export function getModuleProductDefaultProps(): BasicModuleProductDTO {
  return {
    type: EProductDataType.Partial,
    classify: [],
    sort: 1,
    pageSize: 10,
    goods: [],
    componentStyle: getDefaultComponetStyle()
  }
}
