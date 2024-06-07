import { ProFormDateRangePicker, ProFormDependency, ProFormDigit, ProFormRadio, ProFormSelect, ProFormSwitch } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import { ECouponAcceptGoodsType } from '@wmeimob/shop-data/coupon/enums/ECouponAcceptGoodsType'
import { ECouponExpireType, OCouponExpireType } from '@wmeimob/shop-data/coupon/enums/ECouponExpireType'
import { ECouponType, OCouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { api, CouponTemplateCreateInputDto } from '@wmeimob/backend-api'
import AssignGoods from '@wmeimob/backend-pages-shop/src/components/goods/assignGoods'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { mmDivide, mmTimes } from '@wmeimob/utils/src/mmCurrency'
import { Button, Card, Form, message, Space } from 'antd'
import { Rule } from 'antd/lib/form'
import moment, { Moment } from 'moment'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import ChoosePresentGoods from './components/choosePresentGoods'
import styles from './index.module.less'
import AssignGoodsWithSKu from '@wmeimob-modules/goods-backend/src/components/assignGoodsWithSKu'
import ChooseExchangeGoods from './components/chooseExchangeGoods'
import { history } from 'umi'

interface ICouponAddProps {}

const Component: FC<ICouponAddProps> = (props) => {
  const { goodNos, setGoodNos, disabled, form, saveLoading, handleSave } = useService()

  const { showPresentGoods, setShowPresentGoods } = useChoosePresentGoods()

  return (
    <PageContainer
      footer={[
        <Button loading={saveLoading} key="save" type="primary" onClick={handleSave}>
          保存
        </Button>,
        <Button key="back" onClick={() => history.goBack()}>
          返回
        </Button>
      ]}
    >
      <Form
        className={styles.addFrom}
        labelCol={{ lg: 3, xs: 4 }}
        wrapperCol={{ lg: 8, xs: 20 }}
        layout="horizontal"
        form={form}
        initialValues={{
          acceptGoodsType: ECouponAcceptGoodsType.All,
          couponType: ECouponType.Deduction,
          isPublic: false,
          expireDateType: ECouponExpireType.Date
        }}
        scrollToFirstError
        onFinish={handleSave}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card title="优惠券设置">
            <ProFormInfo label="优惠券编号" name="templateNo" info="系统自动生成" />

            <ProFormLimitInput
              label="优惠券名称"
              name="name"
              fieldProps={{ maxLength: 12 }}
              rules={[{ required: true, message: '请输入优惠券名称!', whitespace: true }]}
            />

            <ProFormSelect
              label="优惠券类型"
              name="couponType"
              disabled={disabled}
              rules={[{ required: true, message: '请选择优惠券类型!' }]}
              options={OCouponType}
            />

            <ProFormDependency name={['couponType']}>
              {({ couponType }) => {
                const isDiscount = couponType === ECouponType.Discount

                // 免邮券
                if (couponType === ECouponType.FreeShipping) {
                  return null
                }
                // 赠品券
                if (couponType === ECouponType.Present) {
                  return (
                    <Form.Item label="选择赠品" name="acceptGoodsSetExtend" rules={[{ required: true }]}>
                      <ChoosePresentGoods disabled={disabled} onChooseGoods={() => setShowPresentGoods(true)} />
                    </Form.Item>
                  )
                }
                //  兑换券
                if (couponType === ECouponType.Exchange) {
                  return (
                    <Form.Item
                      label="可兑换商品"
                      name="acceptGoodsSet"
                      rules={[{ required: true, message: '请选择可兑换商品' }]}
                      wrapperCol={{ lg: 21, xs: 20 }}
                    >
                      <ChooseExchangeGoods disabled={disabled} />
                    </Form.Item>
                  )
                }
                // 满减满折券
                return (
                  <Form.Item label="使用条件" required>
                    <Space>
                      <div>满</div>
                      <ProFormDigit
                        noStyle
                        name="demandPrice"
                        disabled={disabled}
                        fieldProps={{ min: 0, precision: 0, placeholder: '输入0表示为不限制' }}
                        rules={[{ required: true }]}
                      />
                      <div>元， </div>
                      <div>{isDiscount ? '打' : '减'}</div>
                      {couponType === ECouponType.Deduction ? (
                        <ProFormDigit disabled={disabled} noStyle name="price" fieldProps={{ min: 0, precision: 1 }} rules={[{ required: true }]} />
                      ) : (
                        <ProFormDigit disabled={disabled} noStyle name="discount" fieldProps={{ min: 0, max: 10, precision: 1 }} rules={[{ required: true }]} />
                      )}
                      <div>{isDiscount ? '折' : '元'}</div>
                    </Space>
                  </Form.Item>
                )
              }}
            </ProFormDependency>

            <ProFormDateRangePicker
              label="优惠券领取时间"
              name="receive"
              disabled={disabled}
              rules={[{ required: true, message: '请选择优惠券领取时间!' }]}
              fieldProps={{
                disabledDate: (current) => current.isBefore(moment(), 'day')
              }}
            />

            <ProFormRadio.Group label="过期类型" name="expireDateType" disabled={disabled} options={OCouponExpireType} />

            <ProFormDependency name={['expireDateType', 'receive']}>
              {({ expireDateType }) => {
                if (expireDateType === ECouponExpireType.Date) {
                  const rules: Rule[] = [
                    { required: true, message: '请选择优惠券使用时间!' },
                    ({ getFieldValue }) => {
                      const receive: [Moment, Moment] | undefined = getFieldValue('receive')
                      return {
                        validator: async (rule, value: [Moment, Moment] | undefined) => {
                          if (value && receive) {
                            if (receive[0].isAfter(value[0], 'day')) {
                              throw new Error('【优惠券领取时间】的开始时间不能 大于【优惠券有效期】的开始时间')
                            } else if (receive[1].isAfter(value[1], 'day')) {
                              throw new Error('【优惠券领取时间】的结束时间不能 大于【优惠券有效期】的结束时间')
                            }
                          }
                        }
                      }
                    }
                  ]
                  return (
                    <ProFormDateRangePicker
                      label="优惠券有效期"
                      name="term"
                      disabled={disabled}
                      rules={rules}
                      dependencies={['receive']}
                      fieldProps={{
                        disabledDate: (current) => current.isBefore(moment(), 'day')
                      }}
                      // fieldProps={{ showTime: true, format: 'YYYY-MM-DD HH:mm:ss' }}
                    />
                  )
                }

                return (
                  <Form.Item label="使用条件" required extra={<span style={{ fontSize: 12 }}>*领取0天表示领取立即生效</span>}>
                    <Space wrap>
                      <span>领取</span>
                      <div style={{ width: 80 }}>
                        <ProFormDigit noStyle disabled={disabled} name="startDayCount" fieldProps={{ min: 0, precision: 0 }} rules={[{ required: true }]} />
                      </div>
                      <span>天生效，有效</span>
                      <div style={{ width: 80 }}>
                        <ProFormDigit noStyle name="expDayCount" disabled={disabled} fieldProps={{ min: 1, precision: 0 }} rules={[{ required: true }]} />
                      </div>
                      <span>天</span>
                    </Space>
                  </Form.Item>
                )
              }}
            </ProFormDependency>
          </Card>

          <Card>
            <ProFormDigit
              label="优惠券数量"
              name="stock"
              min={0}
              max={999999999}
              fieldProps={{ precision: 0 }}
              rules={[{ required: true, message: '请输入优惠券数量!' }]}
            />

            <ProFormDigit
              label="每人领取数量"
              name="memberLimit"
              fieldProps={{ min: 0, max: 9999, precision: 0 }}
              rules={[{ required: true, message: '请输入每人领取数量!' }]}
            />

            <ProFormSwitch
              label="前端是否显示"
              name="isPublic"
              valuePropName="checked"
              extra="隐藏则前端不显示/无法领取下单"
              fieldProps={{ checkedChildren: '显示', unCheckedChildren: '隐藏' }}
            />
          </Card>

          <ProFormDependency name={['couponType']}>
            {({ couponType }) => {
              return (
                ![ECouponType.Exchange, ECouponType.FreeShipping].includes(couponType) && (
                  <Card>
                    <ProFormRadio.Group
                      label="使用范围"
                      name="acceptGoodsType"
                      options={[
                        { label: '全商品', value: ECouponAcceptGoodsType.All },
                        { label: '指定商品', value: ECouponAcceptGoodsType.AssignGood }
                      ]}
                    />

                    <ProFormDependency name={['acceptGoodsType']}>
                      {({ acceptGoodsType }) => {
                        return (
                          acceptGoodsType === ECouponAcceptGoodsType.AssignGood && (
                            <AssignGoods
                              value={goodNos}
                              onChange={(data) => setGoodNos(data)}
                              cardProps={{ title: '选择指定商品', size: 'small', bordered: false, bodyStyle: { padding: 0 } }}
                            />
                          )
                        )
                      }}
                    </ProFormDependency>
                  </Card>
                )
              )
            }}
          </ProFormDependency>

          <Card title="优惠券说明">
            <ProFormLimitInput label="优惠券说明" name="detail" maxLength={16} />
          </Card>
        </Space>
      </Form>

      <AssignGoodsWithSKu
        visible={showPresentGoods}
        onClose={() => setShowPresentGoods(false)}
        onOk={({ goodsNo, skuNo }) => {
          form.setFieldsValue({
            acceptGoodsSetExtend: `${goodsNo}-${skuNo}`
          })
          setShowPresentGoods(false)
        }}
      />
    </PageContainer>
  )
}
const CouponAddPage = memo(Component)
export default CouponAddPage

function useService() {
  const { id }: any = history.location.query || {}
  const [form] = Form.useForm()
  const [goodNos, setGoodNos] = useState<string[]>([])

  const disabled = useMemo(() => !!id, [id])

  useEffect(() => {
    const getCouponDetail = async () => {
      const { data = {} } = await api['/admin/mallCouponTemplate/detail_GET']({ id })
      const { termStart, termEnd, receiveStart, receiveEnd, isPublic, acceptGoodsSet, discount } = data

      form.setFieldsValue({
        ...data,
        discount: discount !== undefined ? parseFloat(mmTimes(discount || 0, 10).toFixed(2)) : discount,
        isPublic: Boolean(isPublic),
        receive: [moment(receiveStart), moment(receiveEnd)],
        term: [moment(termStart), moment(termEnd)]
      })

      if (acceptGoodsSet) {
        setGoodNos(acceptGoodsSet.split(','))
      }
    }
    if (id) {
      getCouponDetail()
    }
  }, [id])

  // 保存
  const [handleSave, saveLoading] = useSuperLock(async () => {
    const formData = await form.validateFields()
    const { term, receive, ...value } = formData
    if (value.acceptGoodsType === ECouponAcceptGoodsType.AssignGood) {
      if (!goodNos.length) {
        return message.error('请选择商品')
      }
      value['acceptGoodsSet'] = goodNos.join(',')
    }

    const discount = parseFloat(mmDivide(value.discount || 0, 10).toFixed(2))
    let param: CouponTemplateCreateInputDto = {
      ...value,
      discount,
      isPublic: Number(value.isPublic),
      receiveStart: receive[0].format('YYYY-MM-DD') + ' 00:00:00',
      receiveEnd: receive[1].format('YYYY-MM-DD') + ' 23:59:59'
    }

    if (value.expireDateType === ECouponExpireType.Date) {
      param = {
        ...param,
        termStart: term[0].format('YYYY-MM-DD') + ' 00:00:00',
        termEnd: term[1].format('YYYY-MM-DD') + ' 23:59:59'
      }
    }

    try {
      id ? await api['/admin/mallCouponTemplate/update_PUT']({ ...param, id }) : await api['/admin/mallCouponTemplate/add_POST']({ ...param })
      message.success('保存成功')
      history.goBack()
    } catch (error) {}
  })

  return {
    goodNos,
    setGoodNos,
    disabled,
    form,
    saveLoading,
    handleSave
  }
}

function useChoosePresentGoods() {
  const [showPresentGoods, setShowPresentGoods] = useState(false)

  return {
    showPresentGoods,
    setShowPresentGoods
  }
}
