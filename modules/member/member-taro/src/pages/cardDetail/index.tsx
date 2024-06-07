import { Image, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { api, MemCardDto, MemCardLevelDto, MemCardRelationDto } from '@wmeimob/taro-api'
import { MMRichText, Navigation, PageContainer, useToast } from '@wmeimob/taro-design'
import { EMemberLevel } from '@wmeimob-modules/member-data/src/enums/EMemberLevel'
import { useAtom } from 'jotai'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { memberCardRightDescAtom } from '../../store'
import styles from './index.module.less'
import icon_help from './images/icon_help.png'
import { mmDivide, mmMinus, mmTimes } from '@wmeimob/utils/src/mmCurrency'
import HeadTitle from './components/headTitle'
import RightsInfo from './components/rightsInfo'
import CardLevelSwiper from './components/cardLevelSwiper'
import MemberCard from '../cards/components/memberCard'
import { EMemberCardType } from '@wmeimob-modules/member-data/src/enums/EMemberCardType'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { getGlobalData } from '@wmeimob/taro-global-data'
import { isIphone } from '@wmeimob/taro-design/src/components/utils'

interface ICardDetailProps {
  service: ReturnType<typeof useService>

  /** 头像地址 */
  avatarUrl?: string

  /**
   * 点击会员权益说明
   */
  onRightDesClick(data: MemCardDto): void
}

const Component: FC<ICardDetailProps> = (props) => {
  const { service, avatarUrl = '' } = props

  const [, setDesc] = useAtom(memberCardRightDescAtom)

  const handleDescClick = () => {
    setDesc(service.card.richTextContent || '')
    props.onRightDesClick(service.card)
  }

  return (
    <PageContainer className={styles.cardDetailStyle} noPlace>
      <Navigation title="会员权益详情" />

      <View className={styles.rightDesc} onClick={handleDescClick}>
        <Image src={icon_help} style={{ width: 16, height: 16, marginRight: 4 }} />
        <View className={styles.rightDesc_content}>
          <Text>会员类型说明</Text>
        </View>
      </View>

      {service.card.upgrade ? (
        <CardLevelSwiper
          current={service.current}
          currentLevelInfo={service.currentLevelInfo}
          levelList={service.levelList}
          amount={service.memberInfo.amount!}
          avatarUrl={avatarUrl}
          onSwiperChange={(data) => service.setCurrent(data)}
        />
      ) : (
        <View style={{ padding: '0 15px' }}>
          <MemberCard data={service.card} onShowClick={handleDescClick} />
        </View>
      )}
      <View style={{ marginTop: 20 }}>
        <HeadTitle>会员权益</HeadTitle>
      </View>

      <View style={{ padding: '0 15px 10px 15px' }}>
        <RightsInfo data={service.currentLevel.rightsList} />
      </View>

      {service.card.upgrade && (
        <>
          <View style={{ marginTop: 10 }}>
            <HeadTitle>Lv{service.current + 1} 等级描述</HeadTitle>
          </View>

          <View className={styles.levleDescWrapper}>
            <View className={styles.levleDesc}>
              <MMRichText html={service.currentLevel.richTextContent} />
            </View>
          </View>
        </>
      )}
      <MMFixFoot backgroundColor={service.showBuy && '#ffffff'}>
        {service.showBuy && (
          <MMButton noBorder block onClick={service.handleCardBuy} loading={service.buyLoading}>
            立即开通(¥ {service.card.price})
          </MMButton>
        )}
      </MMFixFoot>
    </PageContainer>
  )
}

const CardDetail = memo(Component)
export default CardDetail

export interface ILevelList extends MemCardLevelDto {
  levelStatus: EMemberLevel
  levelUpMoney: number
}

export interface ICurrentLevelInfo {
  /** 进度 */
  progress: number
  /** 距离下一等级金额 */
  nextAmount: number
  /** 是否是满级 */
  isFull: boolean
}

export function useService() {
  const { params = {} } = useRouter()
  const { id } = params

  const [toast] = useToast()
  // 会员卡信息
  const [card, setCard] = useState<MemCardDto>({})
  // 当前会员卡等级
  const [current, setCurrent] = useState(0)
  // 会员信息
  const [memberInfo, setMemberInfo] = useState<MemCardRelationDto>({})

  // 是否显示购买按钮(付费卡并且没有关联关系)
  const showBuy = useMemo(() => {
    return card.type === EMemberCardType.NeedPay && !memberInfo.memCardId
  }, [card, memberInfo])

  // 当前等级
  const currentLevel = useMemo(() => {
    return card.levelList?.[current] || {}
  }, [current, card])

  /**
   * 会员卡等级信息
   * 合并解析出用户所属等级
   */
  const levelList = useMemo<ILevelList[]>(() => {
    const { levelList = [] } = card
    const { memCardLevelId, amount } = memberInfo

    const index = levelList.findIndex((level) => level.id === memCardLevelId)
    // 解析等级信息
    return levelList.map((level, idx) => {
      const levelStatus = idx === index ? EMemberLevel.Current : idx < index ? EMemberLevel.Unlocked : EMemberLevel.UnLock
      const levelUpMoney = mmMinus(level.valueStart, amount)
      return { ...level, levelStatus, levelUpMoney }
    })
  }, [card, memberInfo])

  /**
   * 当前等级进度以及距离下一等级金额差距
   */
  const currentLevelInfo = useMemo<ICurrentLevelInfo>(() => {
    const { amount = 0 } = memberInfo
    const currentIndex = levelList.findIndex((item) => item.levelStatus === EMemberLevel.Current)

    const info: ICurrentLevelInfo = {
      progress: 0,
      nextAmount: 0,
      isFull: false
    }
    info.isFull = currentIndex !== -1 && currentIndex === levelList.length - 1
    // 数据存在并且不是最后一个等级
    if (currentIndex !== -1 && currentIndex < levelList.length - 1) {
      const { valueEnd = 0, valueStart = 0 } = levelList[currentIndex]
      const len = mmMinus(valueEnd, valueStart)
      info.progress = len === 0 ? 0 : mmTimes(mmDivide(mmMinus(amount, valueStart), len), 100)
      info.nextAmount = mmMinus(valueEnd, amount)
    }
    return info
  }, [levelList, memberInfo])

  useEffect(() => {
    if (id && toast) {
      getCard()
    }
  }, [toast])

  const isWeapp = getGlobalData('isWeapp')

  /**
   * 购买会员卡
   */
  const [handleCardBuy, buyLoading] = useSuperLock(async () => {
    toast?.loading()
    try {
      if (isWeapp) {
        const { data = {} } = await api['/wechat/mall/memberCard/purchase_POST']({ id: card.id })
        const { nonceStr, packageValue, paySign, timeStamp, signType } = data.payParam as any
        try {
          await Taro.requestPayment({ nonceStr, package: packageValue, paySign, timeStamp, signType })
          await getUserMemberInfo()
          toast?.success('开通成功')
        } catch (error) {
          // 开发环境不会调用支付。默认成功了
          toast!.message('支付取消')
        }
      } else {
        // h5 支付
        const { data } = await api['/wechat/mall/memberCard/h5/purchase_POST']({ id: card.id })
        const { mwebUrl }: any = data?.payParam || {}
        const linkUrl = mwebUrl
        if (isIphone) {
          // 如果是iOS平台，使用location.href，iOS里面限制了window.open的使用。
          window.location.href = linkUrl
        } else {
          window.open(linkUrl)
        }
      }
    } catch (error) {
      toast?.fail('订单生成失败')
    }

    toast?.hideLoading()
  })

  /**
   * 获取会员卡信息
   */
  async function getCard() {
    toast?.loading()
    try {
      const { data = {} } = await api['/wechat/mall/memberCard/{id}_GET'](id as any)
      const memberInfo = await getUserMemberInfo()

      const { levelList = [] } = data
      const index = levelList.findIndex((level) => level.id === memberInfo.memCardLevelId)

      setCurrent(index === -1 ? 0 : index)
      setCard(data)
    } catch (error) {}
    toast?.hideLoading()
  }

  /**
   * 获取会员会员卡详情
   * @returns
   */
  async function getUserMemberInfo() {
    const { data = {} } = await api['/wechat/mall/memberCard/{id}/relation_GET'](id as any)
    setMemberInfo(data)
    return data
  }

  return {
    showBuy,
    memberInfo,
    currentLevelInfo,
    levelList,
    card,
    current,
    setCurrent,
    currentLevel,
    handleCardBuy,
    buyLoading
  }
}
