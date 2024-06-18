import { memo, FC, useState } from 'react'
import { Button, Image, Video, View } from '@tarojs/components'
import { IAboutUsProps } from './const'
import styles from './index.module.less'
import Title from '../title';
import { BannerPositionOutputDto, api } from '@wmeimob/taro-api';
import { useDidShow } from '@tarojs/taro';
import { MMRichText } from '@wmeimob/taro-design';
import { navByLink } from '../../../../../components/pageModules/utils';

const Component: FC<IAboutUsProps> = () => {
  const { banners } = useBannerService()

  return (
    <View>
      {
        banners.slice(0, 1).map((item) => (
          <View className={styles.about_us_container} key={item.id}>
            {item.bannerType ? <Video src={item.imgUrl || ''} className={styles.about_us_video} autoplay={true} loop={true} controls={false} key={item.id} /> : <Image src={item.imgUrl || ''} className={styles.about_us_video} key={item.id} />}
            
            <View className={styles.about_us_contain}>
              <View className={styles.banner_title}>
                <Title title="品牌故事" subTitle='ABOUT US' />
              </View>
              
              <View className={styles.about_us_content}>
                {/* <View className={styles.about_us_content__text}>NEW ERA诞生于1920年</View>
                <View className={styles.about_us_content__text}>是来自于美国的知名制帽品牌</View> */}
                <MMRichText html={fixText(item.content)} className={styles.about_us_content__text} />
                
                <Button className='banner_btn'
                  onClick={() => navByLink(Number(item.urlType) as any, item.url!)}
                >查看更多</Button>
              </View>
            </View>
          </View>
        ))  
      }
    </View>
  );
}

const CustomActivitiesItem = memo(Component)
export default CustomActivitiesItem

function useBannerService() {
  const [loading, setLoading] = useState(false)
  const [banners, setBanners] = useState<BannerPositionOutputDto[]>([])

  useDidShow(() => {
    getBanners()
  });

  /** 获取banners */
  async function getBanners() {
    setLoading(true)
    const { data = [] } = await api['/wechat/mall/banner/queryList_GET']({position: 'BRAND_STORY'})

    // eslint-disable-next-line id-length
    setBanners(data?.sort((a, b) => a.sort - b.sort))
    setLoading(false)
  }

  return {loading, banners}
}

function fixText(text) {
  const replaceRegex = /(\n\r|\r\n|\r|\n)/g;

  return `<div style="text-align:center;">${text?.replace?.(replaceRegex, "<br/>")}</div>`;
}
