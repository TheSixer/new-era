import Taro, { createVideoContext, VideoContext } from '@tarojs/taro'
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState, FC } from 'react'
import { View, Text, Swiper, SwiperItem, Video, Image } from '@tarojs/components'
import { IGoodCoverProps, VIDEO_ID } from './const'
import styles from './index.module.less'
import { getResizeUrl, getVideoSnapshotUrl } from '@wmeimob/aliyun'
import icon_play from '../../images/icon_play.png'
import { systemConfig } from '../../../../../config'
import { getGlobalData } from '@wmeimob/taro-global-data'
const { config } = systemConfig

const Component: FC<IGoodCoverProps> = (props) => {
  const { bannersUrl = [], videoUrl } = props

  const [width, setWidth] = useState<number>()

  const [current, setCurrent] = useState(0)
  const [isVideoFullScreen, setIsVideoFullScreen] = useState(false)

  const showVedio = useMemo(() => config.enableGoodsDetailBannerVideo && !!videoUrl, [videoUrl]) // 是否显示视频

  const totalSwiper = showVedio ? bannersUrl.length + 1 : bannersUrl.length

  const [isFirstPlay, setIsFirstPlay] = useState(false) // 是否首次播放，显示自定义播放图标
  const [isPlaying, setIsPlaying] = useState(false) // 是否播放中，隐藏 swiper 的指示器

  const videoRef = useRef<VideoContext>()

  const style = useMemo(() => ({ width, height: width }), [width])

  useLayoutEffect(() => {
    const { screenWidth } = Taro.getSystemInfoSync()
    setWidth(screenWidth)
  }, [])

  // 切换的时候暂停播放视频
  useEffect(() => {
    if (current !== 0 && showVedio) {
      videoRef.current?.pause()
    }
  }, [current, showVedio])

  // 初始化视频
  useEffect(() => {
    if (showVedio) {
      videoRef.current = createVideoContext(VIDEO_ID)
    }
  }, [showVedio])

  function handleCustomPlayClick() {
    setIsFirstPlay(true)
    videoRef.current?.play()
  }

  function renderVideo() {
    if (!showVedio) return null

    return (
      <SwiperItem>
        <View className={styles.video}>
          <Video
            id={VIDEO_ID}
            src={videoUrl!}
            className={styles.video_internal}
            direction={0}
            poster={videoUrl! + getVideoSnapshotUrl({ width: 375 })}
            controls={isFirstPlay}
            showCenterPlayBtn={false}
            enableProgressGesture={false}
            loop
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            // https://blog.csdn.net/u014689760/article/details/125545583
            // video 组件父级不能存在定位，所以全屏时需要将定位去除
            onFullscreenChange={(event) => setIsVideoFullScreen(!!event.detail.fullScreen)}
          />
          {!isFirstPlay && <Image className={styles.video_playButton} src={icon_play} style={{ width: 50, height: 50 }} onClick={handleCustomPlayClick} />}
        </View>
      </SwiperItem>
    )
  }
  const isH5 = getGlobalData('isH5')
  return (
    <View className={isVideoFullScreen ? '' : styles.goodCoverStyle} style={style}>
      <Swiper autoplay={false} interval={3000} style={style} circular={!isH5} onChange={(ev) => setCurrent(ev.detail.current)}>
        {renderVideo()}

        {bannersUrl.map((item, index) => (
          <SwiperItem key={item + index} className={styles.swiperItem} style={style}>
            <View className={styles.img} style={{ backgroundImage: `url(${item + getResizeUrl(style)})`, ...style }} />
          </SwiperItem>
        ))}
      </Swiper>

      {!!totalSwiper && !isPlaying && (
        <View className={styles.swiper_tip}>
          <Text className={styles.swiper_tip_active}>{current + 1}</Text>/{totalSwiper}
        </View>
      )}
    </View>
  )
}

const GoodCover = memo(Component)
export default GoodCover
