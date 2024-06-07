import { FC, memo } from 'react';
import { IBannerProps } from './const';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import styles from './index.module.less';
import Title from '../title';

const Component: FC<IBannerProps> = ({ title, subTitle, style = {}, renderItem }) => {
  const images = [
    { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/938a92ae-df38-700a-bf0b-1c425d370d88.jpg', alt: 'Image 1' },
    { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/7d30fdf3-72d5-20a4-2e45-c2740baf08e7.jpg', alt: 'Image 2' },
    { src: 'https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/a4462a2c-7241-8ba5-fb1e-c5a7265d34ba.jpg', alt: 'Image 3' }
    // 其他图片
  ];

  return (
    <View className={styles.banner}>

      <View className={styles.banner_title}>
        <Title title={title} subTitle={subTitle} />
      </View>
    
      <View className={styles.banner_container}>
        <Swiper
          className={styles.banner_view}
          style={{...style}}
          nextMargin='216rpx'
        >
          {images.map((image, index) => (
            <SwiperItem key={index}>
              <View className={styles.banner_item}>
                {renderItem?.(image, index)}
                {/* <Image src={image.src} mode='center' className={styles.banner_image} />
                <View className={styles.swiper_description}>
                  <View>{image.src}</View>
                </View> */}
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

const Banner = memo(Component)
export default Banner
