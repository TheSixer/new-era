import Taro from '@tarojs/taro'
import { View, Video } from '@tarojs/components'
import { getDefaultModuleVideoProps, IContentModuleVideoProps } from './const'
import styles from './index.module.less'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import { EVideoSource } from '@wmeimob-modules/decoration-data/src/enums/EVideoSource'
import { useState, useEffect, memo, FC } from 'react'

const Component: FC<IContentModuleVideoProps> = (props) => {
  const { componentStyle, videos, source, videoAddress, videoCoverImg, palySetting } = props

  const [height, setHeight] = useState(0)
  const { style } = useComponentStyle(componentStyle)

  useEffect(() => {
    const padding: number = (componentStyle.pagePadding || 0) * 2
    const hei = ((Taro.getSystemInfoSync().screenWidth - padding) / 345) * 140
    setHeight(hei)
  }, [])

  return (
    <View className={styles.contentModuleVideoStyle} style={style}>
      <View className={styles.videoWapper}>
        {source === EVideoSource.System &&
          videos.map((vd, idx) => (
            <Video
              src={vd}
              key={vd + idx}
              className={styles.video}
              autoplay={palySetting.autoplay}
              // showFullscreenBtn={false}
              showProgress={palySetting.progress}
              style={{ height }}
            />
          ))}

        {source === EVideoSource.External && (
          <Video
            src={videoAddress}
            poster={videoCoverImg}
            className={styles.video}
            showFullscreenBtn={false}
            autoplay={palySetting.autoplay}
            // showProgress={palySetting.progress}
            style={{ height }}
          />
        )}
      </View>
    </View>
  )
}

Component.defaultProps = getDefaultModuleVideoProps()

const ContentModuleVideo = memo(Component)
export default ContentModuleVideo
