import { FC, memo } from 'react'
import styles from './index.module.less'
import { IActivitySettingCardProps } from './const'
import { Button, Card, Form } from 'antd'
import { ProFormDatePicker, ProFormDependency, ProFormDigit, ProFormRadio, ProFormTimePicker } from '@ant-design/pro-form'
import { PlusOutlined } from '@ant-design/icons'
import mmFormRule from '@wmeimob/form-rules'
import useDisableActivityTime from '~/hooks/activity/useDisableActivityTime'
import moment from 'moment'

const Component: FC<IActivitySettingCardProps> = (props) => {
  const { disabled } = props

  const disableActivityTimeProps = useDisableActivityTime()

  const validatePositiveInteger = (_, value) => {
    if (!value || /^[1-9]\d*$/.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('请输入正整数'))
  }

  return (
    <Card title="活动场次" className={styles.activitySettingCardStyle}>
      <ProFormRadio.Group
        label="活动类型"
        name="unify"
        disabled={disabled}
        options={[
          { label: '统一场次', value: 1 },
          { label: '多场次', value: 0 }
        ]}
        rules={mmFormRule.required}
      />

      <ProFormDependency name={['unify', 'activityTime']}>
        {({ unify, activityTime }, form) => {
          if (unify) {
            return (
              <ProFormDigit
                label="活动席位"
                name="seat"
                disabled={disabled}
                min={1}
                max={625}
                placeholder={'请输入活动席位'}
                rules={[{ required: true, message: '请输入活动席位' }, { validator: validatePositiveInteger }]}
              />
            )
          }

          return (
            <>
              <Form.List name="unifyCreateInputDtos">
                {(fields, { add, remove }) => (
                  <Card>
                    {fields.map(({ key, name, ...restField }, index) => {
                      return (
                        <Card
                          key={key}
                          title={`场次${index + 1}`}
                          extra={
                            disabled ? null : (
                              <Button disabled={fields.length === 1} type="link" size="small" onClick={() => remove(name)}>
                                删除
                              </Button>
                            )
                          }
                          style={{ marginBottom: 10 }}
                        >
                          <ProFormDatePicker
                            label="场次日期"
                            name={[name, 'unifyDate']}
                            rules={mmFormRule.required}
                            disabled={disabled}
                            // extra={!!activityNo && '编辑活动无法修改时间'}
                            fieldProps={{
                              format: 'YYYY-MM-DD',
                              ...disableActivityTimeProps,
                              disabledDate(date) {
                                if (activityTime.length > 0) {
                                  return date.isBefore(moment(activityTime?.[0]), 'days') || date.isAfter(moment(activityTime?.[1]), 'days')
                                }
                                return date.isBefore(moment(), 'day')
                              }
                            }}
                          />

                          <ProFormTimePicker.RangePicker
                            label="场次时间"
                            name={[name, 'unifyTime']}
                            rules={mmFormRule.required}
                            disabled={disabled}
                            fieldProps={{
                              format: 'HH:mm'
                            }}
                          />

                          <ProFormDigit
                            {...restField}
                            label="活动席位"
                            wrapperCol={{ span: 24 }}
                            name={[name, 'seat']}
                            disabled={disabled}
                            min={1}
                            max={625}
                            rules={[{ required: true, message: '请输入活动席位' }, { validator: validatePositiveInteger }]}
                            fieldProps={{
                              placeholder: '请输入活动席位'
                            }}
                            width={190}
                          />
                        </Card>
                      )
                    })}
                    {!disabled && unify === 0 && (
                      <Button type="dashed" onClick={() => add({})} block icon={<PlusOutlined />}>
                        添加场次
                      </Button>
                    )}
                  </Card>
                )}
              </Form.List>
            </>
          )
        }}
      </ProFormDependency>
    </Card>
  )
}

Component.displayName = 'ActivitySettingCard'

const ActivitySettingCard = memo(Component)
export default ActivitySettingCard
