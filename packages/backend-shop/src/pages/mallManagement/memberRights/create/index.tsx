import { FC, memo } from 'react'
import PageMemberCreate, { useService } from '@wmeimob-modules/member-backend/src/pages/create'
import { upload } from '~/components/tencent-cloud'

interface ICreateProps {}

const Component: FC<ICreateProps> = (props) => {
  const service = useService()

  return <PageMemberCreate service={service} upload={upload} />
}

const Create = memo(Component)
export default Create
