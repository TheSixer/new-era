import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { MSourceEvaluate } from '@wmeimob-modules/goods-data/src/enums/ESourceEvaluate'
import { api, CommentsImportItem } from '@wmeimob/backend-api'
import AlbumColumn from '@wmeimob/backend-pro/src/components/table/albumColumn'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { Button, Input, message, Upload } from 'antd'
import Excel from 'exceljs'
import { FC, memo, useRef, useState } from 'react'
import DetailModal from './components/detailModal'
import EditModal from './components/editModal'
import { IGoodsComment } from './const'

interface IGoodsCommentsProps {
  service: ReturnType<typeof useService>

  /** 点击下载模板 */
  onTemplateDownloadClick(): void
}

const Component: FC<IGoodsCommentsProps> = (props) => {
  const { service } = props
  // 导入评价
  const { handleBeforeUpload } = useImportComments({ onUploadSuccess: () => service.actionRef.current?.reload() })

  return (
    <PageContainer>
      <ProTable
        actionRef={service.actionRef}
        rowKey="id"
        columns={service.columns}
        request={service.request}
        scroll={{ x: 2000 }}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            <Button type="primary" key="export" loading={service.exportLoading} onClick={() => service.exportTable()}>
              导出
            </Button>,
            ...dom
          ]
        }}
        toolbar={{
          actions: [
            <Upload key="upload" showUploadList={false} beforeUpload={handleBeforeUpload}>
              <Button type="primary">导入评价</Button>
            </Upload>,
            <Button key="download" type="text" onClick={props.onTemplateDownloadClick}>
              下载导入模板
            </Button>
          ]
        }}
      />

      {/* 详情 */}
      <DetailModal detail={service.detailModal.editData} modalProps={service.detailModal.modalProps} onFinish={service.handleDetailModalFinish} />

      {/* 回复 */}
      <EditModal detail={service.editModalForm.editData} {...service.editModalForm.modalProps} onFinish={service.handleFormFinish} />
    </PageContainer>
  )
}

Component.displayName = 'PageGoodsComments'

const PageGoodsComments = memo(Component)
export default PageGoodsComments

interface IUseServiceProps {
  /** 接口url */
  apiUrl: string
}

