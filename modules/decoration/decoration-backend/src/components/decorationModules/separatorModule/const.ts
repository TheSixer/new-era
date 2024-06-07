import { BasicModuleSeparatorDTO } from '@wmeimob-modules/decoration-data'
import { getDefaultComponetStyle } from '../../utils'

export interface ISeparatorModuleProps extends BasicModuleSeparatorDTO {}

export function getDefaultProps<T extends BasicModuleSeparatorDTO>(data?: Partial<T>) {
  return {
    height: 20,
    lineHeight: 1,
    borderStyle: 'solid',
    componentStyle: getDefaultComponetStyle(),
    ...data
  } as T
}
