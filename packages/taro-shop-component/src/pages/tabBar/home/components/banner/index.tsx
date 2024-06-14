import { FC, memo, useState } from 'react';
import { IBannerProps } from './const';
import { View, Swiper, SwiperItem, Button, Text, RichText } from '@tarojs/components';
import styles from './index.module.less';
import classNames from 'classnames';
import { useDidShow } from '@tarojs/taro';
import { BannerPositionOutputDto, api } from '@wmeimob/taro-api';
import LoadingView from '../loadingView';
import MMRichText from '../../../../../components/richText';
import { navByLink } from '../../../../../components/pageModules/utils';

const Component: FC<IBannerProps> = () => {
  const [current, setCurrent] = useState(0);

  const {loading, banners} = useBannerService()

  const onChange = (event) => {
    setCurrent(event.detail.current);
  }

  if (loading) {
    return <LoadingView />
  }

  return (
    <View className={styles.banner_container}>
      <Swiper
        className={styles.banner_view}
        current={current}
        onChange={onChange}
        circular
        autoplay
      >
        {banners.map((data, index) => (
          <SwiperItem key={index}>
            <View className={styles.banner_image} style={{ backgroundImage: `url(${data.imgUrl})` }}
              onClick={() => navByLink(Number(data.urlType) as any, data.url!)}
            >
              <View className={styles.banner_description}>
                <Text className='banner_title'>{data.name}</Text>
                {/* <Text className='banner_subtitle'>{fixText(image.content)}</Text> */}
                <MMRichText html={fixText(data.content)} className='banner_subtitle' />

                <Button className='banner_btn' onClick={() => navByLink(Number(data.urlType) as any, data.url!)}>查看更多</Button>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      <View className={styles['dot_container']}>
        {banners.map((_, index) => (
          <View
            key={index}
            className={classNames(styles['dot'], current === index? styles['dot_active'] : styles['dot_inactive'])}
           />
        ))}
      </View>
    </View>
  );
};

const Banner = memo(Component)
export default Banner

function useBannerService() {
  const [loading, setLoading] = useState(false)
  const [banners, setBanners] = useState<BannerPositionOutputDto[]>([])

  useDidShow(() => {
    getBanners()
  });

  /** 获取banners */
  async function getBanners() {
    setLoading(true)
    const { data = [] } = await api['/wechat/mall/banner/queryList_GET']({position: 'BANNER'})

    setBanners(data)
    setLoading(false)
  }

  return {loading, banners}
}

function fixText(text) {
  const replaceRegex = /(\n\r|\r\n|\r|\n)/g;

  return `<div style="text-align:center;">${text?.replace(replaceRegex, "<br/>")}</div>`;
}
