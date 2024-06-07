import { TreeResourceVo } from '@wmeimob/backend-api/src/request/data-contracts'

export interface IResourcesManagementProps {}

/** 资源类型 */
export enum EResourceType {
  /** 菜单 */
  Menu,
  /** 操作 */
  Operation
}

export function initTreeResource(): TreeResourceVo {
  return {
    children: [],
    code: '',
    icon: '',
    key: '',
    memo: '',
    name: '',
    parentId: undefined,
    sortNum: 0,
    title: '',
    type: EResourceType.Menu,
    visible: true
  }
}
