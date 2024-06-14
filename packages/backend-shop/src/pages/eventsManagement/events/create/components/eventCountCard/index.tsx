import { FC, memo } from 'react'
import styles from './index.module.less'
import { IActivitySettingCardProps } from './const'
import { Button, Card, Form } from 'antd'
import { ProFormDatePicker, ProFormDependency, ProFormDigit, ProFormRadio, ProFormTimePicker } from '@ant-design/pro-form'
import { PlusOutlined } from '@ant-design/icons'
import mmFormRule from '@wmeimob/form-rules'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import useDisableActivityTime from '~/hooks/activity/useDisableActivityTime'

const Component: FC<IActivitySettingCardProps> = (props) => {
  const { disabled } = props

  const disableActivityTimeProps = useDisableActivityTime()

  return (
    <Card title="活动设置" className={styles.activitySettingCardStyle}>
      <ProFormRadio.Group
        label="活动类型"
        name="unify"
        disabled={disabled}
        options={[{label: '统一场次', value: 1}, {label: '多场次', value: 0}]}
        rules={mmFormRule.required}
      />

      <ProFormDependency name={['unify']}>
        {({ unify }, form) => {

          if (unify) {
            return <ProFormLimitInput label="活动席位" name="seat" disabled={disabled} maxLength={32} placeholder={'请输入活动席位'} rules={mmFormRule.required} />
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
                              <Button type="link" size="small" onClick={() => remove(name)}>
                                删除
                              </Button>
                            )
                          }
                          style={{ marginBottom: 10 }}
                        >
                          <ProFormDatePicker
                            label="场次日期"
                            name={[name, "unifyDate"]}
                            rules={mmFormRule.required}
                            disabled={disabled}
                            // extra={!!activityNo && '编辑活动无法修改时间'}
                            fieldProps={{
                              format: 'YYYY-MM-DD',
                              ...disableActivityTimeProps
                            }}
                          />

                          <ProFormTimePicker.RangePicker
                            label="场次时间"
                            name={[name, "unifyTime"]}
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
                            name={[name, "seat"]}
                            disabled={disabled}
                            rules={mmFormRule.required}
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
