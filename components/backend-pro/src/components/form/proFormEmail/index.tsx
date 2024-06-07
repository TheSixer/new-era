import { FC, memo, useMemo } from 'react'
import { ProFormField } from '@ant-design/pro-form'
import { Input, InputProps } from 'antd'
import validator from 'validator'
import { ProFormFieldProps } from '@ant-design/pro-form'

export interface IProFormEmailProps<FiledProps = InputProps, DataType = {}> extends ProFormFieldProps<DataType, FiledProps> {}

const Component: FC<IProFormEmailProps> = (props) => {
  const { fieldProps = {}, rules, ...formProps } = props

  const innerRules = useMemo(() => {
    return (rules || []).concat({
      validator: (_r, value) => {
        return validator.isEmail(value) ? Promise.resolve() : Promise.reject(new Error(`请输入正确的邮箱`))
      }
    })
  }, [rules])

  return (
    <ProFormField {...formProps} validateFirst rules={innerRules}>
      <Input {...fieldProps} maxLength={50} />
    </ProFormField>
  )
}

Component.displayName = 'ProFormEmail'

const ProFormEmail = memo(Component)
export default ProFormEmail
