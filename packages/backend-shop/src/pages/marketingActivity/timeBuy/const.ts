import { RouteComponentProps } from 'react-router-dom'
import { MarketingActivityVo } from '@wmeimob/backend-api'

export interface ITimeBuyProps extends RouteComponentProps {}

export interface IMarketingActivity extends MarketingActivityVo {
  /** 活动是否结束 */
  _isFinish: boolean
}
