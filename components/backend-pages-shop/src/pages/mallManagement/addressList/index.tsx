import { FC, memo, useRef, useState } from 'react'
import styles from './index.module.less'
import { IAddressListProps } from './const'
import { ModalForm } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { message, Button, Typography, Space, Tag, Tooltip, Form } from 'antd'
import ProFormMobile from '@wmeimob/backend-pro/src/components/form/proFormMobile'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '@wmeimob/backend-api/src/request'
import ProFormCityCascader from '@wmeimob/backend-pro/src/components/form/proFormCityCascader'
import getCityInfoById from '@wmeimob/backend-pro/src/utils/getCityInfoByIds'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { AddressOutputDto } from '@wmeimob/backend-api/src/request/data-contracts'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'

/**
 * 地址库
 * @param props
 * @returns
 */
const Component: FC<IAddressListProps> = (props) => {
  const [columns] = useState<ProColumns<AddressOutputDto>[]>([
    { title: '联系人', dataIndex: 'name' },
    { title: '电话', dataIndex: 'mobile' },
    {
      title: '地址',
      dataIndex: 'singleAddress',
      render: (_v, { provinceName = '', cityName = '', areaName = '', singleAddress = '' }) => [provinceName, cityName, areaName, singleAddress].join(' ')
    },
    {
      title: '默认设置',
      dataIndex: 'isDefault',
      render(value: any, record, index) {
        const isSend = [1, 3].includes(value)
        const isReturned = [2, 3].includes(value)

        return (
          <>
            {isSend && (
              <Tooltip title={isSend ? '当前地址为默认发货地址，发货时将默认选中此地址' : null}>
                <Tag color={isSend ? '#1890ff' : undefined}>发货地址</Tag>
              </Tooltip>
            )}
            {isReturned && (
              <Tooltip title={isReturned ? '当前地址为默认退货地址，退货时将默认选中此地址' : null}>
                <Tag color={isReturned ? '#1890ff' : undefined}>退货地址</Tag>
              </Tooltip>
            )}
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'edit',
              onClick: () => {
                const citys = [`${record.provinceId}`, `${record.cityId}`, `${record.areaId}`]
                if (!record.areaId) {
                  citys.pop()
                }
                modalProps.form.setFieldsValue({
                  ...record,
                  citys
                })
                setEditData(record)
                setVisible(true)
              }
            },
            {
              id: 'del',
              onClick: async () => {
                await api['/admin/mall/address/delete/{id}_DELETE'](record.id!)
                message.success('删除成功')
                actionRef.current?.reload()
              }
                        }
          ]}
        />
      )
    }
  ])

  const { request, actionRef } = useProTableRequest<AddressOutputDto, any>(async (params: any) => {
    const { data: list = [], ...rest } = await api['/admin/mall/address/queryListAll_GET'](params)
return {
      ...rest,
      data: {
        list,
        total: list.length
      }
    }
  })

  const { modalProps, editData, setEditData, setVisible } = useProTableForm()
  const [handleFormFinish] = useSuperLock(async (values) => {
    try {
      const { citys, ...rest } = values

      const [provinceId, cityId, areaId = ''] = citys

      const { province, city, district } = getCityInfoById({ province: provinceId, city: cityId, district: areaId })

      const saveData = {
        ...rest,
        provinceId,
        provinceName: province!.label,
        cityId,
        cityName: city!.label,
        areaId,
        areaName: district?.label || ''
      }
      if (editData?.id) {
        const { id } = editData
        await api['/admin/mall/address/update_PUT']({ id, ...saveData })
        message.success('更新成功')
      } else {
        await api['/admin/mall/address/add_POST'](saveData)
        message.success('保存成功')
      }
      setVisible(false)
      setEditData(undefined)
      actionRef.current?.reload()
      return true
    } catch (error) {
      // eslint-disable-next-line no-console
console.log(error)
    }
    return false
  })

  return (
    <PageContainer className={styles.employeeManagementStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        params={{ pageSize: 30 }}
        request={request}
        search={false}
        pagination={false}
        toolbar={{
          title: (
            <Space>
              <Button key="add" type="primary" onClick={() => setVisible(true)}>
                新增
              </Button>
              <Typography.Text key="tip" type="secondary" style={{ fontSize: 12 }}>
                *最多新增20个
              </Typography.Text>
            </Space>
          )
        }}
      />

      <ModalForm {...modalProps} initialValues={{ isDefault: 0 }} onFinish={handleFormFinish}>
        <ProFormLimitInput label="联系人" name="name" maxLength={20} rules={[{ required: true }]} />

        <ProFormMobile label="电话" name="mobile" rules={[{ required: true }]} />

        <ProFormCityCascader label="地区" name="citys" rules={[{ required: true }]} />

        <ProFormLimitInput label="详细地址" name="singleAddress" rules={[{ required: true }]} maxLength={100} />

        <Form.Item label="默认设置" name="isDefault">
          <IsDefault />
        </Form.Item>
      </ModalForm>
    </PageContainer>
  )
}

Component.displayName = 'AddressList'

const AddressList = memo(Component)
export default AddressList

function IsDefault({ value, onChange }: any) {
  // 是否默认 0 无 1 发货地址 2 退货地址 3全部
  const isSend = [1, 3].includes(value)
  const isReturned = [2, 3].includes(value)

  const handleClickSend = () => {
    if (isSend && isReturned) {
      onChange(2)
    } else if (isSend && !isReturned) {
      onChange(0)
    } else if (!isSend && isReturned) {
      onChange(3)
    } else {
      onChange(1)
    }
  }

  const handleReturnClick = () => {
    if (isSend && isReturned) {
      onChange(1)
    } else if (isSend && !isReturned) {
      onChange(3)
    } else if (!isSend && isReturned) {
      onChange(0)
    } else {
      onChange(2)
    }
  }

  return (
    <Space>
      <Button type={isSend ? 'primary' : 'default'} onClick={handleClickSend}>
        发货地址
      </Button>
      <Button type={isReturned ? 'primary' : 'default'} onClick={handleReturnClick}>
        退货地址
      </Button>
    </Space>
  )
}
