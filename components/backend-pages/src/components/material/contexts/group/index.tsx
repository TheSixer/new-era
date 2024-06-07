import { FC, memo, useEffect, useMemo, useState } from 'react'
import { Tree, Typography, Input, Space, Button, Empty, Spin, Modal, message, Form } from 'antd'
import { useConsumer } from '../context'
import { MallConfMaterialGroupVo, MaterialTypeText } from '../../const'
import { getTreeData, getTreeName, hasTreeItem, findTreeItem } from '../util'
import styles from './index.module.less'
import { ModalForm, ProFormText } from '@ant-design/pro-form'
import { api } from '@wmeimob/backend-api'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'

interface IProps {}

const { Title, Text } = Typography
const { useForm } = Form
// const AdminGroup = ['全部', '未分组', '全部视频']

/**
 * 素材分组
 */
const MaterialGroup: FC<IProps> = (props) => {
  const { state, dispatch } = useConsumer()
  // loading仅做首次加载用
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [isRootNode, setIsRootNode] = useState(true) // 当前是否是跟节点

  const [modalForm] = useForm()
  const [showModalForm, setShowModalForm] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const { selectedGroup } = state

  async function getList() {
    setSearching(true)
    try {
      // const name = searchName ? searchName : undefined
      const { data } = await api['/admin/api/mallConfMaterialGroup/queryListAll_GET']({ type: state.type as any })
      const group = data || []
      dispatch({ type: 'ChangeGroup', group })
      // 之前的选中没有的话设置一个默认选中
      if (!hasTreeItem(group, state.selectedGroup)) {
        dispatch({ type: 'SelectedGroup', selected: group[0]?.id })
        setIsRootNode(true)
      }
    } finally {
      setSearching(false)
      setLoading(false)
    }
  }

  const treeData = useMemo(() => {
    // 前端做名称过滤
    function filterByName(data: MallConfMaterialGroupVo[]) {
      const newData: any[] = []
      data.forEach((item) => {
        const { children, ...rest } = item

        const newChildren = filterByName(children || [])
        if (newChildren.length) {
          newData.push({ ...rest, children: newChildren })
        } else if ((item.name || '').indexOf(searchName) !== -1) {
          newData.push({ ...rest, children: newChildren })
        }
      })

      return newData
    }

    const group = searchName ? filterByName(state.group) : state.group
    return getTreeData(group, (value) => {
      return (
        <Text>
          {value.name}
          {/* <Text type="secondary">({value.mateNum})</Text> */}
        </Text>
      )
    })
  }, [state.group, searchName])

  const treeName = useMemo(() => {
    if (state.selectedGroup) {
      const names = getTreeName(state.group, state.selectedGroup)
      return names || []
    }
    return []
  }, [state.group, state.selectedGroup])

  useEffect(() => {
    getList()
  }, [state.type, searchName])

  function onAdd() {
    modalForm.setFieldsValue({
      treeName: treeName.join('/'),
      pid: state.selectedGroup
    })
    setModalTitle('新增子分组')
    setShowModalForm(true)
  }

  function onRename() {
    modalForm.setFieldsValue({
      treeName: treeName.slice(0, -1).join('/'),
      name: treeName[treeName.length - 1],
      id: state.selectedGroup
    })
    setModalTitle('重命名')
    setShowModalForm(true)
  }

  function onDelete() {
    Modal.confirm({
      title: '删除',
      content: '是否确认删除此分组？',
      onOk: async () => {
        await api['/admin/api/mallConfMaterialGroup/delete_DELETE']({ id: state.selectedGroup! })
        message.success('删除成功')
        getList()
      }
    })
  }

  function onSelect(value: (number | string)[], { node }) {
    setIsRootNode(node._node?.pid === 0)
    if (value.length > 0) {
      dispatch({ type: 'SelectedGroup', selected: Number(value[0]) })
    }
  }

  // const allowEdit = selectedGroup && AdminGroup.indexOf(treeName[treeName.length - 1]) === -1
  // const allowAdd = selectedGroup && !treeName.includes('未分组')
  const allowEdit = selectedGroup && !isRootNode
  const allowAdd = selectedGroup

  return (
    <Spin spinning={loading}>
      <div className={styles.wrapper}>
        <Title level={5}>{MaterialTypeText[state.type]}分组</Title>
        <Input.Search loading={searching} placeholder="请输入分组名称" maxLength={50} onSearch={(value) => setSearchName(value)} />
        {treeData.length > 0 ? (
          <Tree
            className={styles.treeContainer}
            blockNode
            defaultExpandAll
            selectedKeys={selectedGroup ? [selectedGroup] : []}
            onSelect={onSelect}
            treeData={treeData}
          />
        ) : (
          <Empty className={styles.treeContainer} />
        )}
        <Space>
          <Button size="small" type="primary" disabled={!allowAdd} onClick={onAdd}>
            添加子分组
          </Button>

          <Button size="small" disabled={!allowEdit} onClick={onRename}>
            重命名
          </Button>

          <Button size="small" disabled={!allowEdit} danger onClick={onDelete}>
            删除
          </Button>
        </Space>

        <ModalForm
          title={modalTitle}
          visible={showModalForm}
          form={modalForm}
          layout="horizontal"
          labelCol={{ span: 4 }}
          onVisibleChange={(val) => {
            setShowModalForm(val)
            if (!val) {
              modalForm.resetFields()
            }
          }}
          onFinish={async (formData) => {
            const { name, id, pid } = formData
            if (id) {
              const selfData = findTreeItem(state.group, id) || {}
              await api['/admin/api/mallConfMaterialGroup/update_PUT']({ ...selfData, name })
              message.success('修改成功')
            } else if (pid) {
              await api['/admin/api/mallConfMaterialGroup/add_POST']({ type: state.type, name, pid })
              message.success('创建成功')
            }
            getList()
            return true
          }}
        >
          <ProFormText name="id" hidden />

          <ProFormText name="pid" hidden />

          <ProFormInfo label="上级分组" name="treeName" />

          <ProFormLimitInput label="分组名称" name="name" rules={[{ required: true }]} fieldProps={{ style: { width: 300 } }} />
        </ModalForm>
      </div>
    </Spin>
  )
}

export default memo(MaterialGroup)
