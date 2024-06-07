import Taro, { useDidShow } from '@tarojs/taro'
import { FC, memo, ReactNode, useState } from 'react'
import { Image, Text, View } from '@tarojs/components'
import styles from './index.module.less'
import { IScoreCardProps } from './const'
import iconScoreImg from './images/icon_score.png'
import iconExchangeImg from './images/icon_exchange.png'
import iconTaskImg from './images/icon_task.png'
import arrowIcon from './images/arrow.png'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import classNames from 'classnames'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import { routeNames } from '../../../../../routes'
import useGlobalStore from '../../../../../globalStore'
import { api } from '@wmeimob/taro-api'
import { ScoreGetOutputDto } from '@wmeimob/taro-api'

const Component: FC<IScoreCardProps> = () => {
  const { user } = useGlobalStore()

  const [intefralInfo, setIntefralInfo] = useState<ScoreGetOutputDto>()

  useDidShow(() => {
    getScoreInfo()
  })

  async function getScoreInfo() {
    const { data } = await api['/wechat/mall/score/get_GET']()
    setIntefralInfo(data)
  }

  function renderItem(params: { span: number; icon: string; title: ReactNode; desc: ReactNode; next?: string; onClick?(): void }) {
    return (
      <View className={classNames(styles.item, styles[`span${params.span || 1}`])} onClick={params.onClick}>
        <Image src={params.icon} className={styles.item_icon} />
        <View className={styles.item_content}>
          <View className={styles.item_title}>{params.title}</View>
          <View className={styles.item_desc}>{params.desc}</View>
        </View>

        {params.next && (
          <MMSpace className={styles.item_next} gap={5}>
            <Text>{params.next}</Text>
            <Image src={arrowIcon} style={{ width: 15, height: 15 }} />
          </MMSpace>
        )}
      </View>
    )
  }

  return (
    <View className={styles.scoreCardStyle}>
      {renderItem({
        span: 1,
        icon: iconScoreImg,
        title: intefralInfo?.availableScore || 0,
        desc: '我的积分',
        next: '查看明细',
        onClick: () => {
          Taro.navigateTo({ url: user.mobile ? routeNames.mineScoreRecord : routeNames.auth })
        }
      })}

      <MMDivider color={shopVariable.bodyBackground} style={{ width: '100%' }} />

      {renderItem({
        span: 2,
        icon: iconTaskImg,
        title: '我的任务',
        desc: '做任务得积分',
        onClick: () => {
          Taro.navigateTo({ url: user.mobile ? routeNames.taskCenterList : routeNames.auth })
        }
      })}
      {renderItem({
        span: 2,
        icon: iconExchangeImg,
        title: '积分兑换',
        desc: '积分兑换商城',
        onClick: () => {
          Taro.navigateTo({ url: routeNames.integralGoodsList })
        }
      })}
    </View>
  )
}

const ScoreCard = memo(Component)
export default ScoreCard
