import { Image, Text, View } from '@tarojs/components'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { MMNavigationType } from '@wmeimob/taro-design/src/components/navigation/const'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { FC, memo, useEffect, useState } from 'react'
import { PageContainer } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'
import { ScoreGetOutputDto } from '@wmeimob/taro-api'
import { IScoreRecordProps } from './const'
import emptyRecordImg from './images/icon_empty.png'
import icon_star from './images/icon_star.png'
import styles from './index.module.less'

const Component: FC<IScoreRecordProps> = () => {
  const [scoreInfo, setScoreInfo] = useState<ScoreGetOutputDto>()

  const [info, pullToRefreshProps] = useMMPullToRefresh({
    getData: api['/wechat/mall/score/query_GET']
  })

  useEffect(() => {
    getScoreInfo()
  }, [])

  async function getScoreInfo() {
    const { data } = await api['/wechat/mall/score/get_GET']()
    setScoreInfo(data)
  }

  return (
    <PageContainer noPlace className={styles.scoreRecordStyle}>
      <MMNavigation title='我的积分' type={MMNavigationType.Transparent} />

      {/* 积分概览 */}
      <View className={styles.header}>
        <View className={styles.item}>
          <Image src={icon_star} className={styles.icon} />
          <View>
            <View className={styles.score_count}>{scoreInfo?.availableScore || 0}</View>
            <Text>当前可用积分</Text>
          </View>
        </View>

        <View className={styles.line} />

        <View className={styles.itembottom}>
          <View className={styles.tip}>累计积分</View>
          <View className={styles.score_mini}>{scoreInfo?.totalScore || 0}</View>
        </View>
      </View>

      {/* 积分记录列表 */}
      <View className={styles.scoreList} style={{ minHeight: '40vh' }}>
        <View className={styles.scoreList_header}>
          <View className={styles.scoreList_title}>积分记录</View>
        </View>

        <MMPullToRefresh
          {...pullToRefreshProps}
          noMoreText=''
          enablePull={false}
          empty={info.isEmpty &&
          <MMEmpty text='暂时没有积分记录' src={emptyRecordImg} imgStyle={{ marginTop: 120, width: 160, height: 160 }} />}
        >
          <View>
            {info.list.map((item, idx) => {
              return (
                <View className={styles.record} key={idx}>
                  <View className={styles.record_info}>
                    <Text>{item.sourceText}</Text>
                    <Text>{item.plusType !== undefined ? `+${item.score}` : `-${item.score}`}</Text>
                  </View>
                  <View className={styles.record_time}>{item.gmtCreated}</View>
                  <MMDivider />
                </View>
              )
            })}
          </View>
        </MMPullToRefresh>
      </View>
    </PageContainer>
  )
}

const ScoreRecord = memo(Component)
export default ScoreRecord
