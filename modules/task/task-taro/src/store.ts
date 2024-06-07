import { atom } from 'jotai'
import { EFrontendSignStatus } from '@wmeimob-modules/task-data/src/enums/EFrontendSignStatus'

/** 前端读取的签到显示状态 */
export const frontendSignStatusAtom = atom<EFrontendSignStatus>(EFrontendSignStatus.SignInTaskNotEnabled)

/** 是否已签到 */
export const isAlreadySignAtom = atom((get) => {
  const status = get(frontendSignStatusAtom)
  const successful = [EFrontendSignStatus.FirstSuccess, EFrontendSignStatus.SignInAlreadySuccess]
  return successful.includes(status)
})

/** 后台是否启用了签到任务 */
export const isEnableSignTaskAtom = atom((get) => {
  const status = get(frontendSignStatusAtom)
  const enable = [EFrontendSignStatus.FirstSuccess, EFrontendSignStatus.SignInTaskTypeNotSupport, EFrontendSignStatus.SignInAlreadySuccess]
  return enable.includes(status)
})

/** 签到任务说明富文本 */
export const signTaskExplainAtom = atom('')
