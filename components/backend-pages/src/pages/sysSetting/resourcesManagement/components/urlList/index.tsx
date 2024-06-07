import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'
import { IUrlListProps } from './const'
import { Alert, AutoComplete, Button, Form, Input, List, message, Modal, Select, Space, Tag, Typography } from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { api } from '@wmeimob/backend-api'
import { SysApiRes } from '@wmeimob/backend-api/src/request/data-contracts'

const { confirm } = Modal
const { useForm } = Form

const Component: FC<IUrlListProps> = (props) => {
  const { list = [], onChange } = props
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [allApis, setAllApis] = useState<SysApiRes[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [editIndex, setEditIndx] = useState(-1)

  const [options] = useState([
    { label: '全部', value: 'ALL' },
    { label: 'GET', value: 'GET' },
    { label: 'PUT', value: 'PUT' },
    { label: 'POST', value: 'POST' },
    { label: 'DELETE', value: 'DELETE' }
  ])

  const [form] = useForm()
  const editCache = useRef<any>()

  const autoCompleteOptions = useMemo(() => {
    return allApis
      .filter(({ uri = '' }) => uri.indexOf(searchValue) !== -1)
      .map(({ uri = '', method = '', id }) => ({ label: `${method} ${uri}`, value: `${id}` }))
  }, [allApis, searchValue])

  useEffect(() => {
    const queryAllApis = async () => {
      const { data = [] } = await api[`/admin/api/sysResource/apis_GET`]()
      setAllApis(data)
    }
    if (visible) {
      queryAllApis()
    }
  }, [visible])

  const handleAddURL = (index = -1) => {
    setVisible(true)
    setEditIndx(index)
    editCache.current = index !== -1 ? { ...list[index] } : { method: 'GET', uri: '', description: '' }
    form.resetFields()
    form.setFieldsValue({ ...editCache.current })
  }

  // 保存
  const handeSave = async () => {
    try {
      const formValue = await form.validateFields()
      const { method, uri } = formValue
      setConfirmLoading(true)

      let newList: any[] = []
      // 新增
      if (editIndex === -1) {
        const api = allApis.find((item) => item.uri === uri && item.method === method) // 判断当前uri是否已经存在
        // 如果匹配中api则推入数据并更新api信息。否则新增api
        const newValue = api ? { ...api, ...formValue } : formValue
        newList = [...list, newValue]
      } else {
        // 编辑
        newList = list.map((item, index) => {
          if (index === editIndex) {
            // 编辑状态
            return { ...editCache.current, ...formValue }
          }
          return item
        })
      }

      await onChange(newList)
      message.success('保存成功')
      setVisible(false)
    } catch (error) {}
    setConfirmLoading(false)
  }

  const handleDelete = (id: number) => {
    confirm({
      title: '删除',
      content: `确认删除关联URL？`,
      onOk: async () => {
        const newList = list.filter((item) => item.id !== id)
        try {
          await onChange(newList)
          message.success('删除成功')
        } catch (error) {}
      }
    })
  }

  const handleURISelect = (value: string) => {
    const result = allApis.find(({ id }) => `${id}` === value)!
    editCache.current = { ...result }
    form.resetFields()
    form.setFieldsValue({ ...editCache.current })
  }

  return (
    <>
      <List
        dataSource={list}
        locale={{ emptyText: '没有关联的URL' }}
        footer={
          <Button type="primary" onClick={() => handleAddURL()}>
            添加关联URL
          </Button>
        }
        renderItem={(item, index) => (
          <List.Item>
            <div className={styles.showRow}>
              <Tag color="#2db7f5">{item.method}</Tag>
              <Typography.Text className={styles.showRow_conent}>{item.uri}</Typography.Text>
              <Typography.Text className={styles.showRow_conent}>{item.description}</Typography.Text>
              <Space>
                <FormOutlined className={styles.showRow_editIcon} onClick={() => handleAddURL(index)} />
                <DeleteOutlined className={styles.showRow_editIcon} onClick={() => handleDelete(item.id!)} />
              </Space>
            </div>
          </List.Item>
        )}
      />

      <Modal
        title={`${editIndex === -1 ? '新增' : '编辑'}URL`}
        visible={visible}
        confirmLoading={confirmLoading}
        forceRender
        onCancel={() => setVisible(false)}
        onOk={handeSave}
      >
        <Form form={form} labelCol={{ span: 6 }}>
          <Form.Item label="路径" name="uri" rules={[{ required: true }]}>
            <AutoComplete
              placeholder="例: /path/get/someResource"
              options={autoCompleteOptions}
              onSearch={(value) => setSearchValue(value || '')}
              onSelect={handleURISelect}
            />
          </Form.Item>
          <Form.Item label="方法" name="method">
            <Select options={options} />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input />
          </Form.Item>
        </Form>
        {editIndex !== -1 && <Alert type="warning" showIcon message="路径修改会影响所有关联API.如果是要新增。请删除本条关联后新增" style={{ fontSize: 12 }} />}
      </Modal>
    </>
  )
}

Component.displayName = 'UrlList'

const UrlList = memo(Component)
export default UrlList
