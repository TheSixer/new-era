import { View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { api, MemCardDto } from '@wmeimob/taro-api'
import { PageContainer, Navigation, MMEmpty } from '@wmeimob/taro-design'
import { FC, memo, useState } from 'react'
import MemberCard from './components/memberCard'
import styles from './index.module.less'
import empty from './img_empty.png'

interface ICardsProps {
  service: ReturnType<typeof useService>

  /**
   * 点击查看权益按钮
   */
  onCardClick?(data: MemCardDto, index: number): void
}

const Component: FC<ICardsProps> = (props) => {
  const { service } = props
  const { cards = [], unOpenCards } = service
  return (
    <PageContainer className={styles.cardsStyle}>
      <Navigation title="我的会员" />
      {!cards.length&&!unOpenCards.length&&<MMEmpty fixed text="未搜索到相关数据" src={empty} imgStyle={{ width: 160, height: 160 }}/>}
      {cards.map((card, index) => (
        <View key={card.id} style={{ marginBottom: 15 }}>
          <MemberCard data={card} onShowClick={() => props.onCardClick?.(card, index)} />
        </View>
      ))}

      {!!unOpenCards.length && (
        <>
          {!!unOpenCards.length&&<View className={styles.moreTitle}>- 开启更多会员权益 -</View>}
          {unOpenCards.map((card, index) => (
            <View key={card.id} style={{ marginBottom: 15 }}>
              <MemberCard data={card} onShowClick={() => props.onCardClick?.(card, index)} />
            </View>
          ))}
        </>
      )}
    </PageContainer>
  )
}

const PageCards = memo(Component)
export default PageCards

export function useService() {
  // 会员卡数据
  const [cards, setCards] = useState<MemCardDto[]>([])

  const [unOpenCards, setUnOpenCards] = useState<MemCardDto[]>([]) // 没有开启的会员卡

  useDidShow(() => {
    getCards()
    getUnOpenCards()
  })

  // 获取会员卡
  async function getCards() {
    const { data = {} } = await api['/wechat/mall/memberCard_GET']({})
    const { list = [] } = data
    setCards(list)
  }

  // 获取未开通会员卡
  async function getUnOpenCards() {
    const { data = {} } = await api['/wechat/mall/memberCard/notHaveList_GET']({})
    const { list = [] } = data
    setUnOpenCards(list)
  }

  return {
    cards,
    unOpenCards
  }
}
