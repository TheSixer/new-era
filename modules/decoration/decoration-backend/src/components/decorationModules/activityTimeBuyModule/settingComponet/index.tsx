import { ProFormDigit } from '@ant-design/pro-form'
import ProTable, { ProTableProps } from '@ant-design/pro-table'
import { api } from '@wmeimob/backend-api/src/request'
import { MarketingActivityVo } from '@wmeimob/backend-api/src/request/data-contracts'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { EChooseGoodType } from '@wmeimob-modules/decoration-data/src/enums/EChooseGoodType'
import { EActivityStatus } from '@wmeimob/shop-data/src/enums/activity/EActivityStatus'
import { Button, Drawer, Form, Space } from 'antd'
import dayjs from 'dayjs'
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import AddImageButton from '../../../commModuleComponents/addImageButton'
import DragFormItem from '../../../commModuleComponents/dragFormItem'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { blockWrapperCol } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'
import { IModuleEditFormProps } from './../../../moduleEditForm/const'

interface ISettingComponetProps extends IModuleEditFormProps {}

const { List: FormList, Item: FormItem } = Form
const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps, form } = useModuleEditForm(props)
  const [visible, setVisible] = useState(false)

  const { tableProps, selectedValue } = useActivityTableService({ visible, data: props.data.data })

  return (
    <div>
      <Form {...formProps}>
        <TabContainer
          renderContent={
            <Space direction="vertical" style={{ width: '100%' }}>
              <FormList name="data">
                {(fields, operation) => (
                  <>
                    <DragFormItem
                      {...blockWrapperCol}
                      fields={fields}
                      operation={operation}
                      renderHeader={(field) => {
                        return (
                          <FormItem noStyle shouldUpdate>
                            {({ getFieldValue }) => getFieldValue(['data', field.name, 'activityName'])}
                          </FormItem>
                        )
                      }}
                      // eslint-disable-next-line react/no-unstable-nested-components
                      itemRender={({ name }) => (
                        <>
                          <ProFormDigit
                            label="显示数量"
                            name={[name, 'showGoodNum']}
                            fieldProps={{ precision: 0, min: 1, max: 20 }}
                            rules={[{ required: true }]}
                          />
                          <ProFormLimitInput label="显示名称" name={[name, 'showActivityTitle']} maxLength={4} rules={[{ required: true }]} />
                          <ProFormLimitInput label="按钮名称" name={[name, 'btnName']} maxLength={3} rules={[{ required: true }]} />
                        </>
                      )}
                    />
                    <AddImageButton text="添加活动" current={fields.length} max={5} onClick={() => setVisible(true)} />
                  </>
                )}
              </FormList>
            </Space>
          }
          renderStyle={<ComponentStyle />}
        />
      </Form>

      <Drawer
        title="选择活动"
        visible={visible}
        width="80%"
        maskClosable={false}
        closable={false}
        footer={
          <div>
            <Space>
              <Button onClick={() => setVisible(false)}>取消</Button>
              <Button
                type="primary"
                onClick={() => {
                  form.setFieldsValue({ data: selectedValue })
                  props.onChange({ ...props.data, data: selectedValue })
                  setVisible(false)
                }}
              >
                确定
              </Button>
            </Space>
          </div>
        }
      >
        <ProTable {...tableProps} toolBarRender={false} search={false} />
      </Drawer>
    </div>
  )
}

Component.displayName = 'SettingComponet'

const SettingComponet = memo(Component)
export default SettingComponet

function useActivityTableService({ visible, data }) {
  const [value, setValue] = useState<any[]>([])
  const selectedRowKeys = useMemo(() => value.map((item) => item.id!), [value])

  const dataSource = useRef<MarketingActivityVo[]>([])

  useEffect(() => {
    if (visible) {
      setValue(data)
    }
  }, [visible, data])

  const tableProps: ProTableProps<any, any> = {
    columns: [
      { title: '活动名称', dataIndex: 'activityName' },
      { title: '活动编号', dataIndex: 'activityNo' },
      {
        title: '活动时间',
        dataIndex: 'activityTime',
        valueType: 'dateRange',
        render: (_d, record) => (
          <Space>
            <span>{record.startTime}</span>
            <span>~</span>
            <span>{record.endTime}</span>
          </Space>
        )
      }
    ],
    rowKey: 'id',
    rowSelection: {
      selectedRowKeys,
      getCheckboxProps: (record) => ({ disabled: record._isFinish }),
      onChange(_ks, rows: any[]) {
        const currentRowIds = dataSource.current.map((item) => item.id!)
        const otherKeys = selectedRowKeys.filter((key) => currentRowIds.indexOf(key) === -1)
        const otherValues = value.filter((item) => otherKeys.indexOf(item.id!) !== -1)

        const currentValues = rows.map((item) => {
          const result = data.find((da) => da.id === item.id)
          return (
            result || {
              ...item,
              showActivityTitle: '限时抢购',
              showGoodNum: 2,
              chooseGoodType: EChooseGoodType.Auto,
              goods: [],
              btnName: '去抢购'
            }
          )
        })
        // 重新赋值
        setValue(otherValues.concat(currentValues))
      }
    },
    request: useProTableRequest((params) => api['/admin/activity/flashSale_GET']({ ...params, activityStatus: EActivityStatus.Use }), {
      dataFormat: (data) => {
        dataSource.current = [...data]
        return data.map((it) => ({ ...it, activityTime: [it.startTime, it.endTime], _isFinish: dayjs().isAfter(dayjs(it.endTime), 'second') }))
      }
    }).request
  }

  return {
    tableProps,
    selectedValue: value
  }
}
