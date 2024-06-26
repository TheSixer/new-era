import { FC, memo } from 'react';
import { IBannerProps } from './const';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import styles from './index.module.less';
import Title from '../title';
import { MMEmpty } from '@wmeimob/taro-design';
import emptyImg from '../../../../../assets/images/icon_empty.png'

const Component: FC<IBannerProps> = ({ data, title, subTitle, style = {}, renderItem }) => {
  if (data?.length === 0) {
    return null
  }

  return (
    <View className={styles.banner}>

      <View className={styles.banner_title}>
        <Title title={title} subTitle={subTitle} />
      </View>
    
      {data.length === 0 && <MMEmpty text='暂无数据' src={emptyImg} imgStyle={{ marginTop: '100rpx', width: '64rpx', height: '64rpx' }} />}

      <View className={styles.banner_container}>
        <Swiper
          className={styles.banner_view}
          style={{...style}}
          nextMargin='216rpx'
        >
          {data.map((image, index) => (
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
