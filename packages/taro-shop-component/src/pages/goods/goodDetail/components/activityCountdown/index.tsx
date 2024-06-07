import { FC, memo } from 'react'
import ActivityTimeBox from '../../../../../components/activity/activityTimeBox'
import { useCountdownActivity } from '../../store'

interface IActivityCountdownProps {
  onRefresh(): void
}

const Component: FC<IActivityCountdownProps> = (props) => {
  const { onRefresh } = props

  const { earlyActivity, earlyIsFlashSale, earlyIsPreSale } = useCountdownActivity()

  if (earlyIsPreSale || earlyIsFlashSale) {
    return <ActivityTimeBox activity={earlyActivity} handleRefresh={onRefresh} />
  }

  return null
}

const ActivityCountdown = memo(Component)
export default ActivityCountdown
