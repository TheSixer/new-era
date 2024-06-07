import { MinusCircleOutlined } from '@ant-design/icons'
import { ModalForm } from '@ant-design/pro-form'
import { Button, Form, InputNumber, message, Select, Space } from 'antd'
import { CSSProperties, FC, memo } from 'react'
import { ITimeRangeSelectProps, ITimeRangeValue } from './const'
import exampleImg from './images/example.jpg'

const range = [...Array(24)].reduce((list, _, idx) => {
  const time = idx < 0 ? `0${idx}` : idx
  return [...list, `${time}:00`, `${time}:30`]
}, [])
range.push('24:00')

const options = range.map((item) => ({ label: item, value: item }))

const max = 48

const selectStyle: CSSProperties = { width: 150 }

const Component: FC<ITimeRangeSelectProps> = (props) => {
  const { form, name, disabled } = props

  function timeStringToNumber(timeString = '') {
    return Number(timeString.replace(':', ''))
  }

  function validator(_, list?: ITimeRangeValue[]) {
    const isAllInputted = list?.every((item) => item.start !== undefined && item.end !== undefined)

    if (!list?.length || !isAllInputted) {
      return Promise.resolve()
    }

    const valid = list.every((item, idx) => {
      const prev = list[idx - 1]
      const start = timeStringToNumber(item.start)
      const end = timeStringToNumber(item.end)

      // 同组 结束 未大于 开始
      if (end < start) {
        return false
      }

      // 当前组 开始 应大于等于 上一组 结束
      if (prev) {
        const prevEnd = timeStringToNumber(prev.end)
        const pass = start >= prevEnd
        return pass
      }

      return true
    })

    if (!valid) {
      return Promise.reject(new Error('时间段设置错误，请重新修改'))
    }

    return Promise.resolve()
  }

  function handleTimeChange(idx: number) {
    const current: ITimeRangeValue = form.getFieldValue([name, idx])

    // 选完当前组的开始结束时间，才开始验证重叠
    if (!current.start || !current.end) {
      return
    }

    const currentStart = timeStringToNumber(current.start)
    const currentEnd = timeStringToNumber(current.end)

    const values: ITimeRangeValue[] = form.getFieldValue(name)
    const valid = values.every((item, index) => {
      let pass = true
      const start = timeStringToNumber(item.start)
      const end = timeStringToNumber(item.end)

      if (index < idx) {
        // 对比 当前组之前
        pass = end <= currentStart
      } else if (index > idx) {
        // 对比 当前组之后
        pass = start >= currentEnd
      } else {
        // 对比 当前组
        pass = currentEnd > currentStart
      }

      return pass
    })

    // 有重叠时间
    if (!valid) {
      message.warning('时间段与已有时间段重合，请重新设定起止时间')
      setTimeout(() => {
        form.setFieldValue([name, idx, 'start'], undefined)
        form.setFieldValue([name, idx, 'end'], undefined)
      }, 50)
    }
  }

  return (
    <Form.List name={name} rules={[{ validator }]}>
      {(fields, { add, remove }, { errors }) => {
        const isOver = fields.length >= max

        return (
          <Space direction="vertical" size={0}>
            {fields.map(({ key, name, ...restField }, idx) => (
              <Space align="baseline" key={key}>
                <Form.Item {...restField} name={[name, 'start']} rules={[{ required: true, message: '请选择开始时间' }]}>
                  <Select disabled={disabled} style={selectStyle} options={options} placeholder="开始时间" onChange={() => handleTimeChange(idx)} />
                </Form.Item>

                <span>---</span>

                <Form.Item {...restField} name={[name, 'end']} rules={[{ required: true, message: '请选择结束时间' }]}>
                  <Select disabled={disabled} style={selectStyle} options={options} placeholder="结束时间" onChange={() => handleTimeChange(idx)} />
                </Form.Item>

                <Space align="baseline">
                  <span>可接订单数量</span>
                  <Form.Item {...restField} name={[name, 'ordersLimit']} rules={[{ required: true, message: '请填写接单数' }]}>
                    <InputNumber disabled={disabled} precision={0} min={1} max={99999} />
                  </Form.Item>
                  <span>单</span>
                </Space>

                {!disabled && <MinusCircleOutlined size={18} onClick={() => remove(name)} />}
              </Space>
            ))}

            <Space>
              {!isOver && !disabled && (
                <Button size="small" type="primary" onClick={() => add({})}>
                  添加范围
                </Button>
              )}

              <ModalForm width={550} submitter={false} trigger={<Button type="link">示例说明</Button>}>
                <p>例如：</p>
                <p>设置开始时间为16:00，结束时间为22:00；则用户只能在该时间段选择时间下单</p>
                <p>当前时间为13:20，则最新可选时间为16：00-16:30、16：30-17:00</p>
                <img src={exampleImg} style={{ width: '100%', border: '1px solid #ccc' }} />
              </ModalForm>
            </Space>

            <Form.ErrorList errors={errors} />
          </Space>
        )
      }}
    </Form.List>
  )
}

Component.displayName = 'TimeRangeSelect'

const TimeRangeSelect = memo(Component)
export default TimeRangeSelect
