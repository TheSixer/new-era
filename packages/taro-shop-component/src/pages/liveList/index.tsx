import { View } from '@tarojs/components'
import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import icon_empty from './empty.png'
import { isNewIphone } from '@wmeimob/taro-design/src/components/utils'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import { useDidShow, useRouter } from '@tarojs/taro'
import LiveItem from './components/liveItem'
import { api } from '@wmeimob/taro-api'

interface LiveProps {}

/**
 * 直播列表
 */
const Component: FC<LiveProps> = () => {
  const [list, setList] = useState([])
  const { params } = useRouter()
  const [toast] = useToast()
  const [loading, setLoading] = useState(true)

  async function getData() {
    toast?.loading()
    setLoading(true)
    const { id } = params
    const {
      data: { liveIds: ids }
    } = await api['/wechat/livePage/{id}_GET'](id)
    const { data } = await api['/wechat/live_GET']({ ids })
    setList(data.filter((item) => !!item.viewUrl))
    toast?.hideLoading()
    setLoading(false)
  }

  useDidShow(() => {
    getData()
  })

  return (
    <PageContainer className={styles.liveList}>
      <MMNavigation title="直播列表" />

      {!list.length && !loading && <MMEmpty src={icon_empty} imgStyle={{ width: 160, height: 160 }} text="暂时还没有直播~" fixed />}
      {!!list.length && (
        <View className={styles.list}>
          {list.map((item) => (
            <LiveItem key={item.id} data={item} />
          ))}
        </View>
      )}
      {isNewIphone && <View className="spacingIphone" />}
    </PageContainer>
  )
}

const Home = memo(Component)
export default Home
