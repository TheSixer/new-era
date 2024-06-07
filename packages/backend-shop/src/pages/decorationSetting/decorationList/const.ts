import { MallConfPageOutputDto } from '@wmeimob/backend-api'
export interface IDecorationListProps {}

export interface IMallConf extends MallConfPageOutputDto {
  /** 是否是首页 */
  isHomePage: boolean
}

export enum EPageEditType {
  Add,

  Edit,

  Copy
}
