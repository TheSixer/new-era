import { FC, memo, useState } from 'react'
import { Button, message, Image } from 'antd'
import { BannerCreateInputDto, api } from '~/request'
import { EJumpType, MJumpType } from '~/components/jumpType/enums/EJumpType'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { BannerOutputDto } from '@wmeimob/backend-api'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import { ModalForm, ProFormDependency, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import mmFormRule from '@wmeimob/form-rules'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import ProFormJumpType from '@wmeimob/backend-pro/src/components/form/proFormJumpType'
import { advertiseConfig } from '@wmeimob/shop-data/src/config'
import JumpTypeValue from '@wmeimob/backend-pro/src/components/jumpType/jumpTypeValue'

const Component: FC<any> = ({ history }) => {
  const editModal = useProTableForm<BannerCreateInputDto>()
  const [columns] = useState<ProColumns<BannerOutputDto>[]>([
    {
      title: '图片',
      dataIndex: 'imgUrl',
      valueType: 'image',
      hideInSearch: true,
      width: 180,
      render: (value, record) => record?.bannerType === 1 ? (
        <video style={{ width: 64, height: 108 }}>
          <source src={record?.imgUrl as string} type="video/mp4" />
          <source src={record?.imgUrl as string} type="video/ogg" />
        </video>
      ) : (
        <Image
          width={32}
          src={record?.imgUrl as string}
        />
      )
    },
    { title: '标题', dataIndex: 'name', hideInTable: true },
    { title: '内容', dataIndex: 'content', hideInSearch: true },
    // {
    //   title: '显示位置',
    //   dataIndex: 'position',
    //   hideInSearch: true,
    //   render(value: any) {
    //     return (
    //       <span>
    //         {value
    //           .split(',')
    //           .map((item) => MAdvertisingPosition[item])
    //           .join('、')}
    //       </span>
    //     )
    //   }
    // },
    {
      title: '跳转类型',
      dataIndex: 'urlType',
      width: 90,
      hideInSearch: true,
      render(value: any) {
        return <span>{MJumpType[value] || '无'}</span>
      }
    },
    {
      title: '跳转内容',
      dataIndex: 'url',
      hideInSearch: true,
      render: (value, record) => <JumpTypeValue jumpValue={{ type: record.urlType as unknown as EJumpType, content: record.url as any }} />
    },
    { title: '排序值', dataIndex: 'sort', width: 80, hideInSearch: true },
    {
      title: '显示状态',
      dataIndex: 'showStatus',
      width: 90,
      valueType: 'select',
      valueEnum: { 1: '显示', 0: '不显示' },
      render: (_v, record) => {
        return (
          <StatusSwitchColumn
            checked={!!record.showStatus}
            onSwitch={async () => {
              await api['/admin/mall/banner/updateStatus_PUT']({ id: record.id, showStatus: record.showStatus === 1 ? 0 : 1 })
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
      width: 80,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'edit',
              onClick: () => {
                editModal.setVisible(true)
                editModal.setEditData(record)
                editModal.modalProps.form.setFieldsValue({
                  ...record,
                  jumpType: {
                    content: record.url && JSON.parse(record.url),
                    type: record.urlType as unknown as EJumpType
                  }
                })
              }
            },
            {
              id: 'del',
              onClick: async () => {
                await api['/admin/mall/banner/delete/{id}_DELETE'](record.id!)
                actionRef.current?.reload()
              }
            }
          ]}
        />
      )
    }
  ])

  const { request, actionRef } = useProTableRequest((params) => api['/admin/mall/banner/queryList_GET']({...params, position: 'BRAND_STORY'}), {
    dataFormat: (data) =>
      data.map((item) => {
        return item
      })
  })

  async function handleEditFormFinish(values: BannerCreateInputDto) {
    const isAdd = !editModal.editData?.id
    const { content, type } = values?.jumpType || {}

    const params = {
      ...values,
      id: editModal.editData?.id,
      url: content && JSON.stringify?.(content),
      urlType: type,
      position: 'BRAND_STORY'
    }
    console.log(params)

    try {
      isAdd ? await api['/admin/mall/banner/add_POST'](params) : await api['/admin/mall/banner/update_PUT'](params)

      actionRef.current?.reload()
      message.success(isAdd ? '添加成功' : '修改成功')

      return true
    } catch {}

    return false
  }

  /** 弹窗 */
  const modal = (
    <ModalForm<BannerCreateInputDto>
      {...editModal.modalProps}
      width={600}
      title={`${editModal.editData?.id?'编辑':'新增'}`}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ url: { type: EJumpType.None, content: {} }, bannerType: 0, showStatus: 1 }}
      onFinish={handleEditFormFinish}
    >
      <ProFormRadio.Group
        label="显示类型"
        name="bannerType"
        onChange={() => editModal.modalProps.form.setFieldsValue({ imgUrl: '' })}
        rules={mmFormRule.required}
        options={[
          { label: '图片', value: 0 },
          { label: '视频', value: 1 }
        ]}
      />

      <ProFormDependency name={['bannerType']}>
        {({ bannerType }, form) => (
          <ProFormMaterial label={bannerType ? "视频" : "图片"} name="imgUrl" rules={mmFormRule.required} fieldProps={{ measure: bannerType ? [720, 1280] : advertiseConfig.measure, type: bannerType }} />
        )}
      </ProFormDependency>


      {/* <ProFormLimitInput label="内容" name="content" rules={mmFormRule.required} maxLength={20} /> */}
      <ProFormTextArea label="内容" name="content" rules={mmFormRule.required} />

      <ProFormJumpType label="跳转类型" name="jumpType" />

      {/* <ProFormCheckbox.Group label="显示位置" name="position" rules={mmFormRule.required} options={OAdvertisingPosition} /> */}

      <ProFormRadio.Group
        label="显示状态"
        name="showStatus"
        rules={mmFormRule.required}
        options={[
          { label: '显示', value: 1 },
          { label: '不显示', value: 0 }
        ]}
      />

    </ModalForm>
  )

  return (
    <>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={request}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom,
            <Button
              type="primary"
              key="out"
              onClick={() => {
                // history.push(routeNames.basicSettingAdvertisingSpaceAdd)
                editModal.modalProps.form.resetFields()
                editModal.setEditData(undefined)
                editModal.setVisible(true)
              }}
            >
              新增
            </Button>
          ]
        }}
      />
      {modal}
    </>
  )
}

Component.displayName = 'AdvertisingSpace'

const AdvertisingSpace = memo(Component)
export default AdvertisingSpace
