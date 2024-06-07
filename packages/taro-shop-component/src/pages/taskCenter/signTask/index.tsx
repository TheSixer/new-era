import Taro from '@tarojs/taro'
import PageSignTask, { useService } from '@wmeimob-modules/task-taro/src/pages/signTask'
import { FC, memo } from 'react'
import { routeNames } from '../../../routes'
import { isNoStatusBar } from '../../../config'

interface ISignTaskProps {}

const Component: FC<ISignTaskProps> = (props) => {
  const service = useService({
    toExplain: () => Taro.navigateTo({ url: routeNames.taskCenterSignTaskExplain })
  })

  return <PageSignTask service={service} isNoStatusBar={isNoStatusBar}/>
}

const SignTask = memo(Component)
export default SignTask
