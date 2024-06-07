import { history } from 'umi'
import { PageContainer } from '@ant-design/pro-layout'
import { ECouponAcceptGoodsType, MCouponAcceptGoodsType } from '@wmeimob/shop-data/coupon/enums/ECouponAcceptGoodsType'
import { ECouponType, MCouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { api, CouponTemplateVo, GoodsVO } from '@wmeimob/backend-api'
import AssignGoods from '@wmeimob/backend-pages-shop/src/components/goods/assignGoods'
import { Button, Card, Descriptions, message, Radio, Space } from 'antd'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { canEditCoupon, getCouponUseCondition, getCouponUseExpiredCondition } from '../../../utils/coupon'

interface IDetailProps {}

const Component: FC<IDetailProps> = (props) => {
  const { value, setValue, goodNos, setGoodNos, couponDetail, conditionText, isDisable, handleSave } = useService()

  const { giftGoods, giftGoodsSkuName } = useGiftGoods(couponDetail.couponType === ECouponType.Present ? couponDetail.acceptGoodsSetExtend! : '')

  return (
    <PageContainer
      footer={[
        !isDisable && (
          <Button key="save" type="primary" onClick={handleSave}>
            保存
          </Button>
        ),
        <Button key="back" onClick={() => history.goBack()}>
          返回
        </Button>
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Descriptions title="优惠券信息" bordered column={3}>
            <Descriptions.Item label="优惠券编号">{couponDetail.templateNo}</Descriptions.Item>

            <Descriptions.Item label="优惠券名称">{couponDetail.name}</Descriptions.Item>

            <Descriptions.Item label="优惠券类型">{MCouponType[couponDetail.couponType!] || ''}</Descriptions.Item>

            <Descriptions.Item label="使用条件">{conditionText}</Descriptions.Item>

            <Descriptions.Item label="领取时间">
              <Space>
                <span>{(couponDetail.receiveStart || '').split(' ')[0]}</span>
                <span>-</span>
                <span>{(couponDetail.receiveEnd || '').split(' ')[0]}</span>
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="使用有效期">{getCouponUseExpiredCondition(couponDetail)}</Descriptions.Item>

            <Descriptions.Item label="优惠券数量">{couponDetail.stock || 0}张</Descriptions.Item>

            <Descriptions.Item label="已领取">{couponDetail.sendNum || 0}张</Descriptions.Item>

            <Descriptions.Item label="每人限领">{couponDetail.memberLimit || 0}张</Descriptions.Item>

            <Descriptions.Item label="优惠券说明">{couponDetail.detail}</Descriptions.Item>
          </Descriptions>
        </Card>

        {!!giftGoods.goodsNo && (
          <Card>
            <Descriptions title="赠送商品" bordered column={2}>
              <Descriptions.Item label="商品名称">{giftGoods.goodsName}</Descriptions.Item>

              <Descriptions.Item label="商品sku">{giftGoodsSkuName}</Descriptions.Item>
            </Descriptions>
          </Card>
        )}

        {![ECouponType.FreeShipping].includes(couponDetail.couponType!) && (
          <Card>
            {![ECouponType.Exchange].includes(couponDetail.couponType!) && (
              <Descriptions>
                <Descriptions.Item label="使用范围">
                  <Radio.Group disabled={isDisable} onChange={(ev) => setValue(ev.target.value)} value={value}>
                    <Radio value={ECouponAcceptGoodsType.All}>{MCouponAcceptGoodsType[ECouponAcceptGoodsType.All]}</Radio>
                    <Radio value={ECouponAcceptGoodsType.AssignGood}>{MCouponAcceptGoodsType[ECouponAcceptGoodsType.AssignGood]}</Radio>
                  </Radio.Group>
                </Descriptions.Item>
              </Descriptions>
            )}

            {value === ECouponAcceptGoodsType.AssignGood && (
              <AssignGoods
                value={goodNos}
                disabled={isDisable}
                onChange={(data) => setGoodNos(data)}
                cardProps={{ title: '指定商品', size: 'small', bordered: false, bodyStyle: { padding: 0 } }}
              />
            )}
          </Card>
        )}
      </Space>
    </PageContainer>
  )
}

const Detail = memo(Component)
export default Detail

function useService() {
  const id = history.location.query?.id as string
  const [value, setValue] = useState(ECouponAcceptGoodsType.All)
  const [couponDetail, setCouponDetail] = useState<CouponTemplateVo>({})

  const [goodNos, setGoodNos] = useState<string[]>([])

  const conditionText = useMemo(() => getCouponUseCondition(couponDetail), [couponDetail])

  // 优惠券是否作废
  // const isDisable = useMemo(() => !canEditCoupon(couponDetail), [couponDetail])
  const isDisable = true

  useEffect(() => {
    const requestCheck = async () => {
      if (id) {
        const { data = {} } = await api['/admin/mallCouponTemplate/detail_GET']({ id })
        setCouponDetail(data)
        if (data.acceptGoodsType === ECouponAcceptGoodsType.AssignGood) {
          setGoodNos((data.acceptGoodsSet || '').split(','))
        }
        setValue(data.acceptGoodsType!)
      }
    }
    requestCheck()
  }, [id])

  // 保存
  const handleSave = async () => {
    if (value === ECouponAcceptGoodsType.AssignGood) {
      if (!goodNos.length) {
        return message.error('请选择商品')
      }
      couponDetail['acceptGoodsSet'] = goodNos.join(',')
    }
    const param = { ...couponDetail, acceptGoodsType: value }
    await api['/admin/mallCouponTemplate/update_PUT']({ ...param })
    message.success('保存成功')
    history.goBack()
  }

  return {
    value,
    setValue,
    goodNos,
    setGoodNos,
    couponDetail,
    conditionText,
    isDisable,
    handleSave
  }
}

/**
 * 赠品
 */
function useGiftGoods(acceptGoodsSetExtend: string) {
  const [goods, setGoods] = useState<GoodsVO>({})

  const [goodsNo, skuNo] = useMemo(() => {
    return !acceptGoodsSetExtend ? ['', ''] : acceptGoodsSetExtend.split('-')
  }, [acceptGoodsSetExtend])

  const skuName = useMemo(() => {
    const { goodsSkuDetailList = [] } = goods
    return goodsSkuDetailList.find((item) => item.skuNo === skuNo)?.specNames || ''
  }, [goods, skuNo])

  useEffect(() => {
    if (goodsNo) {
      api['/admin/goods/{no}_GET'](goodsNo).then(({ data = {} }) => setGoods(data))
    }
  }, [goodsNo])

  return {
    giftGoods: goods,
    giftGoodsSkuName: skuName
  }
}
