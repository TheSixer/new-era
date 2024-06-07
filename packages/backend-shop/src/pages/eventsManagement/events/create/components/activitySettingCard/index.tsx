import { FC, memo, useRef, useState } from 'react'
import styles from './index.module.less'
import { IActivitySettingCardProps } from './const'
import { Button, Card, Form, Space, Typography } from 'antd'
import { ProFormDependency, ProFormDigit, ProFormRadio } from '@ant-design/pro-form'
import { EActivityType, OActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { EActivityConditionType, OActivityConditionType } from '~/enums/activity/EActivityConditionType'
import { EActivityPromotionType, OActivityPromotionType } from '~/enums/activity/EActivityPromotionType'
import { PlusOutlined } from '@ant-design/icons'
import AssignPresentGood from '../assignPresentGood'
import PresentGoodItem from '../presentGoodItem'
import mmFormRule from '@wmeimob/form-rules'
import { GoodsVO } from '@wmeimob/backend-api'

const Component: FC<IActivitySettingCardProps> = (props) => {
  const { disabled } = props
  const conditionName = ['promotionParam', 'promotionConditionType']
  const promotionTypeName = ['promotionParam', 'promotionType']
  const promotionConditionListName = ['promotionParam', 'promotionConditionList']

  const { showModal, setShowModal } = useAssPresentGoodService()
  const editIndex = useRef(-1)

  return (
    <Card title="活动设置" className={styles.activitySettingCardStyle}>
      <ProFormRadio.Group
        label="活动类型"
        name="activityType"
        disabled={disabled}
        options={OActivityType.filter((it) => [EActivityType.Deduction, EActivityType.Discount, EActivityType.Presented].includes(it.value))}
        rules={mmFormRule.required}
      />

      <ProFormRadio.Group label="活动条件" name={conditionName} disabled={disabled} options={OActivityConditionType} rules={mmFormRule.required} />

      <ProFormDependency name={['activityType']}>
        {({ activityType }, { setFields }) => {
          // 只有满减去可以做循环优惠
          const hidden = activityType !== EActivityType.Deduction
          if (hidden) {
            setFields([{ name: promotionTypeName, value: EActivityPromotionType.Step }])
          }

          return (
            <ProFormRadio.Group
              label="优惠计算方式"
              name={promotionTypeName}
              disabled={disabled}
              options={OActivityPromotionType}
              rules={mmFormRule.required}
              hidden={hidden}
            />
          )
        }}
      </ProFormDependency>

      <ProFormDependency name={['activityType', conditionName, promotionTypeName, promotionConditionListName]}>
        {({ activityType, promotionParam }, form) => {
          const { promotionConditionType, promotionType, promotionConditionList } = promotionParam

          const isStep = promotionType === EActivityPromotionType.Step
          const placeholders = {
            [EActivityConditionType.Price]: ['请输入满减金额', '元'],
            [EActivityConditionType.Packages]: ['请输入件数', '件']
          }[promotionConditionType]

          const placeholders2 = {
            [EActivityType.Deduction]: ['减', '请输入金额', '元'],
            [EActivityType.Discount]: ['打', '请输入折扣', '折'],
            [EActivityType.Presented]: ['赠', '', '']
          }[activityType]

          const promoFieldProps = activityType === EActivityType.Discount ? { min: 0, max: 10, precision: 2 } : { min: 0, max: 99999, precision: 2 }

          // 满赠只能填一项，不允许增加
          const canAdd = activityType !== EActivityType.Presented || (activityType === EActivityType.Presented && !promotionConditionList?.length)

          return (
            <>
              <Form.List name={promotionConditionListName}>
                {(fields, { add, remove }) => (
                  <Card>
                    {fields.map(({ key, name, ...restField }, index) => {
                      const preConNamePath = ['promotionParam', 'promotionConditionList', index - 1, 'con']
                      const prePromoNamePath = ['promotionParam', 'promotionConditionList', index - 1, 'promo']
                      return (
                        <Space key={key} className={styles.formList} align="baseline">
                          <span>满</span>
                          <ProFormDigit
                            {...restField}
                            wrapperCol={{ span: 24 }}
                            name={[name, 'con']}
                            disabled={disabled}
                            dependencies={index > 0 ? [preConNamePath] : undefined}
                            rules={[
                              ...mmFormRule.required,
                              {
                                validator: async (_rule, value) => {
                                  if (index > 0) {
                                    const con = form.getFieldValue(preConNamePath)
                                    if (!!con && !!value && value <= con) {
                                      throw new Error('下一项值必须大于上一项')
                                    }
                                  }
                                  return true
                                }
                              }
                            ]}
                            fieldProps={{
                              min: 0.01,
                              max: 99999,
                              precision: promotionConditionType === EActivityConditionType.Packages ? 0 : 2,
                              placeholder: placeholders[0]
                            }}
                            width={190}
                          />
                          <span>
                            {placeholders[1]},{placeholders2[0]}
                          </span>
                          {activityType === EActivityType.Presented ? (
                            <>
                              <Form.Item
                                name={[name]}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                  {
                                    validator: (__, value: GoodsVO) => (value?.goodsNo ? Promise.resolve() : Promise.reject(new Error('请选择商品 ')))
                                  }
                                ]}
                              >
                                <PresentGoodItem
                                  disabled={disabled}
                                  onChooseGood={() => {
                                    editIndex.current = index
                                    setShowModal(true)
                                  }}
                                />
                              </Form.Item>
                              <Form.Item name={[name, 'skuNo']} hidden />
                              <ProFormDigit name={[name, 'promo']} initialValue={1} hidden />
                            </>
                          ) : (
                            <ProFormDigit
                              {...restField}
                              wrapperCol={{ span: 24 }}
                              name={[name, 'promo']}
                              disabled={disabled}
                              dependencies={index > 0 ? [prePromoNamePath] : undefined}
                              rules={[
                                ...mmFormRule.required,
                                {
                                  validator: async (_rule, value) => {
                                    if (index > 0) {
                                      const promo = form.getFieldValue(prePromoNamePath)
                                      const activityType = form.getFieldValue(['activityType'])
                                      if (activityType === EActivityType.Deduction && !!promo && !!value && value <= promo) {
                                        throw new Error('下一项值必须大于上一项')
                                      } else if (activityType === EActivityType.Discount && !!promo && !!value && value >= promo) {
                                        throw new Error('下一项值必须小于上一项')
                                      }
                                    }
                                    return true
                                  }
                                }
                              ]}
                              fieldProps={{
                                ...promoFieldProps,
                                placeholder: placeholders2[1]
                              }}
                              width={190}
                            />
                          )}
                          <span>{placeholders2[2]}</span>

                          {disabled ? null : isStep ? (
                            <Button type="link" size="small" onClick={() => remove(name)}>
                              删除
                            </Button>
                          ) : (
                            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                              例：满300-30 则600-60 / 900-90 依次类推
                            </Typography.Text>
                          )}
                        </Space>
                      )
                    })}
                    {!disabled && isStep && canAdd && (
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
