import { FC, memo } from 'react'
import styles from './index.module.less'
import { IActivitySettingCardProps } from './const'
import { Button, Card, Form, Input } from 'antd'
import mmFormRule from '@wmeimob/form-rules'
import { ProFormDigit } from '@ant-design/pro-form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'

const Component: FC<IActivitySettingCardProps> = (props) => {
  const { disabled } = props

  return (
    <Card title="座位设置" className={styles.activitySettingCardStyle}>
      <Form.List name="seatCreateInputListDtos">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={(
                  <ProFormLimitInput label="区域名称" name={[field.name, 'areaName']} placeholder={'区域名称'} disabled={disabled} maxLength={10} rules={mmFormRule.required} />
                )}
                key={field.key}
                extra={
                  <Button
                    disabled={fields.length === 1}
                    onClick={() => {
                      remove(field.name);
                    }}
                  >
                    删除
                  </Button>
                }
              >
                {/* Nest Form.List */}
                <Form.List name={[field.name, 'seatCreateInputDtos']}>
                  {(subFields, subOpt) => (
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                      {subFields.map((subField) => (
                        <Card key={subField.key}>
                          {/* <Form.Item label="排号" name={[subField.name, 'rowNumber']}>
                            <Input placeholder="排号" />
                          </Form.Item>
                          <Form.Item label="座位数量" name={[subField.name, 'seat']}>
                            <Input placeholder="座位数量" />
                          </Form.Item> */}
                          <ProFormLimitInput label="排号" name={[subField.name, 'rowNumber']} placeholder={'排号'} disabled={disabled} maxLength={32} rules={mmFormRule.required} />

                          <ProFormDigit
                            label="座位数量"
                            name={[subField.name, 'seat']}
                            placeholder={'座位数量'}
                            disabled={disabled}
                            min={1}
                            max={25}
                            rules={[
                              ...mmFormRule.required,
                              {
                                validator: (_, value: string) => {
                                  if (!value || /^[1-9]\d*$/.test(value)) {
                                    return Promise.resolve()
                                  }
                                  return Promise.reject(new Error('请输入正整数'))
                                }
                              }
                            ]}
                          />
                                                
                          <Form.Item wrapperCol={{ offset: 3 }}>
                            <Button
                              disabled={subFields.length === 1}
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            >
                              删除
                            </Button>
                          </Form.Item>
                        </Card>
                      ))}
                      <Button type="dashed" disabled={subFields.length >= 25} onClick={() => subOpt.add()} block>
                        添加排号
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Card>
            ))}

            <Button type="dashed" disabled={fields.length >= 10} onClick={() => add({areaName: '', seatCreateInputDtos: [{rowNumber: '', seat: ''}]})} block>
              添加区域
            </Button>
          </div>
        )}
      </Form.List>
    </Card>
  )
}

Component.displayName = 'ActivitySettingCard'

const ActivitySettingCard = memo(Component)
export default ActivitySettingCard
