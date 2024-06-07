import { ETaskKey } from '@wmeimob-modules/task-data/src/enums/ETaskKey'

/** 任务按钮名称映射 */
export interface ITaskButtonMap {
  initText: string
  okText: string
  description?: string
}

/** 任务按钮名称映射 */
export const taskButtonMap: Record<string, ITaskButtonMap> = {
  [ETaskKey.sign]: {
    initText: '去签到',
    okText: '已签到',
    description: '签到成功获得积分'
  },
  [ETaskKey.firstPurchase]: {
    initText: '去购物',
    okText: '已完成',
    description: '首次下单支付成功'
  },
  [ETaskKey.followMp]: {
    initText: '去关注',
    okText: '已关注',
    description: '首次关注公众号成功'
  }
}
