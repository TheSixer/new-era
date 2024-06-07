import { useForm } from 'antd/lib/form/Form'
import { useEffect, useState } from 'react'
import { ModalFormProps } from '@ant-design/pro-form'

export default function useUpdateDecorationModalForm<T = any>(option: ModalFormProps = {}) {
  const [visible, setVisible] = useState(false)
  const [editData, setEditData] = useState<T>()
  const [form] = useForm()

  useEffect(() => {
    if (!visible) {
      setEditData(undefined)
    }
  }, [visible])

  return {
    modalProps: {
      ...option,
      form,
      visible,
      onVisibleChange: (value) => setVisible(value)
    },
    setVisible,
    editData,
    setEditData
  }
}
