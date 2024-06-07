import { BasicModuleSeparatorDTO } from '@wmeimob-modules/decoration-data'
import { getDefaultComponetStyle } from '../../utils'

export interface IBasicModuleSeparatorProps extends BasicModuleSeparatorDTO {}

export function getModuleSeparatorDefaultProps<T extends BasicModuleSeparatorDTO>(data?: Partial<T>): T {
  return {
    height: 20,
    lineHeight: 0,
    borderStyle: 'solid',
    componentStyle: getDefaultComponetStyle(),
    ...data
  } as T
}
