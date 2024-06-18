import { FC, memo } from 'react';
import { IEventInfoProps } from './const';
import { View } from '@tarojs/components';
import styles from './index.module.less';
import MMSpace from '@wmeimob/taro-design/src/components/space';
import { ECardType, EReservationStatus, MCardType } from '../../../../../../enums/event/EReservationStatus';
import RCell from './components/RCell';

const Component: FC<IEventInfoProps> = ({ data }) => {
  // const { activity } = data || {};

  return (
    <View className={styles.event_info}>
      <MMSpace direction="column">
        <RCell title="姓名" value={data?.name} />

        <RCell title="证件类型" value={MCardType[data?.cardType || ECardType.ID_CARD]} />

        <RCell title="证件号" value={data?.cardNo} />

        <RCell title="座位区域" value={data?.orderStatus === EReservationStatus.NoUse ? '后台分配中...' : data?.areaName} />

        <RCell title="座位号" value={data?.orderStatus === EReservationStatus.NoUse ? '后台分配中...' : `${data?.rowNumber} ${data?.seatNo}`} />
      </MMSpace>
    </View>
  );
};

const Banner = memo(Component)
export default Banner
