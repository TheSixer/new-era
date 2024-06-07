import { UserAddressOutPutDto } from '@wmeimob/taro-api';

export interface IAddressListProps {}

/**
 * 地址类型
 */
export enum EAddressType {
  /** 正常列表页 */
  List = 'list',
  /** 选择页 */
  Choose = 'choose'
}

export interface IAddressListRouteParams {
  /** 地址类型 */
  type?: EAddressType
  /** 前一页面当前选中的地址 id */
  selectedId?: UserAddressOutPutDto['id']
}
