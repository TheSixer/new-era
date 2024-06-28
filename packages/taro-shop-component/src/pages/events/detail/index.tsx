import { FC, memo, useEffect, useState } from 'react'
import { View, Text, Button, Image, ScrollView } from '@tarojs/components'
import { IDetailProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { MMRichText, PageContainer, useToast } from '@wmeimob/taro-design'
import { PositionFilled } from '../../../components/Icons'
import Banner from './components/banner'
import Taro, { useLoad, useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { ActivityOutputDto, api } from '@wmeimob/taro-api'
import dayjs from 'dayjs'
import FooterBar from './components/footerBar'
import EventSkuPopup from '../../../components/event/eventSkuPopup'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import { routeNames } from '../../../routes'
import LoadingView from '../../../components/loadingView'
import ShareIcon from './images/icon_share.png'
import useGetLocation from '../../../hooks/useGetLocation'
import { useGlobalStore } from '@wmeimob/taro-store'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

const Component: FC<IDetailProps> = () => {
  const { params } = useRouter()
  const { user } = useGlobalStore()
  const { location } = useGetLocation()
  const { loading, info, handleConfirm } = useBasicService(params.id, location)
  const [visible, setVisible] = useState(false)
  const { province = '', city = '', area = '', address = '' } = info || {}
  const addressDetail = `${province}${city}${area}${address}`

  // 联系我们
  const contactUs = () => {
    Taro.showModal({
      title: '联系我们',
      content: '15001745846',
      confirmText: '拨号',
      success: (res) => {
        if (res.confirm) {
          Taro.makePhoneCall({ phoneNumber: '15001745846' })
        }
      }
    })
  }

  useLoad(async () => {
    //  获取进入页面参数 scene为1154===朋友圈进入
    // const data = Taro.getLaunchOptionsSync();
    //  开启分享
    Taro.showShareMenu({
      withShareTicket: true
    })
  })

  useShareAppMessage(() => {
    return {
      title: '活动详情',
      path: '/pages/events/detail/index?id=' + params.id + '&isTabber=true&redirectUrl=/pages/tabBar/home/index'
    };
  });

  useShareTimeline(() => {
    return {
      title: '活动详情',
      path: '/pages/events/detail/index?id=' + params.id + '&isTabber=true&redirectUrl=/pages/tabBar/home/index'
    };
  });

  const onConfirm = (unifyId: number) => {
    if (!user.mobile) {
      navByLink(EJumpType.DefaultNav, { url: routeNames.auth, params: {} })
    } else if (!user.registerIs) {
      navByLink(EJumpType.DefaultNav, { url: routeNames.webAuth, params: {} })
    } else {
      handleConfirm(unifyId)
    }
  }

  if (loading) {
    return <LoadingView />
  }

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <ScrollView className={styles.scroll} scrollY showScrollbar={false} enhanced={true}>
        <View className={styles.navigator_bar}>
          <MMNavigation title='活动详情'  type="Transparent" />
        </View>
        
        <View className={styles.banner}>
          <Banner data={info?.imgs?.split?.(',') || []} />

          <Button className={styles.share_btn} openType='share'>
            <Image src={ShareIcon} className={styles.share_icon} mode='aspectFit' />
          </Button>
        </View>

        <View className={styles.container}>
          <View className={styles.event_title}>
          {info?.name}
          </View>
          
          <View className={styles.event_content}>
            <View className={styles.event_info_content}>
              <View className={styles.event_date}>{dayjs(info?.startTime).format('YYYY-MM-DD HH:mm')} - {dayjs(info?.endTime).format('YYYY-MM-DD HH:mm')}</View>
              <View className={styles.event_address}>{addressDetail}</View>
              {info?.distance ? (<View className={styles.event_position}>
                <PositionFilled width="24rpx" height="24rpx" />
                <Text className={styles.event_position_text}>{info?.distance}km</Text>
              </View>) : null}
            </View>
            <View className={styles.event_price}>
              {!info?.bookFree ? '免费' : `${info?.bookFree}积分`}
            </View>
          </View>

          <View className={styles.event_member}>
            活动人数： {info?.activityMaxNum}
          </View>
          <View className={styles.event_desc}>
            <MMRichText html={info?.details} />
          </View>

          <View className={styles.event_desc_footer}>
            <View>如有问题，请<Text onClick={contactUs} className={styles.contact_us}>联系我们：15001745846</Text></View>
            <View>最终解释权归NEW ERA所有</View>
          </View>

        </View>

        {/* 底部栏 */}
        {info?.activityStatus !== 2 && <FooterBar info={info} onSign={() => setVisible(true)} />}

        <EventSkuPopup
          info={info}
          visible={visible}
          onClose={() => setVisible(false)}
          onConfirm={onConfirm}
        />
      </ScrollView>
    
    </PageContainer>
  )
}

const Cities = memo(Component)
export default Cities

function useBasicService(activityId, location) {
  const [toast] = useToast()
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState<ActivityOutputDto | null>(null)

  async function getEventInfo(id: number) {
    const { data = {} } = await api['/wechat/activity/detail/{id}_GET']({id, ...location})
    setLoading(false);
    setInfo(data)
  }

  useEffect(() => {
    if (location?.latitude && location?.longitude && activityId) {
      getEventInfo(activityId)
    } else if (activityId) {
      setLoading(true);
      getEventInfo(activityId)
    }
  }, [activityId, location])

  async function handleConfirm(unifyId: number) {
    toast?.loading()
    const { data: { book, white } } = await api['/wechat/activity/checkWhite/{activityId}_GET']({activityId, unifyId})
    toast?.hideLoading()
    if (info?.participate && !white) {
      toast?.message('此活动只能特殊用户报名')
      return
    }
    if (!book) {
      toast?.message('当前场次已满，请选择其他场次')
      return
    }
    Taro.navigateTo({
      url: getParamsUrl(routeNames.eventsSignUp,
        {
          activityId: info?.id,
          unifyId,
          ...location
        })
    })
  }

  return {
    loading,
    info,
    handleConfirm
  }
}
