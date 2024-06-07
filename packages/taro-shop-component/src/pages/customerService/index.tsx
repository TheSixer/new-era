import { WebView } from '@tarojs/components'
import { FC, memo } from 'react'
import { useGlobalStore } from '../../globalStore'

interface IHomeProps {}
/**
 * 装修首页
 *
 * 配置化首页小程序渲染代码。与自定义装修后台管理页面配合。开箱即用
 * @param {*} props
 * @return {*}
 */
const Component: FC<IHomeProps> = () => {
  const { user } = useGlobalStore()
  return <WebView src="自定义客户页面" />
}

const Home = memo(Component)
export default Home
