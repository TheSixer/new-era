import { MarketingActivityDto } from '@wmeimob/taro-api';

export interface ICardProps {
  activity: MarketingActivityDto,
  onRefresh: () => void
}

