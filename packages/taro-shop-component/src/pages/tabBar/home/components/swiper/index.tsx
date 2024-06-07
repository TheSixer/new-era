import { useState, useEffect, useRef, FC, memo } from 'react';
import { ISwiperProps } from './const';
import { View, Image } from '@tarojs/components';
import styles from './index.module.less';
import classNames from 'classnames';

const Component: FC<ISwiperProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<any>(null);

  const delay = 3000; // 自动切换的时间间隔

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(
  //     () => setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1)),
  //     delay
  //   );

  //   return () => {
  //     resetTimeout();
  //   };
  // }, [currentIndex]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const goToPrevSlide = () => {
    resetTimeout();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    resetTimeout();
    setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <View className={styles.carousel}>
      <View className={styles['carousel-inner']}>
        {data.map((image, index) => (
          <View
            key={index}
            className={classNames(styles['carousel-item'], index === currentIndex ? 'active' : '')}
            style={{
              transform: `translateY(${currentIndex * 10}px)`
            }}
          >
            <Image src={image.src} />
            <View className={styles['carousel-caption']}>
              <View>{image.description}</View>
              <View>{image.date}</View>
            </View>
          </View>
        ))}
      </View>
      <button onClick={goToPrevSlide} className={classNames(styles['carousel-control'], 'prev')}>
        &#10094;
      </button>
      <button onClick={goToNextSlide} className={classNames(styles['carousel-control'], 'next')}>
        &#10095;
      </button>
    </View>
  );
};

const Swiper = memo(Component)
export default Swiper
