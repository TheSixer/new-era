import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { IActivitySettingCardProps } from './const'
import { Button, Card, Form } from 'antd'
import { ProFormDependency, ProFormRadio, ProFormSelect } from '@ant-design/pro-form'
import mmFormRule from '@wmeimob/form-rules'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import { PlusOutlined } from '@ant-design/icons'
import { api } from '@wmeimob/backend-api'

const checkTypes = [
  {
    label: '用户扫码',
    value: 0
  },
  {
    label: '员工扫码',
    value: 1
  },
  {
    label: '用户手动确认',
    value: 2
  }
]

const Component: FC<IActivitySettingCardProps> = (props) => {
  const { disabled } = props
  const { options: tagsOptions } = useTagsService()

  return (
    <Card title="活动设置" className={styles.activitySettingCardStyle}>
      {/* <ProFormSelect
        label="等级限制"
        name="level"
        rules={[{ required: true, message: '请选择限制等级' }]}
        options={[{ label: '无限制', value: 0 }, { label: '普通会员', value: 1 }, { label: '高级会员', value: 2 }]}
      /> */}

      <ProFormRadio.Group label="核销方式" name="checkType" disabled={disabled} options={checkTypes} rules={mmFormRule.required} />

      <ProFormDependency name={['checkType']}>
        {({ checkType }, form) => {
          if (!checkType) {
            return (
              <ProFormLimitInput
                label="签到距离"
                name="checkDistance"
                disabled={disabled}
                placeholder={'请输入签到距离'}
                addonAfter="米以内"
                rules={[
                  ...mmFormRule.required,
                  {
                    validator: (_, value: string) => {
                      if (!value) return Promise.reject('')
                      if (/^\d+$/.test(value)) return Promise.resolve()
                      return Promise.reject('请输入数字')
                    }
                  }
                ]}
              />
            )
          }
          return null
        }}
      </ProFormDependency>

      <ProFormRadio.Group
        label="显示座位号"
        name="viewSeatNo"
        disabled={disabled}
        options={[
          { label: '显示', value: 1 },
          { label: '不显示', value: 0 }
        ]}
        rules={mmFormRule.required}
      />

      <ProFormRadio.Group
        label="参与用户"
        name="participate"
        disabled={disabled}
        options={[
          { label: '全部用户', value: 0 },
          { label: '白名单用户', value: 1 }
        ]}
        rules={mmFormRule.required}
      />

      <ProFormRadio.Group
        label="首页展示"
        name="indexView"
        disabled={disabled}
        options={[
          { label: '显示', value: 1 },
          { label: '不显示', value: 0 }
        ]}
        rules={mmFormRule.required}
      />

      <ProFormDependency name={['indexView']}>
        {({ indexView }, form) => {
          if (indexView) {
            return <ProFormMaterial label="首页封面" name="indexCover" disabled={disabled} fieldProps={{ measure: [750, 360] }} rules={mmFormRule.required} />
          }
          return null
        }}
      </ProFormDependency>

      <ProFormDependency name={['seatCreateInputListDtos']}>
        {({ seatCreateInputListDtos }, form) => {
          console.log(seatCreateInputListDtos);
          let options: any = [];
          for (let i = 0; i < seatCreateInputListDtos?.length; i++) {
            const seatCreateInputDtos = seatCreateInputListDtos[i]?.seatCreateInputDtos;
            options = [...options, ...seatCreateInputDtos?.map?.((item, idx) => ({label: `${seatCreateInputListDtos[i]?.areaName}-${item?.rowNumber}`, value: `${i}-${idx}`}))]
          }
          return (
            <Form.Item label="位置分配" rules={[{ required: true, message: '请分配位置' }]}>
              <Form.List name="seatRuleCreateInputDtos">
                {(fields, { add, remove }) => (
                  <Card>
                    {fields.map(({ key, name }, index) => {
                      return (
                        <Card
                          key={key}
                          title={`规则${index + 1}`}
                          extra={
                            disabled ? null : (
                              <Button type="link" size="small" onClick={() => remove(name)}>
                                删除
                              </Button>
                            )
                          }
                          style={{ marginBottom: 10 }}
                        >
                          <ProFormSelect
                            label="用户标签"
                            name={[name, 'tagId']}
                            rules={[{ required: true, message: '请选择用户标签' }]}
                            options={tagsOptions}
                          />

                          <ProFormSelect
                            label="适用座位"
                            name={[name, 'seatIds']}
                            mode="multiple"
                            options={options}
                            rules={[{ required: true, message: '请选择适用座位' }]}
                          />
                        </Card>
                      )
                    })}
                    {!disabled && (
                      <Button type="dashed" onClick={() => add({})} block icon={<PlusOutlined />}>
                        添加规则
                      </Button>
                    )}
                  </Card>
                )}
              </Form.List>
            </Form.Item>
          )
        }}
      </ProFormDependency>
    </Card>
  )
}

Component.displayName = 'ActivitySettingCard'

const ActivitySettingCard = memo(Component)
export default ActivitySettingCard

function useTagsService() {
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    handleGetTags()
  }, [])

  async function handleGetTags() {
    const { data: { list = [] } } = await api['/admin/mall/tag/queryList_GET']({})
    setOptions(list?.map((item) => ({ label: item.name, value: item.id })))
  }

  return {
    options
  }
}

