export { MaterialGroupVo as MallConfMaterialGroupVo, MaterialVo as MallConfMaterialVo } from '@wmeimob/backend-api/src/request/data-contracts'

/**
 * 素材类型
 */
export enum MaterialType {
  /** 图片 */
  Image,
  /** 视频 */
  Video
}

/**
 * 素材文本
 */
export const MaterialTypeText = {
  [MaterialType.Image]: '图片',
  [MaterialType.Video]: '视频'
}

// 最大上传数量
export const MaxUploadCount = 12
