import { FC, memo, useEffect, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { IDetailProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { PageContainer, Popup, useToast } from '@wmeimob/taro-design'
import Taro, { useRouter } from '@tarojs/taro'
import { ActivityOrderOutputDto, ActivityOutputDto, api } from '@wmeimob/taro-api'
import LoadingView from '../../../tabBar/home/components/loadingView'
import { EReservationStatus, MReservationStatus } from '../../../../enums/event/EReservationStatus'
import EventInfo from './components/EventInfo'
import ReservarionInfo from './components/ReservarionInfo'
import useGetLocation from '../../../../hooks/useGetLocation'
import TipsView from './components/tipsView'
import classNames from 'classnames'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import PopupQrCode from './components/popupQrCode'

const Component: FC<IDetailProps> = (props) => {
  const { params } = useRouter()
  const [toast] = useToast()
  const { location } = useGetLocation()
  const [visible, setVisible] = useState(false)
  const { loading, info, getEventInfo } = useBasicService(params.orderNo, location)

  /**
   * 点击核销
   *
   */
  const [handleCancel, confirmLoading] = useSuperLock(async () => {
    await api['/wechat/activity/cancelBook/{orderNo}_POST'](params.orderNo || '')

    toast?.message('取消成功')

    getEventInfo({
      orderNo: params.orderNo,
      latitude: 120.52,
      longitude: -122.12
    })
  })

  if (loading && !info) {
    return <LoadingView />
  }

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <MMNavigation title='预约详情' type="Transparent" />

      <View className={styles.container}>
        <View className={styles.reservation_status}>
          {MReservationStatus[info?.status || 0]}
        </View>
        <View className={styles.reservation__txt}>凭有效身份证件实名制入场</View>
        
        <View className={styles.event_content}>
          {info && <EventInfo data={info} />}

          {info && <ReservarionInfo data={info} />}

          <TipsView />

          <View className={styles.footer}>
            {
              info?.orderStatus === EReservationStatus.NoUse || info?.orderStatus === EReservationStatus.Arranged ? (
                <Button className={classNames(styles.btn, styles.cancel)} disabled={confirmLoading} loading={confirmLoading} onClick={handleCancel}>取消报名</Button>
              ) : null
            }
            {
              info?.orderStatus === EReservationStatus.Used || info?.orderStatus === EReservationStatus.Arranged ? (
                <Button className={classNames(styles.btn, styles.confirm)} onClick={() => setVisible(true)}>核销码</Button>
          ) : null
            }
          </View>
        </View>

      </View>

      {/* 底部栏 */}
      <PopupQrCode title={info?.activity?.name || ''} imgUrl={info?.qrCode || ''} visible={visible} onClose={() => setVisible(false)} />
    
    </PageContainer>
  )
}

const Cities = memo(Component)
export default Cities

function useBasicService(orderNo, location) {
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState<ActivityOrderOutputDto | null>(null)

  async function getEventInfo(params) {
    setLoading(true);
    const { data = {} } = await api['/wechat/activity/bookRecordDetail/{orderNo}_GET'](params)
    setInfo(data)
    setLoading(false);
  }

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getEventInfo({
        orderNo,
        latitude: 120.52,
        longitude: -122.12
      })
    }
  }, [orderNo, location])

  return {
    loading,
    info,
    getEventInfo
  }
}
