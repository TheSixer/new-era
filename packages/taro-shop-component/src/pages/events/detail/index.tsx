import { FC, memo, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { IDetailProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { PageContainer } from '@wmeimob/taro-design'
import { PositionFilled } from '../../../components/Icons'
import Banner from './components/banner'
import Taro, { useRouter } from '@tarojs/taro'
import { ActivityOutputDto, api } from '@wmeimob/taro-api'
import LoadingView from '../../tabBar/home/components/loadingView'
import dayjs from 'dayjs'
import FooterBar from './components/footerBar'
import EventSkuPopup from '../../../components/event/eventSkuPopup'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import { routeNames } from '../../../routes'

const Component: FC<IDetailProps> = (props) => {
  const { params } = useRouter()
  const { loading, info, handleConfirm } = useBasicService(params.id)
  const [visible, setVisible] = useState(false)
  const { province = '', city = '', area = '', address = '' } = info || {}
  const addressDetail = `${province}${city}${area}${address}`

  if (loading) {
    return <LoadingView />
  }

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <View className={styles.navigator_bar}>
        <MMNavigation title='活动详情' type="Transparent" />
      </View>
      
      <View className={styles.banner}>
        <Banner data={info?.imgs?.split?.(',') || []} />
      </View>

      <View className={styles.container}>
        <View className={styles.event_title}>
        {info?.name}
        </View>
        
        <View className={styles.event_content}>
          <View className={styles.event_info_content}>
            <View className={styles.event_date}>{dayjs(info?.startTime).format('YYYY-MM-DD HH:mm')} - {dayjs(info?.endTime).format('YYYY-MM-DD HH:mm')}</View>
            <View className={styles.event_address}>{addressDetail}</View>
            <View className={styles.event_position}>
              <PositionFilled width="24rpx" height="24rpx" />
              <Text className={styles.event_position_text}>{info?.distance}km</Text>
            </View>
          </View>
          <View className={styles.event_price}>
            {!info?.bookFree ? '免费' : `${info?.bookFree}积分`}
          </View>
        </View>

        <View className={styles.event_member}>
          活动人数： {info?.activityMaxNum}
        </View>

      </View>

      {/* 底部栏 */}
      {info?.activityStatus !== 2 && <FooterBar info={info} onSign={() => setVisible(true)} />}

      <EventSkuPopup
        info={info}
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirm}
      />
    
    </PageContainer>
  )
}

const Cities = memo(Component)
export default Cities

function useBasicService(activityId) {
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState<ActivityOutputDto | null>(null)

  async function getEventInfo(id: string) {
    setLoading(true);
    const { data = {} } = await api['/wechat/activity/detail/{id}_GET'](id)
    setLoading(false);
    setInfo(data)
  }

  useEffect(() => {
    activityId && getEventInfo(activityId)
  }, [activityId])

  function handleConfirm(unifyId: number) {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.eventsSignUp,
        {
          activityId: info?.id,
          unifyId
        })
    })
  }

  return {
    loading,
    info,
    handleConfirm
  }
}
