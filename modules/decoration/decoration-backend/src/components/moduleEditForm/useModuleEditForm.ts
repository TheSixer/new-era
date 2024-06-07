/* eslint-disable no-template-curly-in-string */
import { FormProps } from 'antd/lib/form/Form'
import { useContext, useEffect } from 'react'
import StoreContext from '../store-context'
import { formCol, IModuleEditFormProps } from './const'

interface IUseModuleEditForm extends IModuleEditFormProps {
  formProps?: Partial<FormProps>
}

export function useModuleEditForm(props: IUseModuleEditForm) {
  const { form } = useContext(StoreContext)

  // 表单布局
  const formProps: FormProps = {
    ...formCol,
    form,
    validateMessages: { required: '${label}必填' },
    onValuesChange() {
      setTimeout(() => {
        const value = form.getFieldsValue()
        props.onChange(value)
      }, 0)
    },
    ...props.formProps
  }

  useEffect(() => {
    if (form && props.data) {
      form.setFieldsValue(props.data)
    }
  }, [props.data])

  return {
    form,
    formProps
  }
}
