import { FC, memo } from 'react'
import Taro from '@tarojs/taro'
import PageCards, { useService } from '@wmeimob-modules/member-taro/src/pages/cards'
import { routeNames } from '../../../routes'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

interface IListProps {
}

const Component: FC<IListProps> = () => {
  const service = useService()

  return (
    <PageCards
      service={service}
      onCardClick={({ id }) => {
        Taro.navigateTo({ url: getParamsUrl(routeNames.memberDetail, { id }) })
      }}
    />
  )
}

const List = memo(Component)
export default List
