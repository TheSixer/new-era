import { WebView } from '@tarojs/components'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { useRouter } from '@tarojs/taro'
import { channelIdAtom } from '@wmeimob/taro-store'
import { useAtom } from 'jotai'
import { api } from '@wmeimob/taro-api'

interface IHomeProps {}

/**
 * 装修首页
 *
 * 配置化首页小程序渲染代码。与自定义装修后台管理页面配合。开箱即用
 * @param {*} props
 * @return {*}
 */
const Component: FC<IHomeProps> = () => {
  const { params } = useRouter()
  const { liveId = '' } = params
  const [channelId, setChannelId] = useAtom(channelIdAtom)
  const [liveUrl, setLiveUrl] = useState('')

  useEffect(() => {
    setChannelId(liveId)
    getLiveUrl()
  }, [liveId])

  const getLiveUrl = async () => {
    const { data } = await api['/wechat/live/{id}_GET'](liveId)
    setLiveUrl(data?.viewUrl ?? '')
  }
  return <WebView className={styles.live} src={liveUrl} />
}

const Home = memo(Component)
export default Home
