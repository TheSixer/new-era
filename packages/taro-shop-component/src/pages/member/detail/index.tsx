import { FC, memo } from 'react'
import Taro from '@tarojs/taro'
import PageCardDetail, { useService } from '@wmeimob-modules/member-taro/src/pages/cardDetail'
import { routeNames } from '../../../routes'
import useGlobalStore from '../../../globalStore'

interface IListProps {}

const Component: FC<IListProps> = () => {
  const service = useService()

  const { user } = useGlobalStore()

  return (
    <PageCardDetail
      avatarUrl={user.headImg}
      service={service}
      onRightDesClick={() => {
        Taro.navigateTo({ url: routeNames.memberRightsDescription })
      }}
    />
  )
}

const Detail = memo(Component)
export default Detail
