import { FC, memo, useMemo, useState } from 'react'
import { Modal, message, TreeSelect, Form } from 'antd'
import { getTreeData } from '../../contexts/util'
import { api } from '@wmeimob/backend-api'
import { MallConfMaterialGroupVo } from '../../const'

interface IProps {
  visible: boolean
  value: number[]
  group: MallConfMaterialGroupVo[]
  onOk: (groupId: number) => void
  onCancel: () => void
}

const EditModal: FC<IProps> = (props) => {
  const { visible, value } = props
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const treeData = useMemo(() => getTreeData(props.group || []), [props.group])

  async function onOk() {
    const { groupId } = await form.validateFields()
    try {
      await api['/admin/api/mallConfMaterial/move_PUT']({ ids: value, groupId })
      message.success('移动成功！')
      props.onOk(groupId)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="移动到"
      visible={visible}
      onOk={onOk}
      onCancel={props.onCancel}
      confirmLoading={loading}
      afterClose={() => form.resetFields()}
      keyboard={false}
    >
      <Form form={form}>
        <Form.Item name="groupId" label="分组" rules={[{ required: true }]}>
          <TreeSelect treeData={treeData} placeholder="请选择分组" treeDefaultExpandAll showSearch allowClear />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(EditModal)
