import { RouteComponentProps } from 'react-router-dom'
import { MarketingActivityVo } from '@wmeimob/backend-api'

export interface IActivitysProps extends RouteComponentProps {}

export interface IMarketingActivity extends MarketingActivityVo {
  /** 活动是否已结束 */
  _isFinish: boolean
}
