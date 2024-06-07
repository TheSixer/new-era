import { FC, memo, useEffect, useState } from 'react'
import { Text, View } from '@tarojs/components'
import { IGoodCommentsProps } from './const'
import styles from './index.module.less'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import GoodComment from '../../../../../components/good/goodComment'
import { api } from '@wmeimob/taro-api'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import { CommentsVO } from '@wmeimob/taro-api'
import icon_empty from './icon_empty.png'
import { routeNames } from '../../../../../routes'
import Taro from '@tarojs/taro'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const Component: FC<IGoodCommentsProps> = (props) => {
  const { goodsNo } = props

  const [comments, setComments] = useState<CommentsVO[]>([])

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (goodsNo) {
      getData()
      getCommentCount()
    }
  }, [goodsNo])

  const getData = async () => {
    const { data = {} } = await api['/wechat/goods/comments/{no}_GET']({ no: goodsNo })
    const { list = [] } = data
    setComments(list.slice(0, 1))
  }

  const getCommentCount = async () => {
    const { data = 0 } = await api['/wechat/goods/comments/total/{no}_GET'](goodsNo)
    setCount(data)
  }

  return (
    <MMCard
      title={`商品评价(${count})`}
      extra={
        <View className={styles.cardExtra} onClick={() =>  Taro.navigateTo({ url: getParamsUrl(routeNames.goodsGoodComments, { goodsNo }) })}>
          <Text style={{ marginRight: 5 }}>查看全部</Text>
          <MMIconFont value={MMIconFontName.Next} size={8} color={styles.gray5} />
        </View>
      }
      className={styles.goodCommentsStyle}
    >
      {!comments.length ? (
        <MMEmpty text="暂无评价" src={icon_empty} imgStyle={{ width: 100, height: 100 }} />
      ) : (
        comments.map((comment, index) => (
          <View key={comment.id} style={{ marginBottom: index === comments.length - 1 ? 0 : 10 }}>
            <GoodComment data={comment} />
          </View>
        ))
      )}
    </MMCard>
  )
}

const GoodComments = memo(Component)
export default GoodComments
