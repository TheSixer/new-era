import { FC, memo } from 'react'
import styles from './index.module.less'
import { IActivitySettingCardProps } from './const'
import { Button, Card, Form, Input } from 'antd'

const Component: FC<IActivitySettingCardProps> = (props) => {
  const { disabled } = props

  return (
    <Card title="活动设置" className={styles.activitySettingCardStyle}>
      <Form.List name="seatCreateInputListDtos">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={(
                  <Form.Item label="区域名称" name={[field.name, "areaName"]} style={{ marginBottom: 0 }}>
                    <Input  disabled={disabled} placeholder="区域名称" />
                  </Form.Item>
                )}
                key={field.key}
                extra={
                  <Button
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
                          <Form.Item label="排号" name={[subField.name, 'rowNumber']}>
                            <Input placeholder="排号" />
                          </Form.Item>
                          <Form.Item label="座位数量" name={[subField.name, 'seat']}>
                            <Input placeholder="座位数量" />
                          </Form.Item>
                                                
                          <Form.Item wrapperCol={{ offset: 3 }}>
                            <Button
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            >
                              删除
                            </Button>
                          </Form.Item>
                        </Card>
                      ))}
                      <Button type="dashed" onClick={() => subOpt.add()} block>
                        添加排号
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add({areaName: '', seatCreateInputDtos: [{rowNumber: '', seat: ''}]})} block>
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
