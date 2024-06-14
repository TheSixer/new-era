import { FC, memo, useState } from 'react';
import { IBannerProps } from './const';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import styles from './index.module.less';
import classNames from 'classnames';

const Component: FC<IBannerProps> = ({ data }) => {
  const [current, setCurrent] = useState(0);

  const onChange = (event) => {
    setCurrent(event.detail.current);
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
        {data.map((image, index) => (
          <SwiperItem key={index}>
            <Image src={image} mode="aspectFill" className={styles.banner_image} />
          </SwiperItem>
        ))}
      </Swiper>

      <View className={styles['dot_container']}>
        {data.map((_, index) => (
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
