import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IGoodCommentProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import GoodComment from '../../../components/good/goodComment'
import { PageContainer } from '@wmeimob/taro-design'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { api } from '@wmeimob/taro-api'
import MMCard from '@wmeimob/taro-design/src/components/card'
import icon_empty from './icon_empty.png'

const Component: FC<IGoodCommentProps> = () => {
  const { params } = useRouter()

  const [info, pullToRefresh] = useMMPullToRefresh({
    getData: (pa) => api['/wechat/goods/comments/{no}_GET']({ ...pa, no: params.goodsNo! })
  })

  return (
    <PageContainer className={styles.goodCommentStyle}>
      <MMNavigation title="商品评价" shadow={false} />

      <MMPullToRefresh {...pullToRefresh} empty={info.isEmpty && <MMEmpty text="暂无评价" src={icon_empty} imgStyle={{ width: 160, height: 160 }} fixed />}>
        <View className={styles.commentsBox}>
          {info.list.map((item) => (
            <MMCard key={item.goodsId! + item.orderNo!} style={{ marginBottom: '10px' }}>
              <GoodComment data={item} hasAppendComment />
            </MMCard>
          ))}
        </View>
      </MMPullToRefresh>
    </PageContainer>
  )
}

const GoodComments = memo(Component)
export default GoodComments
