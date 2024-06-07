import { FC, memo } from 'react'
import PageAvatarManagement, { useService } from '@wmeimob-modules/goods-backend/src/pages/avatarManagement'

const Component: FC = (props) => {
  const service = useService()

  return <PageAvatarManagement service={service} />
}

Component.displayName = 'AvatarManagement'

const AvatarManagement = memo(Component)
export default AvatarManagement
