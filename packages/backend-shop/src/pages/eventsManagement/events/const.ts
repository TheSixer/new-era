import { ActivityOutputDto } from '@wmeimob/backend-api'
import { RouteComponentProps } from 'react-router-dom'

export interface IActivitysProps extends RouteComponentProps {}

export interface IMarketingEvent extends ActivityOutputDto {
  /** 活动是否已结束 */
  _isFinish?: boolean
}
