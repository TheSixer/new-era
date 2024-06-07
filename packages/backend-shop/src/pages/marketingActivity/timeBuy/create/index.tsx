import { FC, memo, useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { ICreateProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import useQuery from '~/hooks/useQuery'
import { Button, Card, Form, message, Space } from 'antd'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { useForm } from 'antd/lib/form/Form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { ProFormDateTimeRangePicker, ProFormRadio } from '@ant-design/pro-form'
import { EActivityCompletedGoods, OActivityCompletedGoods } from '~/enums/activity/EActivityCompletedGoods'
import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import { MarketingActivityDto, MarketingActivityGoodsParam, MarketingActivityOfFlashSaleDto } from '@wmeimob/backend-api'
import { api } from '~/request'
import { history } from 'umi'
import dayjs from 'dayjs'
import AssignTimeBuyActivityGoods from '~/components/goods/assignTimeBuyActivityGoods'
import { EActivityStatus } from '~/enums/activity/EActivityStatus'
import useDisableActivityTime from '~/hooks/activity/useDisableActivityTime'
import mmFormRule from '@wmeimob/form-rules'

const Component: FC<ICreateProps> = () => {
  const query = useQuery()
  const activityNo = query.get('activityNo') || ''
  const [loading, setLoading] = useState(false)
  const [activity, setActivity] = useState<MarketingActivityDto>({})
  const [goodsParam, setGoodsParam] = useState<MarketingActivityGoodsParam[]>([])
  const [form] = useForm()

  // 活动开始和结束阶段不能编辑
  const disabled = useMemo(
    () => activity.activityStatus !== undefined && [EActivityStatus.Use, EActivityStatus.Finish].includes(activity.activityStatus),
    [activity]
  )

  const { validGoodsParam } = useTimeBuyCreateService()

  useEffect(() => {
    async function init() {
      if (activityNo) {
        setLoading(true)
        // 获取id
        const { data = {} } = await api['/admin/activity/flashSale/{activityNo}_GET'](activityNo)
        setActivity(data)
        form.setFieldsValue({
          ...data,
          activityTime: [data.startTime, data.endTime]
        })

        setGoodsParam(data.marketingActivityGoodsParams || [])
        setLoading(false)
      }
    }

    init()
  }, [])

  const [handleSave, saveLock] = useSuperLock(async () => {
    const { activityTime, ...result } = await form.validateFields()
    const [startTime, endTime] = activityTime

    // activityStatus?: number; 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败
    // id?: number; 活动Id，activityId
    // merchantId?: number;
    if (!validGoodsParam(goodsParam)) {
      return
    }

    const params: MarketingActivityOfFlashSaleDto = {
      ...activity,
      ...result,
      startTime: dayjs(startTime).format('YYYY-MM-DD HH:mm') + ':00',
      endTime: dayjs(endTime).format('YYYY-MM-DD HH:mm') + ':59',
      marketingActivityGoodsParams: goodsParam,
      shareImage: '', // 分享图片
      shareTitle: '', // 分享标题
      useStoreCoupon: 0 // 是否可用店铺优惠券 0：否 1：是
    }
    await api['/admin/activity/flashSale_POST'](params)
    message.success('保存成功')
    history.goBack()
  })

  const disableActivityTimeProps = useDisableActivityTime()

  return (
    <PageContainer
      loading={loading}
      footer={[
        <Button key="back" onClick={() => history.goBack()}>
          返回
        </Button>,
        !disabled && (
          <Button key="save" type="primary" loading={saveLock} onClick={handleSave}>
            保存
          </Button>
        )
      ]}
      className={styles.createStyle}
    >
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 8 }}
        initialValues={{
          completed: EActivityCompletedGoods.Normal
        }}
        onValuesChange={(changedValues) => {
          // console.log(...args)
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card title="基本设置">
            <ProFormLimitInput label="活动名称" name="activityName" disabled={disabled} maxLength={32} rules={mmFormRule.required} />

            <ProFormLimitInput label="活动描述" name="description" disabled={disabled} maxLength={50} rules={mmFormRule.required} />

            <ProFormDateTimeRangePicker
              label="活动时间"
              name="activityTime"
              rules={mmFormRule.required}
              disabled={disabled || !!activityNo}
              extra={!!activityNo && '编辑活动无法修改时间'}
              fieldProps={{
                format: 'YYYY-MM-DD HH:mm',
                showTime: { format: 'HH:mm' },
                ...disableActivityTimeProps
              }}
            />

            <ProFormRadio.Group
              label="活动结束后商品"
              name="completed"
              disabled={disabled}
              options={OActivityCompletedGoods}
              rules={mmFormRule.required}
              extra="设置活动结束或活动库存售罄后商品状态"
            />
          </Card>

          {!loading && (
            <AssignTimeBuyActivityGoods
              value={goodsParam}
              disabled={disabled}
              onChange={(data) => {
                setGoodsParam(data)
              }}
            />
          )}

          <Card title="活动说明">
            {disabled ? (
              <div className={styles.richTextContent} dangerouslySetInnerHTML={{ __html: activity.content! }} />
            ) : (
              <ProFormRichText
                label="活动说明"
                name="content"
                rules={mmFormRule.required}
                wrapperCol={{ span: 21 }}
                fieldProps={{
                  toolbarConfig: {
                    excludeKeys: [
                      'blockquote',
                      'group-more-style',
                      'bgColor',
                      'fontFamily',
                      'todo',
                      'emotion',
                      'insertLink',
                      'group-image',
                      'group-video',
                      'insertTable',
                      'codeBlock'
                    ]
                  }
                }}
              />
            )}
          </Card>
        </Space>
      </Form>
    </PageContainer>
  )
}

Component.displayName = 'Create'

const Create = memo(Component)
export default Create

function useTimeBuyCreateService() {
  /** 验证商品参数设置 */
  function validGoodsParam(params: MarketingActivityGoodsParam[] = []) {
    if (!params.length) {
      message.error(`请至少选择一个商品`)
      return false
    }
    return !params.some((it) => {
      const { marketingActivitySkuParams = [], userBuyLimit, orderBuyLimit, sortNum } = it
      // 验证是否有空值
      let noValid = [userBuyLimit, orderBuyLimit, sortNum].some((va) => va === undefined)
      if (noValid) {
        message.error(`请完善商品【${it.goodsName}】设置`)
        return true
      }

      if (!marketingActivitySkuParams.length) {
        message.error(`请完善商品【${it.goodsName}】SKU设置`)
        return true
      }

      noValid = marketingActivitySkuParams.some((sku) => {
        if (!!sku.skuShow && [sku.activityNum, sku.activityPrice].some((va) => va === undefined)) {
          return true
        }
        return false
      })
      return noValid
    })
  }

  return {
    validGoodsParam
  }
}
