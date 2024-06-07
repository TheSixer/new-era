import ProTable from '@ant-design/pro-table'
import { CouponTemplateVo } from '@wmeimob/backend-api/src/request/data-contracts'
import useCouponChoose from '@wmeimob/backend-pages-shop/src/hooks/coupon/useCouponChoose'
import { Button, Drawer, Form, message, Space } from 'antd'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import AddImageButton from '../../../commModuleComponents/addImageButton'
import DragFormItem from '../../../commModuleComponents/dragFormItem'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { blockWrapperCol } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'
import { IModuleEditFormProps } from './../../../moduleEditForm/const'

interface ISettingComponetProps extends IModuleEditFormProps {}

const { List: FormList, Item: FormItem } = Form
const max = 8

const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps, form } = useModuleEditForm(props)
  const [visible, setVisible] = useState(false)

  const { tableProps, selectedValue } = useTableService({ visible, data: props.data.data })

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
                      // eslint-disable-next-line react/no-unstable-nested-components
                      itemRender={({ name }) => (
                        <FormItem noStyle shouldUpdate>
                          {({ getFieldValue }) => {
                            const coupon: CouponTemplateVo = getFieldValue(['data', name])
                            return <div style={{ marginBottom: 5 }}>{coupon.name}</div>
                          }}
                        </FormItem>
                      )}
                    />
                    <AddImageButton text="添加优惠券" current={fields.length} max={max} onClick={() => setVisible(true)} />
                  </>
                )}
              </FormList>
            </Space>
          }
          renderStyle={<ComponentStyle />}
        />
      </Form>

      <Drawer
        title="选择优惠券"
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
                  if (selectedValue.length > max) {
                    message.warn(`最多可选${max}张优惠券`)
                  } else {
                    form.setFieldsValue({ data: selectedValue })
                    props.onChange({ ...props.data, data: selectedValue })
                    setVisible(false)
                  }
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

function useTableService({ visible, data }) {
  const { tableProps, rowKey, dataSource } = useCouponChoose()
  const [value, setValue] = useState<CouponTemplateVo[]>([])
  const selectedRowKeys = useMemo(() => value.map((item) => item[rowKey]!), [value])

  useEffect(() => {
    if (visible) {
      setValue(data)
    }
  }, [visible, data])

  return {
    tableProps: {
      ...tableProps,
      rowSelection: {
        selectedRowKeys,
        // getCheckboxProps: (record) => ({ disabled: record._isFinish }),
        onChange(_ks, rows: any[]) {
          const currentRowIds = dataSource.current.map((item) => item[rowKey]!)
          const otherKeys = selectedRowKeys.filter((key) => currentRowIds.indexOf(key) === -1)
          const otherValues = value.filter((item) => otherKeys.indexOf(item[rowKey]!) !== -1)
          // 重新赋值
          setValue(otherValues.concat(rows))
        }
      }
    },
    selectedValue: value
  }
}
