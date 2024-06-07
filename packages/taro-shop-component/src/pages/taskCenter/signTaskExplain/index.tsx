import { FC, memo } from 'react'
import PageSignTaskExplain from '@wmeimob-modules/task-taro/src/pages/signTaskExplain'

interface ISignTaskExplainProps {}

const Component: FC<ISignTaskExplainProps> = () => {
  return <PageSignTaskExplain />
}

const SignTaskExplain = memo(Component)
export default SignTaskExplain
