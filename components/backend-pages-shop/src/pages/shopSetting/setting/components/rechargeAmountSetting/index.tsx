import { ProFormDigit } from '@ant-design/pro-form'
import { ProFormDigitProps } from '@ant-design/pro-form/lib/components/Digit'
import DragFormItem from '@wmeimob-modules/decoration-backend/src/components/commModuleComponents/dragFormItem'
import { concatRule } from '@wmeimob/form-rules'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Form, Space } from 'antd'
import { FC, memo } from 'react'
import useSettingService from '../../hooks/useSettingService'

interface IProps {
  disabled?: boolean
}

const { recharge_amount_list } = ESettingKey

const max = 20

const Component: FC<IProps> = (props) => {
  const { disabled } = props

  const { onFinish, form, loading } = useSettingService({ key: [recharge_amount_list] })

  function validate(label: string, value: number) {
    return value ? Promise.resolve() : Promise.reject(new Error(`${label}不能为0`))
  }

  return (
    <Card
      title="充值金额设置"
      extra={
        !disabled && (
          <Button type="primary" loading={loading} onClick={onFinish}>
            保存
          </Button>
        )
      }
    >
      <Form form={form} initialValues={{ [recharge_amount_list]: [] }}>
        <Form.List name={recharge_amount_list}>
          {(fields, operation) => {
            const isOver = fields.length >= max
            const commonProps: ProFormDigitProps = { min: 1, max: 99999, fieldProps: { precision: 0, required: false } }

            if (disabled) {
              return fields.map((field, idx) => (
                <Space size={20} style={{ width: '100%' }} key={idx}>
                  <ProFormDigit {...commonProps} disabled label="充值金额" name={[field.name, 'recharge']} />
                  <ProFormDigit {...commonProps} disabled min={0} label="赠送金额" name={[field.name, 'present']} />
                </Space>
              ))
            }

            return (
              <>
                <div style={{ width: 600 }}>
                  <DragFormItem
                    fields={fields}
                    operation={operation}
                    itemRender={(field) => (
                      <Space size={20}>
                        <ProFormDigit
                          {...commonProps}
                          label="充值金额"
                          name={[field.name, 'recharge']}
                          rules={concatRule(['required', { validator: (_, value) => validate('充值金额', value) }])}
                        />
                        <ProFormDigit {...commonProps} min={0} label="赠送金额" name={[field.name, 'present']} />
                      </Space>
                    )}
                  />
                </div>
                <Space>
                  {!isOver && (
                    <Button size="small" type="primary" onClick={() => operation.add({ recharge: 1 })}>
                      添加
                    </Button>
                  )}
                  <span>最多添加{max}项</span>
                </Space>
              </>
            )
          }}
        </Form.List>
      </Form>
    </Card>
  )
}

Component.displayName = 'RechargeAmountSetting'

const RechargeAmountSetting = memo(Component)
export default RechargeAmountSetting
