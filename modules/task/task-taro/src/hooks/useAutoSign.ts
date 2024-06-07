import { EFrontendSignStatus } from '@wmeimob-modules/task-data/src/enums/EFrontendSignStatus'
import { ESignType } from '@wmeimob-modules/task-data/src/enums/ESignType'
import { api } from '@wmeimob/taro-api'
import { useToast } from '@wmeimob/taro-design'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { useSetAtom } from 'jotai'
import { frontendSignStatusAtom } from '../store'

/**
 * 自动签到业务
 */
export default function useAutoSign() {
  const [toast] = useToast()

  const setSignStatus = useSetAtom(frontendSignStatusAtom)
  let result
  const [autoSign] = useSuperLock(async () => {
    let res: EFrontendSignStatus

    try {
      const { code } = await api['/wechat/mall/signin_PUT']({ type: ESignType.Auto }, { errorToast: false })
      res = code as EFrontendSignStatus
    } catch (error) {
      res = error.data.code
    }

    setSignStatus(res as EFrontendSignStatus)

    return res === EFrontendSignStatus.FirstSuccess
    //&& toast?.message('今日签到成功')
  })

  return {
    autoSign,
    result
  }
}
