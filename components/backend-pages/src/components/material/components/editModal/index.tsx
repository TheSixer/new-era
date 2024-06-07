import { FC, useEffect, useMemo, useState } from 'react'
import { Modal, message, TreeSelect, Form, Input } from 'antd'
import { getTreeData } from '../../contexts/util'
import { MallConfMaterialGroupVo, MallConfMaterialVo, MaterialTypeText } from '../../const'
import { api } from '@wmeimob/backend-api'

interface IProps {
  visible: boolean
  value?: MallConfMaterialVo
  group: MallConfMaterialGroupVo[]
  onOk?: () => void
  onCancel?: () => void
}

const EditModal: FC<IProps> = (props) => {
  const { visible, value } = props
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const treeData = useMemo(() => getTreeData(props.group || []), [props.group])
  const showText = value ? MaterialTypeText[value.type!] : ''

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(value)
    }
  }, [visible])

  async function onOk() {
    const formData = await form.validateFields()
    try {
      await api['/admin/api/mallConfMaterial/update_PUT']({ ...value, ...formData })
      message.success('修改成功！')
      props.onOk?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={`${showText}编辑`}
      visible={visible}
      onOk={onOk}
      onCancel={props.onCancel}
      confirmLoading={loading}
      maskClosable={false}
      afterClose={() => form.resetFields()}
    >
      <Form form={form}>
        <Form.Item name="groupId" label={`${showText}分组`} rules={[{ required: true }]}>
          <TreeSelect treeData={treeData} placeholder="请选择分组" treeDefaultExpandAll showSearch allowClear />
        </Form.Item>
        <Form.Item name="name" label={`${showText}名称`} rules={[{ required: true }]}>
          <Input maxLength={50} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal
