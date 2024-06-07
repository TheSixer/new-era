import { FC, memo } from 'react'
import NoticeList from '@wmeimob/backend-notice/src/noticeList'
import { PageContainer } from '@ant-design/pro-layout'

const Component: FC = (props) => {
  return (
    <PageContainer>
      <NoticeList />
    </PageContainer>
  )
}

Component.displayName = 'Notices'

const Notices = memo(Component)
export default Notices
