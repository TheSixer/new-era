import { FC, memo, useEffect, useState } from 'react'
import { View, Button } from '@tarojs/components'
import { IDetailProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import Taro, { useRouter } from '@tarojs/taro'
import { ActivityOrderOutputDto, api } from '@wmeimob/taro-api'
import { EReservationStatus } from '../../../../enums/event/EReservationStatus'
import EventInfo from './components/EventInfo'
import ReservarionInfo from './components/ReservarionInfo'
import useGetLocation from '../../../../hooks/useGetLocation'
import classNames from 'classnames'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import LoadingView from '../../../../components/loadingView'

const Component: FC<IDetailProps> = () => {
  const { params } = useRouter()
  const [toast] = useToast()
  const { location } = useGetLocation()
  const { loading, info } = useBasicService(params.verifyCode, location)

  const handleConfirm = () => {
    Taro.showModal({
      content: '是否确认核销？',
      confirmColor: '#BC9B6A',
      success: (res) => {
        if (res.confirm) {
          handleCheck()
        }
      }
    })
  }

  /**
   * 点击核销
   *
   */
  const [handleCheck, confirmLoading] = useSuperLock(async () => {
    toast?.loading()
    try {
      await api['/wechat/activity/check/{verifyCode}_POST'](params)
      toast?.success('核销成功')
      Taro.navigateBack()
    } catch (error) {
    }
    toast?.hideLoading()
  })

  if (loading && !info) {
    return <LoadingView />
  }

  return (
    <PageContainer
      className={classNames(styles.prefectureStyle, {
        [styles.canceled]: info?.orderStatus === EReservationStatus.NoUse || info?.orderStatus === EReservationStatus.Canceled,
        [styles.special]: info?.special
      })}
    noPlace>
      <MMNavigation title='预约详情' type="Transparent" />

      <View className={classNames(styles.container, {[styles.finished]: info?.orderStatus === EReservationStatus.NoUse})}>
        <View style={{ height: '100rpx' }} />
        
        <View className={styles.event_content}>
          {info && <EventInfo data={info} />}

          {info && <ReservarionInfo data={info} />}

          <View style={{ height: '230rpx' }} />

          <View className={styles.footer}>
            {
              info?.orderStatus === EReservationStatus.NoUse || info?.orderStatus === EReservationStatus.Arranged ? (
                <Button loading={confirmLoading} disabled={confirmLoading} className={classNames(styles.btn, styles.confirm)} onClick={handleConfirm}>确认核销</Button>
              ) : null
            }
          </View>

        </View>

      </View>

    </PageContainer>
  )
}

const Cities = memo(Component)
export default Cities

function useBasicService(verifyCode, location) {
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState<ActivityOrderOutputDto | null>(null)

  async function getEventInfo(params) {
    setLoading(true);
    const { data = {} } = await api['/wechat/activity/bookRecordDetail/check/{verifyCode}_GET'](params)
    setInfo(data)
    setLoading(false);
  }

  useEffect(() => {
    if (verifyCode && location.latitude && location.longitude) {
      getEventInfo({
        verifyCode,
        ...location
      })
    }
  }, [verifyCode, location])

  return {
    loading,
    info,
    getEventInfo
  }
}
