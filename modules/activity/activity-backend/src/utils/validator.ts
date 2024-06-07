import moment, { Moment } from 'moment'

/** 校验 活动开始结束时间 是否合法 */
export function validateActivityTimeRange(dateRange?: [Moment, Moment]) {
  if (!dateRange?.length) return Promise.resolve()
  return moment().isBefore(dateRange[1], 'minutes') ? Promise.resolve() : Promise.reject(new Error('活动结束时间必须晚于当前时间'))
}
