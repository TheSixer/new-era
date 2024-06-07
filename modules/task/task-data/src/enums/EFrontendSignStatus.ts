/**
 * 前端用的 签到状态，对应 接口返回的 code
 */
export enum EFrontendSignStatus {
  /** 首次签到成功 */
  FirstSuccess = 0,

  /**
   * 签到任务未开启，无法签到
   */
  SignInTaskNotEnabled = 60000,

  /**
   * 签到任务信息配置不完整，请先完善签到任务配置
   * 当未启用处理
   */
  SignInTaskInfoNotCompleted = 60001,

  /**
   * 不支持的签到方式
   */
  SignInTaskTypeNotSupport = 60002,

  /**
   * 重复签到已成功
   */
  SignInAlreadySuccess = 60003
}
