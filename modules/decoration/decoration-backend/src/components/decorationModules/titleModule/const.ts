import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { merge } from 'lodash-es'
import { BasicModuleTitleDTO } from '@wmeimob-modules/decoration-data'
import { getDefaultComponetStyle } from '../../utils'

export interface ITitleModuleProps extends BasicModuleTitleDTO {}

export function getDefaultProps(data?: Partial<BasicModuleTitleDTO>): BasicModuleTitleDTO {
  const initData: BasicModuleTitleDTO = {
    name: '标题栏',
    left: {
      show: false,
      icon: '',
      image: ''
    },
    right: {
      showArrow: false,
      content: ''
    },
    link: {
      type: EJumpType.None,
      content: ''
    },
    contentStyle: {
      fontSize: 32,
      fontWeight: 'normal',
      color: '#333333',
      backgroundColor: '',
      textAlign: 'center'
    },
    componentStyle: getDefaultComponetStyle()
  }
  return merge(initData, data)
}
