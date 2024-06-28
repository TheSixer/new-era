import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { api } from '@wmeimob/taro-api'
import { MMRichText, PageContainer } from '@wmeimob/taro-design'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { EAgreementType } from './const'

interface IUserAgreementProps {
  service: ReturnType<typeof useService>
}

const Component: FC<IUserAgreementProps> = (props) => {
  const { service } = props

  return (
    <PageContainer className={styles.userAgreementStyle}>
      <MMNavigation title={service.title} type='Default' />
      <View>
        <MMRichText html={service.agreement} />
      </View>
    </PageContainer>
  )
}

const UserAgreement = memo(Component)
export default UserAgreement

/**
 * 用户协议业务
 *
 * @warning 在对应的页面组件中。需要手动引用wxParse组件
 * // index.config.ts
 * export default definePageConfig({
    usingComponents: {
      wxparse: '../../../components/richText/wxParse/index' // 书写第三方组件的相对路径
    }
   })
 * @export
 * @return {*}
 */
export function useService(type: EAgreementType|string) {
  const [agreement, setAgreement] = useState('')

  const key = {
    [EAgreementType.User]: 'user_agreement',
    [EAgreementType.Privacy]: 'privacy_agreement',
    [EAgreementType.Promise]: 'promise_agreement'
  }
  const titles = {
    [EAgreementType.User]: '用户协议',
    [EAgreementType.Privacy]: '隐私条款',
    [EAgreementType.Promise]: '免责承诺书'
  }

  const title = titles[type]
  useEffect(() => {
    api['/wechat/mall/config/queryByKey_GET']({ key: key[type] }).then(async ({ data = '' }) => {
      if (/^http(s)?/.test(data)) {
        const res = await Taro.request({ url: data })
        setAgreement(res.data)
      } else {
        setAgreement(data)
      }
    })
  })

  return {
    agreement,
    title
  }
}
