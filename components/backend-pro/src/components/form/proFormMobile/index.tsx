import { ProFormField } from '@ant-design/pro-form'
import { Input, InputProps } from 'antd'
import { FC, memo, useMemo } from 'react'
import { isMobilePhone } from 'validator'
import { ProFormFieldProps } from '@ant-design/pro-form'

export interface IProFormMobileProps extends ProFormFieldProps<{}, InputProps> {
  /**
   * 电话号码归属地址
   *
   * 默认中国区域
   * @default ['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW']
   */
  locale?: string[]
}

const Component: FC<IProFormMobileProps> = (props) => {
  const { fieldProps, rules, locale = ['zh-CN', 'zh-HK', 'zh-MO', 'zh-TW'], ...formProps } = props

  const innerRules = useMemo(() => {
    return (rules || []).concat({
      validator: (_r, value) => {
        return isMobilePhone(value, locale) ? Promise.resolve() : Promise.reject(new Error(`请输入正确的手机号`))
      }
    })
  }, [rules])

  return (
    <ProFormField {...formProps} rules={innerRules} validateFirst>
      <Input {...fieldProps} maxLength={20} />
    </ProFormField>
  )
}

Component.displayName = 'ProFormMobile'

const ProFormMobile = memo(Component)
export default ProFormMobile
