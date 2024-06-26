// src/components/CustomSwiper/CustomSwiper.jsx
import { useEffect, useState } from 'react';
import { View, Image, Button } from '@tarojs/components';
import styles from './index.module.less';
import classNames from 'classnames';
import Title from '../title';
import Months from '../months';
import { ArrowDownFilled } from '../../../../../components/Icons';
import { BannerPositionOutputDto, api } from '@wmeimob/taro-api';
import { navByLink } from '../../../../../components/pageModules/utils';
import { MMEmpty } from '@wmeimob/taro-design';
import emptyImg from '../../../../../assets/images/icon_empty.png'
import { useDidShow } from '@tarojs/taro';

const CustomSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const {banners, loading} = useBannerService()
  const [images, setImages] = useState<BannerPositionOutputDto[]>([])
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleTouchStart = (event: any) => {
    setTouchStart(event.touches[0].clientX);
  }

  const handleTouchEnd = (event: any) => {
    const clientX = event.changedTouches[0].clientX;
    const diff = clientX - touchStart;
    if (diff > 0) {
      handleNext();
    } else if (diff < 0) {
      handlePrev();
    }
  }

  const handleChange = (month: number) => {
    setMonth(month)
  }

  useEffect(() => {
    let items = banners.filter(({applicableDate}) => new Date(applicableDate || '').getMonth() + 1 === month)
    while(items.length && items.length < 5) {  // 补充数据)
      items = items.concat(items)
    }
    setImages(items)
  }, [banners, month]);

  return (
    <View className={styles.premium_container}>

      <View className={styles.banner_title}>
        <Title title="尖货" subTitle='PREMIUM' />
      </View>

      <View>
        <Months onChange={handleChange} />
      </View>

      <View className={styles.swiper_view}>
        <View className={styles.swiper_container} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {images.map((image, index) => {
            const isCurrent = index === currentIndex;
            const isNext = index === (currentIndex + 1) % images.length;
            const isNNext = index === (currentIndex + 2) % images.length;
            const isPrev = index === (currentIndex - 1 + images.length) % images.length;
            const isPPrev = index === (currentIndex - 2 + images.length) % images.length;

            return (
              <View
                key={index}
                className={classNames(styles.swiper_slide,
                  isCurrent ? styles.current : '',
                  isNext ? styles.next : '',
                  isNNext ? styles.nnext : '',
                  isPrev ? styles.prev : '',
                  isPPrev ? styles.pprev : '')}
              >
                <View className={styles.swiper_slide_view}
                  onClick={() => navByLink(Number(image.urlType) as any, image.url!)}
                >
                  {/* <View className={styles.swiper_slide_content}>
                    <View className={styles.swiper_slide_title}>2024夏季新款忍者神龟联名棒球帽</View>
                    <Text className={styles.swiper_slide_price}>¥429</Text>
                  </View> */}
                  <Image src={image.imgUrl || ''} mode="aspectFill" className={styles.swiper_slide_image} style={{ width: '100%', height: '100%' }} />
                  {image.urlType ? <Button className={styles.swiper_slide_btn}>查看详情</Button> : null}
                  
                    {/* <View className={styles.swiper_slide_footer}>
                    <View className={styles.swiper_slide_footer__txt}>6月16日 10:00发售</View>
                    <Button className={classNames('banner_btn', styles.swiper_slide_btn)}>立即预约</Button> 
                  </View> */}
                </View>
              </View>
            );
          })}
          {images?.length > 0 ? (
            <>
              <View className={classNames(styles.swiper_button, styles.swiper_prev_btn)} onClick={handlePrev}>
                <ArrowDownFilled />
              </View>
              <View className={classNames(styles.swiper_button, styles.swiper_next_btn)} onClick={handleNext}>
                <ArrowDownFilled />
              </View>
            </>
          ) : null}

          {images?.length === 0 && !loading && <MMEmpty text='暂无数据' src={emptyImg} imgStyle={{ width: '64rpx', height: '64rpx' }} />}
        </View>
      </View>
    </View>
  );
};

export default CustomSwiper;

function useBannerService() {
  const [loading, setLoading] = useState(false)
  const [banners, setBanners] = useState<BannerPositionOutputDto[]>([])

  useDidShow(() => {
    getBanners()
  });

  /** 获取banners */
  async function getBanners() {
    setLoading(true)
    const { data = [] } = await api['/wechat/mall/banner/queryList_GET']({position: 'GOODS'})
    setBanners(data)
    setLoading(false)
  }

  return {loading, banners}
}
