import Taro from '@tarojs/taro'
import { Swiper, SwiperItem, View } from '@tarojs/components'
import { getModuleLivePlayerDefaultProps, IBasicModuleLivePlayerProps, ILiveInfos } from './const'
import styles from './index.module.less'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import dayjs from 'dayjs'
import { getResizeUrl } from '@wmeimob/aliyun'
import classNames from 'classnames'
import TimeCountDown from './timeCountDown'
import { useEffect, useState, FC } from 'react'
import { routeNames } from '../../../../routes'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
// import SwiperBadge from '~/pages/usenx/goodsDetail/components/swiperBadge'

const Component: FC<IBasicModuleLivePlayerProps> = (props) => {
  const { data, componentStyle } = props

  const [liveStreaming, setLiveStreaming] = useState<any[]>([])
  const [lives, setLives] = useState<ILiveInfos[]>([])
  const { style } = useComponentStyle(componentStyle)
  const [height, setHeight] = useState(0)
  const [goodsImgHeight, setGoodsImgHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [current, setCurrent] = useState(0)

  // const swiperBadegRef = Taro.createRef<SwiperBadge>()
  useEffect(() => {
    // Promise.all(data.map(item => api.marketingMarketing['/marketing/web/liveStreaming/detail/{groupNo}_GET'](item.scheduleGroupNo)))
    //   .then(ress => ress.map(item => item.data || {}))
    //   .then(res => {
    //     setLiveStreaming(res)
    //     const cLives = calcCurrentLive(res)
    //     setLives(cLives)
    //   })
    // const padding: number = (componentStyle.pagePadding || 0) * 2
    // const wid = getMaxScreenWitdh() - padding
    // const hei = (wid / 345) * 150
    // const imgHei = (wid / 345) * 58
    // setHeight(hei)
    // setGoodsImgHeight(imgHei)
    // setWidth(wid)
  }, [data])

  const handleClick = (item: ILiveInfos, index: number) => {
    const customParams = encodeURIComponent(JSON.stringify({})) // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
    Taro.navigateTo({
      url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${item.roomId}&custom_params=${customParams}`
    })
  }

  const swiperChange = (event) => {
    setCurrent(event.detail.current)
    // const currentSwiper = event.detail.current
    // // FIXED: Taro H5 有bug.只能把更新操作范围缩小
    // if (swiperBadegRef.current) {
    //   swiperBadegRef.current!.updateCurrent(currentSwiper)
    // }
  }

  const calcCurrentLive = (liveStreamingData: any[]) => {
    return liveStreamingData
      .filter(({ scheduleList = [] }) => !!scheduleList.length)
      .map(({ scheduleList = [] }) => {
        const now = dayjs()
        let state = 1
        // 判断当前是否有匹配的直播间
        let suitSchedule = scheduleList.find((schedule) => {
          const { expectStartTime, expectEndTime } = schedule
          if (expectStartTime && expectEndTime) {
            return now.isBefore(dayjs(expectEndTime)) && now.isAfter(dayjs(expectStartTime))
          }
          return false
        })

        if (!suitSchedule) {
          // 判断第一个直播间是否是未开始
          const isNotStart = dayjs(scheduleList[0].expectStartTime).isAfter(now)
          if (isNotStart) {
            suitSchedule = scheduleList[0]
            state = 0
          } else {
            // 否则代表所有直播都已经结束
            suitSchedule = scheduleList[scheduleList.length - 1]
            state = 2
          }
        }
        const { id = '', roomId = '', liveStreamingRoom = {}, expectStartTime, expectEndTime } = suitSchedule!
        const { name = '', coverImg = '', goods = [] } = liveStreamingRoom
        return {
          id,
          name,
          roomId,
          coverImg,
          goods,
          state,
          expectStartTime,
          expectEndTime
        }
      }) as ILiveInfos[]
  }

  return (
    <View className={styles.basicModuleLivePlayerStyle} style={style}>
      <Swiper
        style={{ height: `${height}px` }}
        className={styles.banner}
        indicator-dots={false}
        interval={3000}
        duration={500}
        autoplay={true}
        onChange={(event) => swiperChange(event)}
      >
        {lives.map((item, idx) => (
          <SwiperItem key={item.id} className={styles.bannerItem}>
            <View className={styles.wrapperContent}>
              <View
                className={styles.cover}
                style={{
                  height: `${height - 20}px`,
                  width: `${height - 20}px`,
                  background: `url(${item.coverImg}) no-repeat center / 100% 100%`
                }}
                onClick={() => handleClick(item, idx)}
              >
                {item.state === 0 && (
                  <TimeCountDown
                    expectStartTime={item.expectStartTime}
                    onEnd={() => {
                      calcCurrentLive(liveStreaming)
                    }}
                  />
                )}
                {item.state === 1 && <View className={styles.redState}>直播中</View>}
                {item.state === 2 && <View className={styles.redState}>直播已结束</View>}
              </View>
              <View className={styles.contentRight}>
                <View>{item.name}</View>
                <View className={styles.goods}>
                  {item.goods.map(
                    (goodsItem, index) =>
                      index < 3 && (
                        /*
                        * TODO: usenxGoodsDetail是什么页面
                        * */
                        <View
                          onClick={() => Taro.navigateTo( { url: getParamsUrl(routeNames.usenxGoodsDetail, { id: goodsItem.goodsNo })  })}
                          className={styles.goodImg}
                          key={goodsItem.id}
                          style={{
                            height: `${goodsImgHeight}px`,
                            width: `${goodsImgHeight}px`,
                            background: goodsItem.goodsCoverImage
                              ? `#f5f5f5 url(${goodsItem.goodsCoverImage + getResizeUrl({
                                width: 58,
                                height: 58
                              })}) no-repeat center / 100% 100%`
                              : `#f5f5f5`
                          }}
                        >
                          {item.goods.length > 3 && index === 2 &&
                          <View className={styles.totleBk}>共{item.goods.length}件</View>}
                        </View>
                      )
                  )}
                </View>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <View className={styles.dotWrapper}>
        {lives.map((item, index) => (
          <View key={item.id} className={classNames(styles.dot, current === index && styles.dotActive)} />
        ))}
      </View>
      {/* <SwiperBadge ref={swiperBadegRef} total={lives.length} /> */}
    </View>
  )
}

Component.options = {
  addGlobalClass: true
}
Component.defaultProps = getModuleLivePlayerDefaultProps()

const BasicModuleLivePlayer = Component
export default BasicModuleLivePlayer
