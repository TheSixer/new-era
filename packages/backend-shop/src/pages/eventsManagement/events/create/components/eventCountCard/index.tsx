import { FC, memo, useRef, useState } from 'react'
import styles from './index.module.less'
import { IActivitySettingCardProps } from './const'
import { Button, Card, Form } from 'antd'
import { ProFormDateTimeRangePicker, ProFormDependency, ProFormDigit, ProFormRadio } from '@ant-design/pro-form'
import { PlusOutlined } from '@ant-design/icons'
import AssignPresentGood from '../assignPresentGood'
import mmFormRule from '@wmeimob/form-rules'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import moment from 'moment'
import useDisableActivityTime from '~/hooks/activity/useDisableActivityTime'

const Component: FC<IActivitySettingCardProps> = (props) => {
  const { disabled } = props
  const promotionConditionListName = ['promotionParam', 'promotionConditionList']

  const { showModal, setShowModal } = useAssPresentGoodService()
  const editIndex = useRef(-1)
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
              <Form.List name={promotionConditionListName}>
                {(fields, { add, remove }) => (
                  <Card>
                    {fields.map(({ key, name, ...restField }, index) => {
                      const prePromoNamePath = ['promotionParam', 'promotionConditionList', index - 1, 'promo']
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
                          <ProFormDateTimeRangePicker
                            label="活动时间"
                            name="activityTime"
                            rules={[
                              ...mmFormRule.required,
                              {
                                validator: (_, value: [moment.Moment?, moment.Moment?]) => {
                                  if (!value?.length) return Promise.resolve()
                                  return moment().isBefore(value[1], 'minutes') ? Promise.resolve() : Promise.reject(new Error('活动结束时间必须晚于当前时间'))
                                }
                              }
                            ]}
                            disabled={disabled}
                            fieldProps={{
                              format: 'YYYY-MM-DD',
                              showTime: { format: 'HH:mm' },
                              ...disableActivityTimeProps
                            }}
                          />

                          <ProFormDigit
                            {...restField}
                            label="活动席位"
                            wrapperCol={{ span: 24 }}
                            name={[name, 'promo']}
                            disabled={disabled}
                            dependencies={index > 0 ? [prePromoNamePath] : undefined}
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
                        新增区间
                      </Button>
                    )}
                  </Card>
                )}
              </Form.List>

              <AssignPresentGood
                visible={showModal}
                value={[]}
                onClose={() => setShowModal(false)}
                onOk={(value) => {
                  const list = form.getFieldValue(promotionConditionListName)
                  const newData = list.map((item, index) => {
                    if (index === editIndex.current) {
                      return { ...item, ...value }
                    }
                    return item
                  })

                  form.setFields([{ name: promotionConditionListName, value: newData }])
                  setShowModal(false)
                }}
              />
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

function useAssPresentGoodService() {
  const [showModal, setShowModal] = useState(false)

  return {
    showModal,
    setShowModal
  }
}
