import React, { memo } from 'react';
import styles from './index.module.less';

export interface IBatteryProps {
  /**
   * 是否显示文字
   * @default false
   */
  showNumber?: boolean;
  /**
   * 电量
   * @default 90
   */
  power?: number;
}

function Battery({ showNumber = false, power = 90 }: IBatteryProps) {
  return (
    <div className={styles.battery}>
      <span>{showNumber ? `${power}%` : ''}</span>
      <span className={styles.icon}>
        <div className={styles.power} style={{ width: `${power}%` }} />
      </span>
    </div>
  )
}

export default memo(Battery);
