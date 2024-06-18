// src/components/CustomSwiper/CustomSwiper.jsx
import { useEffect, useState } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import styles from './index.module.less';
import './index.less';
import Title from '../title';
import Decorate from '../../../../../assets/images/home/decorate.png';
import { BannerPositionOutputDto, api } from '@wmeimob/taro-api';
import { navByLink } from '../../../../../components/pageModules/utils';
import { MMRichText } from '@wmeimob/taro-design';

const CustomSwiper = ({ style = {} }) => {
  const { banners } =useBannerService();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStart, setTouchStart] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const handleTouchStart = (event: any) => {
    setTouchStart(event.touches[0].clientX);
  }

  const handleTouchEnd = (event: any) => {
    const clientX = event.changedTouches[0].clientX;
    const diff = clientX - touchStart;
    if (diff > 0) {
      handlePrev();
    } else if (diff < 0) {
      handleNext();
    }
  }

  return (
    <View className={styles.rcd_story}>

      <View className={styles.banner_title}>
        <Title title="推荐故事" subTitle='KEY STORY' />
      </View>

      <View className={styles.rcd_swiper}>
        <View className='swiper-container' style={{...style}}>
          <View className='swiper-body' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {banners.map((image, index) => {
              const isCurrent = index === currentIndex;
              const isNext = index === (currentIndex + 1) % banners.length;
              const isNNext = index === (currentIndex + 2) % banners.length;
              const isPrev = index === (currentIndex - 1 + banners.length) % banners.length;
              const isPPrev = index === (currentIndex - 2 + banners.length) % banners.length;

              return (
                <View
                  key={index}
                  className={`swiper-slide ${isCurrent ? 'current' : ''} ${isNext ? 'next' : ''}  ${isNNext ? 'nnext' : ''}  ${isPrev ? 'prev' : ''} ${isPPrev ? 'pprev' : ''}`}
                  style={{ backgroundImage: `url(${image.imgUrl})` }}
                  onClick={() => navByLink(Number(image.urlType) as any, image.url!)}
                />
              );
            })}
          </View>
          
          {/* <View className='swiper-button prev' onClick={handlePrev}>‹</View>
          <View className='swiper-button next' onClick={handleNext}>›</View> */}

        </View>

        <Image className={styles.decorate} src={Decorate}  mode='widthFix' />
      </View>
      <View className={styles.banner_description}>
        <Text className="banner_title">{banners[currentIndex]?.name}</Text>
        <MMRichText html={fixText(banners[currentIndex]?.content)} className='banner_subtitle' />

        <Button className="banner_btn">查看更多</Button>
      </View>
    </View>
  );
};

export default CustomSwiper;

function useBannerService() {
  const [loading, setLoading] = useState(false)
  const [banners, setBanners] = useState<BannerPositionOutputDto[]>([])

  useEffect(() => {
    getBanners()
  }, []);

  /** 获取banners */
  async function getBanners() {
    setLoading(true)
    let { data = [] } = await api['/wechat/mall/banner/queryList_GET']({position: 'MAIN_STORY'})

    while(data.length < 5) {  // 补充3个数据
      data = data.concat(data)
    }

    setBanners(data)
    setLoading(false)
  }

  return {loading, banners}
}

function fixText(text) {
  const replaceRegex = /(\n\r|\r\n|\r|\n)/g;

  return `<div style="text-align:center;">${text?.replace?.(replaceRegex, "<br/>")}</div>`;
}
