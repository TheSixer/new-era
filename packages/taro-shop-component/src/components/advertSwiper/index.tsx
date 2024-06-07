import { Swiper, SwiperItem, View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { useDebounceFunction } from '@wmeimob/utils/src/hooks/useDebounceFunction'
import classNames from 'classnames'
import { FC, memo, useEffect, useState } from 'react'
import { systemConfig } from '../../config'
import { BannerPositionOutputDto, api } from '@wmeimob/taro-api'
import { navByLink } from '../pageModules/utils'
import { IAdvertSwiperProps } from './const'
import styles from './index.module.less'
import { getGlobalData } from '@wmeimob/taro-global-data'

const { measure } = systemConfig.advertiseConfig
const [width, height] = measure

/**
 * 广告位轮播组件
 *
 * 图片宽高使用配置信息。要改配置文件
 * @param props
 * @returns
 */
const Component: FC<IAdvertSwiperProps> = (props) => {
  const { type, className, style } = props
  const [imageList, setImageList] = useState<BannerPositionOutputDto[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    getList()
  }, [type])

  useDidShow(() => {
    getList()
  })

  const getList = useDebounceFunction(async () => {
    if (!type) {
      return
    }

    const { data = [] } = await api['/wechat/mall/banner/queryList/{position}_GET'](type as any)
    setImageList(data)
  }, 50)

  const isH5 = getGlobalData('isH5')

  return !imageList.length ? null : (
    <View className={classNames(styles.advertSwiperStyle, className)} style={style}>
      <View className={styles.content} style={{ width: `calc(100vw / 375 * ${width})`, height: `calc(100vw / 375 * ${height})` }}>
        <Swiper style={{ borderRadius: 8, width: `calc(100vw / 375 * ${width})`, height: `calc(100vw / 375 * ${height})`}} autoplay interval={3000} duration={500} circular={!isH5} onChange={(ev) => setCurrent(ev.detail.current)}>
          {imageList.map((data) => (
            <SwiperItem key={data.id}>
              <View
                style={{ background: `url(${data.imgUrl }) no-repeat center / cover`, width: `calc(100vw / 375 * ${width})`, height: `calc(100vw / 375 * ${height})` }}
                className={styles.swiperItem}
                onClick={() => navByLink(Number(data.urlType) as any, data.url!)}
              />
            </SwiperItem>
          ))}
        </Swiper>

        {/* 点样式 */}
        <View className={styles.dotWrapper}>
          {imageList.map((item, index) => (
            <View key={item.id} className={classNames(styles.dot, current === index && styles.dotActive)} />
          ))}
        </View>
      </View>
    </View>
  )
}

const AdvertSwiper = memo(Component)
export default AdvertSwiper
