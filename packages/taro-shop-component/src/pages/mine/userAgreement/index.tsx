import UserAgreementPage, { useService } from '@wmeimob/taro-pages/src/pages/setting/userAgreement'
import { useRouter } from '@tarojs/taro'
import { EAgreementType } from './const'

export default function Page() {
  const { type = EAgreementType.User } = useRouter().params
  const service = useService(type)

  return <UserAgreementPage service={service} />
}
