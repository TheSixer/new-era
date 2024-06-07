import { Image, Text, View } from '@tarojs/components'
import { EFrontendSignStatus } from '@wmeimob-modules/task-data/src/enums/EFrontendSignStatus'
import { ESignType } from '@wmeimob-modules/task-data/src/enums/ESignType'
import { api, SigninOutputDto } from '@wmeimob/taro-api'
import MMCalendar from '@wmeimob/taro-calendar/src/components/calendar'
import { Button, Navigation, PageContainer, useToast } from '@wmeimob/taro-design'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { useSetAtom } from 'jotai'
import { FC, memo, useEffect, useState } from 'react'
import { frontendSignStatusAtom, signTaskExplainAtom } from '../../store'
import icon_info from './images/icon_info.png'
import icon_sign from './images/icon_sign.png'
import styles from './index.module.less'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'

interface ISignTaskProps {
  service: ReturnType<typeof useService>
  isNoStatusBar?: boolean
}

const Component: FC<ISignTaskProps> = (props) => {
  const {
    service: { today, currentMonth, detail, signDates, handleExplainClick, handleMonthChange, handleSign, loadingHandleSign },isNoStatusBar = false
  } = props

  return (
    <PageContainer className={classnames(styles.page,isNoStatusBar&&styles.page_h5)} noPlace>
      <Navigation title="签到任务" type="Transparent" />
      <View className={styles.header}>
        <Image src={icon_sign} className={styles.icon_sign} />
        <View className={styles.totalSign}>
          <View className={styles.totalSign_title}>已连续签到</View>
          <View>
            <Text className={styles.totalSign_num}>{detail?.continuousDays || 0}</Text>
            <Text className={styles.totalSign_unit}>天</Text>
          </View>
        </View>

        {!!detail && (
          <View className={styles.explain} onClick={handleExplainClick}>
            <Image src={icon_info} className={styles.icon_info} />
            <Text>签到说明</Text>
          </View>
        )}
      </View>

      <View className={styles.overview}>
        <View className={styles.overview_item}>
          <View className={styles.overview_item_label}>已累计签到</View>
          <Text className={styles.overview_item_value}>
            <Text className={styles.overview_item_num}>{detail?.totalDays || 0}</Text>
            <Text>天</Text>
          </Text>
        </View>

        <View className={styles.overview_item}>
          <View className={styles.overview_item_label}>
            <Text>签到累计获得</Text>

            <View className={styles.tooltip}>
              <Text className={styles.tooltip_tip}>今日签到</Text>
              <Text className={styles.tooltip_num}>{`+${detail?.num || 0}积分`}</Text>
            </View>
          </View>
          <Text className={styles.overview_item_value}>
            <Text className={styles.overview_item_num}>{detail?.totalScore || 0}</Text>
            <Text>积分</Text>
          </Text>
        </View>
      </View>

      <View className="spacing" />

      <MMCard>
        <MMCalendar
          month={currentMonth}
          onMonthChange={handleMonthChange}
          renderLabel={(date, options) => {
            const dateString = date.format('YYYY-MM-DD')
            const isTodaySign = signDates[dateString]

            return (
              <View
                className={classnames({
                  [styles.cell]: true,
                  [styles.cell__isSign]: signDates[dateString],
                  [styles.cell__isThisMonth]: options.isThisMonth,
                  [styles.cell__isSelected]: isTodaySign ? false : date.isSame(today, 'date')
                })}
              >
                {date.date()}
              </View>
            )
          }}
        />
      </MMCard>

      <View className="spacing" />

      {!!detail && (
        <MMFixFoot border>
          <Button  block size="large" disabled={detail.status} loading={loadingHandleSign} onClick={handleSign}>
            {detail.status ? '当日已签到' : '立即签到'}
          </Button>
        </MMFixFoot>
      )}
    </PageContainer>
  )
}

const PageSignTask = memo(Component)
export default PageSignTask

export function useService(options: {
  /** 跳转签到说明 */
  toExplain(): void
}) {
  const [toast] = useToast()

  const setSignStatus = useSetAtom(frontendSignStatusAtom)
  const setSignTaskExplain = useSetAtom(signTaskExplainAtom)

  const [detail, setDetail] = useState<SigninOutputDto>()
  const [signDates, setSignDates] = useState<Record<string, any>>({})

  const [today] = useState(() => dayjs())
  const [currentMonth, setCurrentMonth] = useState(() => dayjs())

  useEffect(() => {
    getData()
    getSignDates(currentMonth)
  }, [])

  const getData = async () => {
    const { data = {} } = await api['/wechat/mall/signin/detail_GET']()

    setDetail(data)
    data.status && setSignStatus(EFrontendSignStatus.SignInAlreadySuccess)
  }

  const getSignDates = async (dayjsObj: dayjs.Dayjs) => {
    const { data = [] } = await api['/wechat/mall/signin/switch_GET']({ date: dayjsObj.format('YYYY-MM') })
    setSignDates(data.reduce((obj, date) => ({ ...obj, [date]: true }), {}))
  }

  const handleExplainClick = () => {
    setSignTaskExplain(detail?.description || '')
    options.toExplain()
  }

  const [handleMonthChange] = useSuperLock(async (dayjsObj: dayjs.Dayjs) => {
    // 今天之后的签到数据就不用查了
    const isAfterToday = dayjsObj.isAfter(today, 'month')

    if (isAfterToday) {
      setCurrentMonth(dayjsObj)
      return
    }

    await getSignDates(dayjsObj)
    setCurrentMonth(dayjsObj)
  })

  const [handleSign, loadingHandleSign] = useSuperLock(async () => {
    await api['/wechat/mall/signin_PUT']({ type: ESignType.Manual })
    await Promise.all([getData(), getSignDates(currentMonth)])

    toast?.success('签到成功')

    setSignStatus(EFrontendSignStatus.SignInAlreadySuccess)
  })

  return {
    today,
    currentMonth,
    detail,
    signDates,
    loadingHandleSign,
    handleSign,
    handleMonthChange,
    handleExplainClick
  }
}
