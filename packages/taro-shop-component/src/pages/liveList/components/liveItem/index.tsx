import Taro, { getWindowInfo } from '@tarojs/taro'
import { memo, useEffect, useState, FC } from 'react'
import { Image, View } from '@tarojs/components'
import { ICollectionItemProps } from './const'
import styles from './index.module.less'
import { MLiveStatus } from '../../const'
import icon_time from './icon_time.png'
import icon_play from './icon_play.png'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { routeNames } from '../../../../routes'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const Component: FC<ICollectionItemProps> = (props) => {
  const { data } = props

  const [imgHeight,setImgHeight] = useState(194)
  const {screenWidth} = getWindowInfo()
  useEffect(()=>{
    const width = screenWidth - 30;
    const height = 0.5625 *width;
    setImgHeight(height)
  },[screenWidth])
  return (
    <View className={styles.liveItem} onClick={() => Taro.navigateTo({ url: getParamsUrl(routeNames.live, { liveId: data.liveId }) })}>
      <View
        className={styles.liveItemStyle}
      >
        <View className={styles.imageWrapper} style={{height:imgHeight}}>
          <View
            className={classNames(styles.liveStatus, styles[data.liveStatus!])}>{MLiveStatus[data.liveStatus!]}</View>
          <Image mode="widthFix" className={styles.liveImage} src={data.coverImage!} />
          <View className={styles.liveMask}/>
          <Image className={styles.livePlay} src={icon_play} />
        </View>

        <View className={styles.content}>
          <View className={styles.name}>{data.name}</View>

          <View className={styles.liveTime}>
            <Image className={styles.iconTime} src={icon_time} />
            <View className={styles.timeText}>{dayjs(data.liveTime!).format('YYYY-MM-DD HH:mm')}</View>
          </View>
        </View>
      </View>
    </View>
  )
}

const LiveItem = memo(Component)
export default LiveItem
