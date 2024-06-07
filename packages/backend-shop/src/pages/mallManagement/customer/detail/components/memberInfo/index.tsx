import { FC, memo } from 'react'
import UserMemberInfo, { useService } from '@wmeimob-modules/member-backend/src/components/userMemberInfo'

interface IMemberInfoProps {
  userId?: number
}

const Component: FC<IMemberInfoProps> = ({ userId }) => {
  return <UserMemberInfo service={useService({ userId: userId! })} />
}

const MemberInfo = memo(Component)
export default MemberInfo
