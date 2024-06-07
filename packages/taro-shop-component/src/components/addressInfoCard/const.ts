
export interface IAddressInfoCardProps {
  /** 显示右箭头 */
  showArrow?: boolean

  /** 地址信息 */
  data?: {
    /** 省 */
    provinceName?: string;
    /** 市 */
    cityName?: string;
    /** 区 */
    areaName?: string;
    /** 详细地址 */
    singleAddress?: string;
    /** 人名 */
    name?: string;
    /** 手机号 */
    mobile?: string;
  };
  /** 点击事件 */
  onClick?(): void;
}

