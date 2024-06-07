import { FC, memo } from 'react'
import { IUpdateDecorationModalFormProps } from './const'
import { ModalForm } from '@ant-design/pro-form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'

const Component: FC<IUpdateDecorationModalFormProps> = (props) => {
  return (
    <ModalForm {...props}>
      <ProFormLimitInput label="页面名称" name="name" maxLength={12} rules={[{ required: true }]} />

      <ProFormLimitInput
        label="页面标题"
        name="title"
        maxLength={8}
        fieldProps={{ placeholder: '显示在小程序/H5顶部导航栏标题' }}
        rules={[{ required: true }]}
      />
    </ModalForm>
  )
}

Component.displayName = 'UpdateDecorationModalForm'

const UpdateDecorationModalForm = memo(Component)
export default UpdateDecorationModalForm
