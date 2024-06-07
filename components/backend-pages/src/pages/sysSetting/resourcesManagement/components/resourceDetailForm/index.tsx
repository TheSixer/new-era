import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { IResourceDetailFormProps } from './const'
import { Form, Row, Col, TreeSelect, Input, InputNumber, Space, Button, message, Descriptions, Select } from 'antd'
import { getTreeInfoById } from '../resourceDetail/const'
import { useForm } from 'antd/lib/form/Form'
import { useContainer } from 'unstated-next'
import ResourceManagementContext from '../../context'
import { EResourceType } from '../../const'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { api } from '@wmeimob/backend-api'

const { Item } = Form

const Component: FC<IResourceDetailFormProps> = (props) => {
  const { editData = {}, treeData, extraTree, setEditData, queryAllData, connector, tooltips } = useContainer(ResourceManagementContext)

  const [codePrefix, setCodePrefix] = useState('')
  const [form] = useForm()
  const [saveLoading, setSaveLoading] = useState(false)
  const isEdit = useMemo(() => editData && !!editData.id, [editData])

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(editData)
  }, [editData])

  const handeValueChange = useCallback(
    (changedValues: any, values: any) => {
      const key = Object.keys(changedValues)[0]

      // 切换父资源时修改code前缀
      if (key === 'parentId') {
        if (!editData.id) {
          const pid = changedValues[key]
          if (pid) {
            const result = getTreeInfoById(treeData, changedValues[key])!
            setCodePrefix(result.item.code + connector)
          } else {
            setCodePrefix('')
          }
        }
      }
    },
    [form, treeData, editData]
  )

  const handleSave = async () => {
    try {
      const formValue = await form.validateFields()
      setSaveLoading(true)
      const saveData = { ...editData, ...formValue }

      if (editData.id) {
        await api['/admin/api/sysResource/resourceUpdate/{id}_PUT'](editData.id as any, saveData)
        message.success('修改成功')
      } else {
        saveData.code = codePrefix + saveData.code
        await api['/admin/api/sysResource/resourceCreate_POST'](saveData)
        message.success('新增成功')
      }
      setSaveLoading(false)

      setEditData(undefined)
      queryAllData()
    } catch (error) {}
  }

  return (
    <>
      <Descriptions
        column={2}
        size="small"
        title={editData.id ? '编辑资源' : '新增资源'}
        extra={
          <Space>
            <Button onClick={props.onCancel}>取消</Button>
            <Button loading={saveLoading} type="primary" onClick={handleSave}>
              保存
            </Button>
          </Space>
        }
      />
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onValuesChange={handeValueChange}>
        <Row gutter={24}>
          <Col span={24}>
            <ProFormLimitInput label="资源名称" name="title" maxLength={12} rules={[{ required: true }]} />
          </Col>
          <Col span={24}>
            <Item label="父级资源" name="parentId">
              <TreeSelect
                showSearch
                treeNodeFilterProp="title"
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                allowClear
                treeDefaultExpandAll
                treeData={extraTree}
              />
            </Item>
          </Col>

          <Col span={24}>
            <Item label="权限编码" name="code" rules={[{ required: true }]} tooltip={tooltips.code}>
              <Input prefix={codePrefix} disabled={isEdit} placeholder="例: ResourceManagement" />
            </Item>
          </Col>

          <Col span={24}>
            <Item label="类型" name="type" rules={[{ required: true }]} tooltip={tooltips.sortNum}>
              <Select>
                <Select.Option value={EResourceType.Menu}>菜单</Select.Option>
                <Select.Option value={EResourceType.Operation}>操作</Select.Option>
              </Select>
            </Item>
          </Col>

          <Col span={24}>
            <Item label="排序值" name="sortNum" rules={[{ required: true }]} tooltip={tooltips.sortNum}>
              <InputNumber max={9999} min={0} style={{ width: '100%' }} />
            </Item>
          </Col>

          {/* <Col span={24}>
            <Item label="菜单图标" name="icon">
              <IconSelectItem />
            </Item>
          </Col> */}

          {/* <Col span={24}>
            <Item label="是否为菜单" name="visible" valuePropName="checked" tooltip={tooltips.visible}>
              <Switch />
            </Item>
          </Col> */}

          {/* <Col span={24}>
            <Item label="跳转路径" name="path" tooltip={tooltips.path}>
              <Input placeholder="例如: https://www.wmeimob.com" />
            </Item>
          </Col> */}
        </Row>
      </Form>
    </>
  )
}

Component.displayName = 'ResourceDetailForm'

const ResourceDetailForm = memo(Component)
export default ResourceDetailForm
