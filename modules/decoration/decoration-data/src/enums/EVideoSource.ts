
/** 视频来源 */
export enum EVideoSource {
  /** 系统 */
  System,
  /** 外部 */
  External
}

export const MVideoSource = {
  [EVideoSource.System]: '系统',
  [EVideoSource.External]: '外部'
}