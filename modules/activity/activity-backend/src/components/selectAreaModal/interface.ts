import { ExpressTemplateModifyInputDto, ExpressTemplateDetailOutputDto } from '@wmeimob/backend-api/src/request/data-contracts'

/**
 * 服务器下发城市数据格式
 */
export interface ICityData {}

/**
 * 城市树状数据（与DataNode通用）
 */
export interface ICityTree {
  title: string
  key: number
  children?: ICityTree[]
}

export interface IFormItemAreaValues extends Omit<ExpressTemplateModifyInputDto, 'area'> {
  area?: ICityTree[]
}

/** 表单数据结构 */
export interface IFormValues extends Pick<ExpressTemplateDetailOutputDto, 'name' | 'shippingType' | 'valuationType'> {
  expressTemplateAreas?: IFormItemAreaValues[]
  /** 所有地区配送 */
  isAllArea?: boolean
}
