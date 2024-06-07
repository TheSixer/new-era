import { getResizeUrl } from '@wmeimob/aliyun'
import { IModuleInfo, BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { EModuleCategory } from '@wmeimob-modules/decoration-data/src/enums/EModuleCategory'
import { EVideoSource } from '@wmeimob-modules/decoration-data/src/enums/EVideoSource'
import { FC, memo, useMemo } from 'react'
import useComponentStyle from '../../../hooks/useComponentStyle'
import { getDefaultProps, IVideoModuleProps } from './const'
import icon from './icon.png'
import styles from './index.module.less'
import settingComponet from './settingComponet'

const Component: FC<IVideoModuleProps> = (props) => {
  const { videos = [], source, videoAddress, videoCoverImg, componentStyle } = props

  const { style } = useComponentStyle(componentStyle)

  const isDefault = useMemo(() => {
    return (
      (props.source === EVideoSource.System && !props.videos.length) || (props.source === EVideoSource.External && !props.videoAddress && !props.videoCoverImg)
    )
  }, [props])

  return (
    <div className={styles.contentModuleVideoStyle} style={style}>
      {isDefault && (
        <div className={styles.defaultVideoWrapper}>
          <img src={icon} className={styles.defaultVideo} />
        </div>
      )}
      {!isDefault && source === EVideoSource.System && (
        <div className={styles.videoWrapper}>
          {videos.map((video, index) => (
            <video src={video} key={video + index} className={styles.video} />
          ))}
        </div>
      )}
      {!isDefault && source === EVideoSource.External && (
        <div className={styles.videoWrapper}>
          {videoCoverImg ? (
            <img src={videoCoverImg + getResizeUrl({ width: 375, height: 210 })} style={{ width: '100%', height: 210 }} />
          ) : (
            <video src={videoAddress} className={styles.video} />
          )}
        </div>
      )}
    </div>
  )
}

Component.displayName = 'VideoModule'
Component.defaultProps = getDefaultProps()

const VideoModule = memo(Component)
export default VideoModule

export const moduleInfo: IModuleInfo = {
  type: BasicModuleSignEnum.Video,
  cname: '视频',
  icon,
  category: EModuleCategory.Content,
  getDefaultProps,
  settingComponet
}