export function useService(props: IUseServiceProps) {
  const { apiUrl } = props

  const [columns] = useState<ProColumns<IGoodsComment>[]>([
    { title: '头像', dataIndex: 'headImg', hideInSearch: true, valueType: 'image', width: 60 },
    {
      title: '评论用户',
      dataIndex: 'nickName',
      width: 120,
      ellipsis: true,
      formItemProps: { label: ' ', labelCol: { span: 0 }, colon: false },
      renderFormItem: (_) => {
        return <Input placeholder="输入评价人/手机号/商品编号/订单编号" maxLength={20} allowClear />
      }
    },
    { title: '手机号', dataIndex: 'mobile', width: 120, hideInSearch: true },
    {
      title: '评价来源',
      dataIndex: 'fromType',
      valueType: 'select',
      valueEnum: MSourceEvaluate,
      width: 120
    },
    { title: '评价时间', dataIndex: 'gmtCreated', valueType: 'dateRange', render: (_v, record) => record.gmtCreated },
    { title: '商品编号', dataIndex: 'goodsNo', hideInSearch: true },
    { title: '订单编号', dataIndex: 'orderNo', hideInSearch: true },
    { title: '描述相符', dataIndex: 'goodsGrade', valueType: 'rate', hideInSearch: true },
    { title: '物流速度', dataIndex: 'logisticsGrade', valueType: 'rate', hideInSearch: true },
    { title: '服务态度', dataIndex: 'serviceGrade', valueType: 'rate', hideInSearch: true },
    { title: '评价内容', dataIndex: 'content', hideInSearch: true },
    { title: '评价图片', dataIndex: 'commentImgs', hideInSearch: true, render: (value: any) => <AlbumColumn value={value} /> },
    {
      title: '显示状态',
      dataIndex: 'show',
      hideInSearch: true,
      fixed: 'right',
      width: 100,
      render: (_v, record) => {
        return (
          <StatusSwitchColumn
            checked={record.show}
            checkedChildren="显示"
            unCheckedChildren="隐藏"
            onSwitch={async () => {
              const { show, id } = record
              await api['/admin/comments/show_PUT']({ id, status: !show })
              actionRef.current?.reload()
            }}
          />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 120,
      render: (_, record) => {
        // 有追评但没回复
        const hadAddCommentButNotReply = record.isAdd && !record.addReplyAt

        return (
          <OperationsColumns
            operations={[
              {
                id: 'reply',
                show: !record.replyAt || !!hadAddCommentButNotReply, // 只要有一次没回复就显示
                text: <a onClick={() => onReplyClick(record)}>回复</a>
              },
              {
                id: 'detail',
                text: <a onClick={() => onDetailClick(record)}>详情</a>
              },
              {
                id: 'del',
                onClick: async () => {
                  await api['/admin/comments/{id}_DELETE'](record.id!)
                  actionRef.current?.reload()
                }
              }
            ]}
          />
        )
      }
    }
  ])

  const { request, exportLoading, exportTable, actionRef } = useProTableRequest<IGoodsComment>((params) => api['/admin/comments_GET'](params) as any, {
    exportUrl: `${apiUrl}/admin/comments/export`,
    paramsFormat(params) {
      const { gmtCreated, nickName, ...rest } = params
      if (gmtCreated) {
        const [beginTime, endTime] = gmtCreated
        rest.beginTime = beginTime + ' 00:00:00'
        rest.endTime = endTime + ' 23:59:59'
      }
      if (nickName) {
        rest.condition = nickName
      }
      return rest
    },
    dataFormat: (data) =>
      data.map((it) => {
        return {
          ...it,
          commentImgs: it.imgs ? it.imgs?.split(',') : [],
          addCommentImgs: it.addImgs ? it.addImgs?.split(',') : []
        }
      })
  })

  const editModalForm = useProTableForm<IGoodsComment>()

  const detailModal = useProTableForm<IGoodsComment>()

  const onReplyClick = (record: IGoodsComment) => {
    editModalForm.setEditData(record)
    editModalForm.setVisible(true)
    editModalForm.modalProps.form.setFieldsValue({
      replyContent: record.replyContent,
      addReplyContent: record.addReplyContent
    })
  }

  const onDetailClick = (record: IGoodsComment) => {
    detailModal.setEditData(record)
    detailModal.setVisible(true)
  }

  const handleFormFinish = async (data: Partial<IGoodsComment>) => {
    const isFirstReply = !editModalForm.editData?.replyAt

    try {
      isFirstReply
        ? await api['/admin/comments/reply_PUT']({ commentsId: editModalForm.editData!.id, replyContent: data.replyContent })
        : await api['/admin/comments/replyAdd_PUT']({ commentsId: editModalForm.editData!.id, replyContent: data.addReplyContent })

      message.success('保存成功')
      editModalForm.setVisible(false)
      actionRef.current?.reload()
    } catch (error) {
      message.error('保存失败')
    }
  }

  function handleDetailModalFinish() {
    detailModal.setVisible(false)
    return Promise.resolve()
  }

  return {
    actionRef,
    columns,
    request,
    exportLoading,
    exportTable,
    editModalForm,
    detailModal,
    handleFormFinish,
    handleDetailModalFinish
  }
}

/**
 * 导入评价
 * @returns
 */
function useImportComments(option: { onUploadSuccess: () => void }) {
  const workbook = useRef(new Excel.Workbook())

  const handleBeforeUpload = (file) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const wb = await workbook.current.xlsx.load(reader.result! as any)
      const worksheet = wb.getWorksheet(1)

      const keys = ['nickName', 'goodsNo', 'goodsGrade', 'content']
      const items: CommentsImportItem[] = []

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const item: CommentsImportItem = {}
          row.eachCell((cell, cellNumber) => {
            if (cellNumber <= keys.length) {
              item[keys[cellNumber - 1]] = cell.value
            }
          })
          items.push(item)
        }
      })

      await api['/admin/comments/import_POST']({ items })
      message.success('新增成功')
      option.onUploadSuccess()
    }

    reader.readAsArrayBuffer(file)
    return false
  }

  return {
    handleBeforeUpload
  }
}
