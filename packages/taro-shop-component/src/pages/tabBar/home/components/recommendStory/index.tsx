// src/components/CustomSwiper/CustomSwiper.jsx
import { useEffect, useState } from 'react'
import { View, Text, Button, Image, Swiper, SwiperItem } from '@tarojs/components'
import styles from './index.module.less'
import Title from '../title'
import Decorate from '../../../../../assets/images/home/decorate.png'
import { BannerPositionOutputDto, api } from '@wmeimob/taro-api'
import { navByLink } from '../../../../../components/pageModules/utils'
import { MMEmpty, MMRichText } from '@wmeimob/taro-design'
import emptyImg from '../../../../../assets/images/icon_empty.png'
import { useDidShow } from '@tarojs/taro'

const CustomSwiper = ({ style = {} }) => {
  const { loading, banners } = useBannerService()

  const [currentIndex, setCurrentIndex] = useState(0)

  if (banners?.length === 0) {
    return null
  }

  return (
    <View className={styles.rcd_story}>
      <View className={styles.banner_title}>
        <Title title="推荐故事" subTitle="KEY STORY" />
      </View>

      <View className={styles.rcd_swiper}>
        {banners?.length > 0 ? (
          <>
            <Swiper
              current={currentIndex}
              className={styles.swiper_container}
              style={{ ...style }}
              nextMargin="216rpx"
              displayMultipleItems={banners?.length > 1 ? 2 : 1}
              onChange={(event) => setCurrentIndex(event.detail.current)}
            >
              {banners.map((image, index) => (
                <SwiperItem key={index}>
                  <View key={index} className={styles.banner_item} onClick={() => navByLink(Number(image.urlType) as any, image.url!)}>
                    <Image className={styles.banner_item_img} src={image.imgUrl as string} mode="aspectFill" />
                  </View>
                </SwiperItem>
              ))}
            </Swiper>
            <Image className={styles.decorate} src={Decorate} mode="widthFix" />
          </>
        ) : !loading ? (
          <MMEmpty text='暂无数据' src={emptyImg} imgStyle={{ marginTop: '100rpx', width: '64rpx', height: '64rpx' }} />
        ) : null}
      </View>

      {banners?.length > 0 && (
        <View className={styles.banner_description}>
          <Text className="banner_title">{banners[currentIndex]?.name || ''}</Text>
          <MMRichText html={fixText(banners[currentIndex]?.content || '')} className="banner_subtitle" />

          <Button className="banner_btn" onClick={() => navByLink(Number(banners[currentIndex]?.urlType) as any, banners[currentIndex]?.url as string)}>
            查看更多
          </Button>
        </View>
      )}
    </View>
  )
}

export default CustomSwiper

function useBannerService() {
  const [loading, setLoading] = useState(false)
  const [banners, setBanners] = useState<BannerPositionOutputDto[]>([])

  useDidShow(() => {
    getBanners()
  })

  /** 获取banners */
  async function getBanners() {
    setLoading(true)
    const { data = [] } = await api['/wechat/mall/banner/queryList_GET']({ position: 'MAIN_STORY' })
    setBanners(data)
    setLoading(false)
  }

  return { loading, banners }
}

function fixText(text) {
  const replaceRegex = /(\n\r|\r\n|\r|\n)/g

  return `<div style="text-align:center;">${text?.replace?.(replaceRegex, '<br/>')}</div>`
}
