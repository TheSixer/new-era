import { CSSProperties } from 'react';

export enum MMDividerStyle {
    /**
     * 实线 默认值
     */
    solid,
    /**
     * 点状
     */
    dotted,
    /**
     * 虚线
     */
    dashed
}

export interface IMMDividerProps {
  /**
   * 分割线大小
   *
   * @param number
   */
  size?: number;

  /**
   * 是否是垂直线
   *
   * @param boolean
   */
  vertical?: boolean;

  /**
   * 分割线颜色
   * @param string
   * @default '#e6e6e6'
   */
  color?: string

  style?: CSSProperties
}
