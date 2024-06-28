import { FC, memo, useEffect, useState } from 'react'
import { View, Image, Button } from '@tarojs/components'
import { IDetailProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import Taro, { useRouter } from '@tarojs/taro'
import { ActivityOrderOutputDto, api } from '@wmeimob/taro-api'
import { EReservationStatus, MReservationStatus } from '../../../../enums/event/EReservationStatus'
import EventInfo from './components/EventInfo'
import ReservarionInfo from './components/ReservarionInfo'
import useGetLocation from '../../../../hooks/useGetLocation'
import TipsView from './components/tipsView'
import classNames from 'classnames'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import PopupQrCode from './components/popupQrCode'
import noUseImg from './images/no-use.png';
import usedImg from './images/used.png';
import LoadingView from '../../../../components/loadingView'

const Component: FC<IDetailProps> = () => {
  const { params } = useRouter()
  const [toast] = useToast()
  const { location } = useGetLocation()
  const [visible, setVisible] = useState(false)
  const { loading, info, getEventInfo } = useBasicService(params.orderNo, location)

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
  const [handleCheck, checkLoading] = useSuperLock(async () => {
    toast?.loading()
    try {
      await api['/wechat/activity/userCheck/{orderNo}_POST']({
        orderNo: params?.orderNo
      })
      toast?.success('核销成功')

      getEventInfo({
        orderNo: params.orderNo,
        ...location
      })
    } catch (error) {
    }
    toast?.hideLoading()
  })

  const handleCancel = () => {
    Taro.showModal({
      content: '确认取消报名？',
      confirmColor: '#BC9B6A',
      success: (res) => {
        if (res.confirm) {
          conformCancel()
        }
      }
    })
  }

  /**
   * 确认取消
   *
   */
  const [conformCancel, cancelLoading] = useSuperLock(async () => {
    await api['/wechat/activity/cancelBook/{orderNo}_POST'](params.orderNo || '')

    toast?.message('取消成功')

    getEventInfo({
      orderNo: params.orderNo,
      ...location
    })
  })

  const handleClose = () => {
    setVisible(false)
    getEventInfo({
      orderNo: params.orderNo,
      ...location
    })
  }

  if (loading && !info) {
    return <LoadingView />
  }

  return (
    <PageContainer
      className={classNames(styles.prefectureStyle, {
        [styles.special]: info?.special,
        [styles.canceled]: info?.orderStatus === EReservationStatus.Used || info?.orderStatus === EReservationStatus.Canceled
      })}
    noPlace>
      <MMNavigation title='预约详情' type="Transparent" />

      <View className={classNames(styles.container, {
        [styles.canceled_body]: info?.orderStatus === EReservationStatus.Canceled,
        [styles.finished]: info?.orderStatus === EReservationStatus.Used
      })}>
        <View className={styles.reservation_status}>
          {MReservationStatus[info?.orderStatus || 0]}
        </View>
        <View className={styles.reservation__txt}>凭有效身份证件实名制入场</View>
        
        <View className={styles.event_content}>
          {info && <EventInfo data={info} />}

          {info && <ReservarionInfo data={info} />}

          <TipsView />

          <View className={styles.footer}>
            {
              info?.orderStatus === EReservationStatus.NoUse || info?.orderStatus === EReservationStatus.Arranged ? (
                <Button className={classNames(styles.btn, styles.cancel)} disabled={cancelLoading} loading={cancelLoading} onClick={handleCancel}>取消报名</Button>
              ) : null
            }
            {
              info?.checkType !== 2 && (info?.orderStatus === EReservationStatus.Used || info?.orderStatus === EReservationStatus.Arranged) ? (
                <Button className={classNames(styles.btn, styles.confirm)} onClick={() => setVisible(true)}>
                  核销码
                </Button>
              ) : null
            }
            {
              info?.checkType === 2 && info?.orderStatus === EReservationStatus.Arranged ? (
                <Button className={classNames(styles.btn, styles.confirm)} disabled={checkLoading} loading={checkLoading} onClick={handleConfirm}>
                  确认核销
                </Button>
              ) : null
            }
          </View>

          {info?.orderStatus === EReservationStatus.Arranged ? <Image className={styles.status_icon} src={noUseImg} mode="aspectFill" /> : null}
          {info?.orderStatus === EReservationStatus.Used ? <Image className={styles.status_icon} src={usedImg} mode="aspectFill" /> : null}
        </View>

      </View>

      {/* 底部栏 */}
      <PopupQrCode
        title={info?.activity?.name || ''}
        imgUrl={info?.qrCode || ''}
        verifyCode={info?.verifyCode}
        visible={visible}
        finished={info?.orderStatus === EReservationStatus.Used || info?.orderStatus === EReservationStatus.Canceled}
        onClose={handleClose}
      />
    
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
    if (!location || (location?.latitude && location?.longitude)) {
      getEventInfo({
        orderNo,
        ...location
      })
    }
  }, [orderNo, location])

  return {
    loading,
    info,
    getEventInfo
  }
}
