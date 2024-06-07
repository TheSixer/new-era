import { FC, memo } from 'react'
import styles from './index.module.less'
import { IAreaAmountListProps, IAreaAmountValue } from './const'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Form, Space, InputNumber, Button, message } from 'antd'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'

const Component: FC<IAreaAmountListProps> = (props) => {
  const { form, name: fieldName, disabled } = props

  function areaAmountValidator(_, list: IAreaAmountValue[] = []) {
    const { takeout_distributable_range } = ESettingKey
    const isAllInputted = list.every((item) => item.km !== undefined)

    // 由 inputNumber 的 formItem 触发校验
    if (!list.length || !isAllInputted) {
      return Promise.resolve()
    }

    // 阶梯公里数校验
    const isLadderPass = list.every(({ km = 0 }, idx) => {
      const isFirst = idx === 0
      const prevArea = isFirst ? -1 : list[idx - 1].km
      const pass = km > (prevArea ?? -1)
      return pass
    })

    if (!isLadderPass) {
      return Promise.reject(new Error('请输入正确的阶梯公里数'))
    }

    const storeRange = form.getFieldValue(takeout_distributable_range)

    // 是否同时填写了可配送范围
    if (!storeRange) {
      return Promise.reject(new Error('请先填写可配送范围'))
    }

    // 末项公里数是否超过门店的可配送范围
    const last = list[list.length - 1]
    if (last.km! > storeRange) {
      return Promise.reject(new Error('不能大于门店可配送范围'))
    }

    return Promise.resolve()
  }

  return (
    <Form.List name={fieldName} rules={[{ validator: areaAmountValidator }]}>
      {(fields, { add, remove }, { errors }) => {
        const maxRows = 15
        const isOver = fields.length >= maxRows

        return (
          <Space direction="vertical">
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key}>
                <Form.Item {...restField} name={[name, 'km']} noStyle rules={[{ required: true, message: '距离不能为空' }]}>
                  <InputNumber disabled={disabled} min={1} max={5000} precision={0} />
                </Form.Item>
                <span>km内</span>
                <Form.Item {...restField} name={[name, 'shipping']} noStyle>
                  <InputNumber disabled={disabled} min={0} max={99999} precision={2} placeholder="配送金额" />
                </Form.Item>
                {!disabled && <MinusCircleOutlined size={18} onClick={() => remove(name)} />}
              </Space>
            ))}

            {!isOver && !disabled && (
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  const isPrevInputted = props.form.getFieldValue(fieldName)?.every((item) => item.km !== undefined && item.shipping !== undefined) ?? true
                  isPrevInputted ? add({}) : message.warning('请填写上一项后再新增')
                }}
              >
                添加范围
              </Button>
            )}

            <Form.ErrorList errors={errors} />
          </Space>
        )
      }}
    </Form.List>
  )
}

Component.displayName = 'AreaAmountList'

const AreaAmountList = memo(Component)
export default AreaAmountList
