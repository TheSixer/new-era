import { FC, memo, useState } from 'react';
import { IBannerProps } from './const';
import { View, Swiper, SwiperItem, Button, Text } from '@tarojs/components';
import styles from './index.module.less';
import classNames from 'classnames';

const Component: FC<IBannerProps> = () => {
  const [current, setCurrent] = useState(0);

  const images = [
    { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/938a92ae-df38-700a-bf0b-1c425d370d88.jpg', alt: 'Image 1' },
    { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/7d30fdf3-72d5-20a4-2e45-c2740baf08e7.jpg', alt: 'Image 2' },
    { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/a4462a2c-7241-8ba5-fb1e-c5a7265d34ba.jpg', alt: 'Image 3' }
    // 其他图片
  ];

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
        {images.map((image, index) => (
          <SwiperItem key={index}>
            <View className={styles.banner_image} style={{ backgroundImage: `url(${image.src})` }}>
              <View className={styles.banner_description}>
                <Text className='banner_title'>59FIFTY全封平檐帽</Text>
                <Text className='banner_subtitle'>70年来，59FIFTY一直引领潮流</Text>
                <Text className='banner_subtitle'>吸引着人们的目光并改变着游戏规则</Text>

                <Button className='banner_btn'>查看更多</Button>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      <View className={styles['dot_container']}>
        {images.map((_, index) => (
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
