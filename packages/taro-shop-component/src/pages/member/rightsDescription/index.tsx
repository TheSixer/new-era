import { FC, memo } from 'react'
import PageCardRightsDescription from '@wmeimob-modules/member-taro/src/pages/cardRightsDescription'

interface IListProps {}

const Component: FC<IListProps> = () => {
  return <PageCardRightsDescription />
}

const Detail = memo(Component)
export default Detail
