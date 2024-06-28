import { FC, memo } from 'react';
import { IEventInfoProps } from './const';
import { View, Text } from '@tarojs/components';
import styles from './index.module.less';
import MMSpace from '@wmeimob/taro-design/src/components/space';
import { ECardType, EReservationStatus, MCardType } from '../../../../../../enums/event/EReservationStatus';
import RCell from './components/RCell';
import { SpecialFilled } from '../../../../../../components/Icons';

const Component: FC<IEventInfoProps> = ({ data }) => {
  // const { activity } = data || {};

  return (
    <View className={styles.event_info}>
      <MMSpace direction="column">
        <RCell title={(
          <View style={{display: 'flex', alignItems: 'center'}}>
            <Text>姓名</Text>
            <SpecialFilled style={{marginLeft: '12rpx'}} />
          </View>
        )} value={data?.name} />

        <RCell title="证件类型" value={MCardType[data?.cardType || ECardType.ID_CARD]} />

        <RCell title="证件号" value={data?.cardNo} />

        <RCell title="座位区域" value={data?.orderStatus === EReservationStatus.NoUse ? <Text style={{color: '#BC9B6A'}}>后台分配中...</Text> : data?.areaName} />

        <RCell title="座位号" value={data?.orderStatus === EReservationStatus.NoUse ? <Text style={{color: '#BC9B6A'}}>后台分配中...</Text> : data?.activity?.viewSeatNo ? `${data?.rowNumber || ''} ${data?.seatNo || ''}` : '-'} />
      </MMSpace>
    </View>
  );
};

const Banner = memo(Component)
export default Banner
