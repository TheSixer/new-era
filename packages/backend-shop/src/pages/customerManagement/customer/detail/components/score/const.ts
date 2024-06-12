import { MemberInfoPageVo, ScoreGetOutputDto } from '@wmeimob/backend-api';

export interface IScoreProps {
  detail: MemberInfoPageVo
  scoreInfo?: ScoreGetOutputDto
  onRefresh(): void
}
