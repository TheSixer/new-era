// src/components/CustomSwiper/CustomSwiper.jsx
import { useState } from 'react';
import { View, Text, Button, Image } from '@tarojs/components';
import styles from './index.module.less';
import './index.less';
import Title from '../title';
import Decorate from '../../../../../assets/images/home/decorate.png';

const CustomSwiper = ({ images: list, style = {} }) => {
  const images = [...list, ...list];
  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStart, setTouchStart] = useState(0);

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
            {images.map((image, index) => {
              const isCurrent = index === currentIndex;
              const isNext = index === (currentIndex + 1) % images.length;
              const isNNext = index === (currentIndex + 2) % images.length;
              const isPrev = index === (currentIndex - 1 + images.length) % images.length;
              const isPPrev = index === (currentIndex - 2 + images.length) % images.length;

              return (
                <View
                  key={index}
                  className={`swiper-slide ${isCurrent ? 'current' : ''} ${isNext ? 'next' : ''}  ${isNNext ? 'nnext' : ''}  ${isPrev ? 'prev' : ''} ${isPPrev ? 'pprev' : ''}`}
                  style={{ backgroundImage: `url(${image.src})` }}
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
        <Text className="banner_title">59FIFTY全封平檐帽</Text>
        <Text className="banner_subtitle">NEW ERA 再度携手FEAR OF GOD ESSENTIALS</Text>
        <Text className="banner_subtitle">推出59FIFTY全封平檐帽</Text>

        <Button className="banner_btn">查看更多</Button>
      </View>
    </View>
  );
};

export default CustomSwiper;
