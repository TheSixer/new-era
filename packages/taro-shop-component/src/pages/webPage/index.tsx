import { WebView } from '@tarojs/components'
import { FC, memo } from 'react'
import styles from './index.module.less'
import { useRouter } from '@tarojs/taro'

interface IHomeProps {}

/**
 * 自定义页面
 *
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<IHomeProps> = () => {
  const { params } = useRouter()
  const { url } = params

  return url ? <WebView className={styles.live} src={url} /> : null
}

const Home = memo(Component)
export default Home
