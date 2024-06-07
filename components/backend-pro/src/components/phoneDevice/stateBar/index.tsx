import { memo } from 'react';
import styles from './index.module.less';
import { SignalFilled, WifiOutlined } from '@ant-design/icons';
import Battery, { IBatteryProps } from '../battery';

export interface IStateBarProps extends IBatteryProps {
  /**
    * 运营商名称
    * @default 中国移动
    */
  operator?: string;
  /**
  * 中间时间信息
  * @default '10:00 AM''
  */
  time?: string;
}

function StateBar({ operator = '中国移动', time = '10:00 AM', showNumber = false, power = 80 }: IStateBarProps) {
  return (
    <div className={styles.stateBar}>
      <div>
        <SignalFilled />
        <span className={styles.operator}>{operator}</span>
        <WifiOutlined />
      </div>
      <div>{time}</div>
      <Battery showNumber={showNumber} power={power} />
    </div>
  )
}

export default memo(StateBar);
