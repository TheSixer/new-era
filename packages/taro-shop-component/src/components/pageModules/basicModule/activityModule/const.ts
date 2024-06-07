import { MarketingActivityDto, MarketingActivityGoodsParam } from '@wmeimob/taro-api'
import { IBasicModuleActivity, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { getDefaultComponetStyle } from '../../utils'

export interface IActivityModuleProps extends IBasicModuleActivity {
  moduleType: BasicModuleSignEnum
}

export type IPageActivity = MarketingActivityDto & { goods: MarketingActivityGoodsParam[] }

export function getDefaultProps() {
  const initData: IBasicModuleActivity = {
    data: [],
    componentStyle: getDefaultComponetStyle()
  }
  return initData
}
