import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, Empty, message, Modal, Space, Spin, Typography } from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { PageContainer } from '@ant-design/pro-layout'
import DragCard from './components/dragCard'
import { IDragItem } from './components/dragCard/interface'
import { setDragged } from './hooks/createDragged'
import { ModalForm, ProFormDependency, ProFormField, ProFormSwitch, ProFormTreeSelect } from '@ant-design/pro-form'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import convertToTree from '@wmeimob/utils/src/tree/convertToTree'
import flatTree from '@wmeimob/utils/src/tree/flatTree'
import { ICoventTree } from '@wmeimob/utils/src/tree/types'
import sliceTree from '@wmeimob/utils/src/tree/sliceTree'
import mmFormRule, { concatRule } from '@wmeimob/form-rules'
import cc from '../../../config'
import { MenuTreeOutputDto } from '@wmeimob/backend-api/src/request/data-contracts'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import MaterialSelect from '@wmeimob/backend-pages/src/components/material/components/materialSelect'
import { MaterialType } from '@wmeimob/backend-pages/src/components/material/const'
const { config } = cc.systemConfig

interface IMMGoodsClassifyPageProps {
  /** 业务接口 */
  api: {
    /** 查询 */
    query: () => Promise<{ data?: MenuTreeOutputDto[] }>
    /** 删除 */
    del: (id: number) => Promise<{}>
    /** 新增 */
    add: (data: any) => Promise<{ data?: any }>
    /** 更新 */
    update: (data: any) => Promise<{}>
    /** 移动排序 */
    move: (data: any) => Promise<{}>
  }
  /**
   * 阿里云图片上传方法
   * @param fileList
   */
  upload(fileList: File[]): Promise<string[]>
}

const Component: FC<IMMGoodsClassifyPageProps> = (props) => {
  const { upload } = props

  const { loading, treeList, flatTreeList, slectTree, modalProps, handleAdd, handleSort, handleEdit, handleDragEnd, handleDelete, handleFormFinish } =
    useGoodClassifyService(props)

  return (
    <PageContainer>
      <Spin spinning={loading}>
        <Card
          title={
            <Space>
              <Button type="primary" icon={<FolderAddOutlined />} onClick={handleAdd}>
                添加分类
              </Button>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                *可在同级别拖拽排序
              </Typography.Text>
            </Space>
          }
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <DragCard droppableId="rootLevel" list={treeList} onEdit={handleEdit} onSort={handleSort} onDelete={handleDelete} />
          </DragDropContext>

          {!treeList.length && <Empty />}
        </Card>
      </Spin>

      <ModalForm {...modalProps} initialValues={{ pid: 0, frontShow: true }} onFinish={handleFormFinish}>
        <ProFormTreeSelect
          label="所属父级分类"
          name="pid"
          fieldProps={{ treeData: slectTree, treeDefaultExpandAll: true, placeholder: '不选表示为顶级分类' }}
        />

        <ProFormLimitInput label="分类名称" name="name" rules={concatRule(['required'])} maxLength={10} fieldProps={{}} />

        <ProFormSwitch label="是否显示" name="frontShow" extra="前台是否显示此分类" />

        <ProFormDependency name={['pid']}>
          {({ pid }) => {
            const { treeLevel } = flatTreeList.find((it) => it.value === pid) || {}
            return (
              treeLevel === config.maxClassifyLevel - 1 && (
                <ProFormField label="分类图片" name="pic" rules={mmFormRule.required}>
                  <MaterialSelect type={MaterialType.Image} maxLength={1} repeatTip />
                </ProFormField>
              )
            )
          }}
        </ProFormDependency>
      </ModalForm>
    </PageContainer>
  )
}

const MMGoodsClassifyPage = memo(Component)
export default MMGoodsClassifyPage

/**
 * 分类逻辑hook
 * @returns
 */
export function useGoodClassifyService(option: IMMGoodsClassifyPageProps) {
  const [treeList, setTreeList] = useState<ICoventTree<MenuTreeOutputDto>[]>([])

  const [loading, setLoading] = useState(true)

  const flatTreeList = useMemo(() => flatTree(treeList), [treeList])

  const { modalProps, editData, setEditData, setVisible } = useProTableForm()

  const slectTree = useMemo(() => {
    const pLevel = (editData?.treeLevel || 1) - 1
    return pLevel === 0
      ? editData
        ? [{ label: '无', value: 0 }]
        : [{ label: '无', value: 0 }].concat(sliceTree(treeList, config.maxClassifyLevel - 1))
      : flatTreeList.filter((item) => item.treeLevel === pLevel)
  }, [editData, flatTreeList, treeList])

  useEffect(() => {
    getClassifyTree()
  }, [])

  /** 获取分类树数据 */
  async function getClassifyTree() {
    setLoading(true)
    let treeData: ICoventTree<MenuTreeOutputDto>[] = []
    try {
      const { data = [] } = await option.api.query()
      treeData = convertToTree(data, { title: 'name', value: 'id' })
      setTreeList(treeData)
    } catch (error) {}
    setLoading(false)
    return treeData
  }

  /** 处理点击编辑 */
  const handleEdit = useCallback(
    (value: IDragItem) => {
      const { origin } = value
      setEditData(value)
      setVisible(true)
      modalProps.form.setFieldsValue(origin)
    },
    [modalProps.form]
  )

  /** 处理排序 */
  const handleSort = useCallback(
    async (result: DropResult) => {
      const { destination, draggableId } = result
      const sourceId = Number(draggableId.split('-')[1])
      const sourceData = flatTreeList.find((item) => item.origin.id === sourceId)!

      await option.api.move({ id: sourceData.key as any, sort: destination?.index, pid: sourceData.parentValue as any })
      message.success('移动成功')
      getClassifyTree()
    },
    [flatTreeList]
  )

  /**
   * 处理拖拽结束事件
   * @param result
   */
  function handleDragEnd(result: DropResult) {
    const { destination, source } = result
    if (destination && destination.index !== source.index) {
      setDragged(result)
    }
  }

  /**
   * 删除处理
   */
  const handleDelete = useCallback((value: IDragItem) => {
    Modal.confirm({
      title: '是否删除该分组？',
      content: `删除后将不可恢复`,
      onOk: async () => {
        await option.api.del(value.origin.id)
        message.success('删除成功')
        getClassifyTree()
      }
    })
  }, [])

  /**
   * 处理表单结束
   * @param data
   */
  const handleFormFinish = async (data) => {
    try {
      const { children, ...rest } = data
      const eData = editData?.origin
      const saveData = { ...eData, ...rest }
      if (eData) {
        await option.api.update(saveData)
      } else {
        await option.api.add(saveData)
      }
      message.success('保存成功')
      setVisible(false)
      getClassifyTree()
    } catch (error) {}
  }

  return {
    loading,
    treeList,
    flatTreeList,
    slectTree,
    getClassifyTree,
    modalProps,

    handleAdd: () => setVisible(true),
    handleEdit,
    handleSort,
    handleDragEnd,
    handleDelete,
    handleFormFinish
  }
}
