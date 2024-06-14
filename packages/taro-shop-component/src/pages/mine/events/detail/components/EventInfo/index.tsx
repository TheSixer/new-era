import { FC, memo, useState } from 'react';
import { IEventInfoProps } from './const';
import { View } from '@tarojs/components';
import styles from './index.module.less';
import { PositionFilled } from '../../../../../../components/Icons';
import dayjs from 'dayjs';

const Component: FC<IEventInfoProps> = ({ data }) => {
  const { activity } = data || {};
  const { province = '', city = '', area = '', address = '' } = activity || {}
  const addressDetail = `${province}${city}${area}${address}`

  return (
    <View className={styles.event_info}>
      <View className={styles.event_info_title}>{activity?.name}</View>

      <View className={styles.event_basic_info}>
        <View className={styles.event_basic__label}>活动地址</View>
        <View className={styles.event_basic__text}>{addressDetail}</View>
        <View className={styles.event_distance}>
          <PositionFilled width="24rpx" height="24rpx" />
          <View className={styles.event_basic__text}>{activity?.distance}km</View>
        </View>
        
        <View className={styles.event_basic__label}>活动时间</View>
        <View className={styles.event_basic__text}>{dayjs(activity?.startTime).format('YYYY-MM-DD HH:mm')} - {dayjs(activity?.endTime).format('YYYY-MM-DD HH:mm')}</View>
        
        {
          !activity?.unify ? (
            <>
              <View className={styles.event_basic__label}>活动场次</View>
              <View className={styles.event_basic__text}>{data?.unifyName}</View>
            </>
          ) : null
        }
      </View>
    </View>
  );
};

const Banner = memo(Component)
export default Banner
