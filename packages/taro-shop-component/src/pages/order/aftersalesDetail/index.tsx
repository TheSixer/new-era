/* eslint-disable complexity */
import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import { IAftersalesDetailProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import GoodPrice from '../../../components/good/goodPrice'
import OrderGood from '../../../components/order/orderGood'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { api } from '@wmeimob/taro-api'
import { RefundMasterDto } from '@wmeimob/taro-api'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import icon from './images/time_icon.png'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'
import { MRefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import ReturnLogisticsPop from '../../../components/afterSales/returnLogisticsPop'
import useAfterSaleOperation from '../../../hooks/aftersale/useAfterSaleOperation'
import useAfterSale from '../../../hooks/aftersale/useAfterSale'
import { plus } from 'number-precision'
import { ERefundStatus, RefundStatusTitle } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import HandleInfo from './components/handleInfo'
import MMImageList from '@wmeimob/taro-design/src/components/image-list'
import bgImg from './images/bk.png'
import { isH5 } from '../../../config'

const Component: FC<IAftersalesDetailProps> = () => {
  const { params } = useRouter()

  const [toast] = useToast()

  const [refundData, setRefundData] = useState<RefundMasterDto>({})
  const {
    applyFreightAmount = 0,
    applyRefundAmount = 0,
    refundAmount = 0,
    freightAmount = 0,
    orderFreightAmount = 0,
    realAmount = 0,
    freightState
  } = refundData

  // const totalApplyAmount = plus(applyFreightAmount, applyRefundAmount)
  const totalApplyAmount = plus(0, applyRefundAmount, freightState ? 0 : orderFreightAmount)
  // const totalRealAmount = plus(realAmount, realFreightAmount)
  const totalAmount = plus(refundAmount, freightAmount)

  const [imgList, setImgList] = useState([])

  const { showPop, setShowPop, deleteRecord, logisticsClick } = useAfterSale(refundData, {
    onDeleted: () => {
      Taro.navigateBack()
    }
  })

  const { showDelete, showLogistics, showReturnLogisitcs, isReturns } = useAfterSaleOperation(refundData.refundStatus!, refundData.refundType!)

  const needShow = showDelete || showLogistics || showReturnLogisitcs

  async function handleRefresh() {
    getDetail()
  }

  async function getDetail() {
    Taro.showLoading({ title: '', mask: true })
    // console.log(params)
    const { data: data_ = {} } = await api['/wechat/web/refund/info_GET']({ refundNo: params.refundNo })
    Taro.hideLoading()
    setRefundData(data_)
    if (data_.images! !== '') {
      const list = data_.images!.split(',')
      setImgList(list as any)
    }
  }

  function copy(data: string) {
    // 设置系统剪贴板的内容。调用成功后，会弹出 toast 提示"内容已复制"，持续 1.5s
    Taro.setClipboardData({ data,success(){
        if (isH5){
          toast?.message('内容已复制')
        }
      } }).catch(() => {
      toast?.message('复制失败')
    })
  }

  useEffect(() => {
    getDetail()
  }, [])

  return (
    <PageContainer noPlace={needShow} className={styles.aftersalesDetailStyle}>
      <MMNavigation title="售后详情" />

      <View className={styles.topContent}>
        <MMSpace gap={4} style={{ flex: 'none' }}>
          <Image src={icon} className={styles.iconTime} />
          <View className={styles.rgStatus}>{MRefundType[refundData.refundType!]}</View>
          <View className={styles.rgStatus}>{RefundStatusTitle[refundData.refundStatus!]}</View>
        </MMSpace>
        <View className={styles.topContent_time}>申请时间：{refundData.gmtCreated}</View>
        <Image src={bgImg} className={styles.bgImg} mode="aspectFill" />
      </View>

      <MMCard className={styles.all}>
        <MMCell size="small" title="申请退款总金额">
          <GoodPrice value={totalApplyAmount} fontSize={[18, shopVariable.fontSizeSm]} />
        </MMCell>

        {refundData.refundStatus! === ERefundStatus.Complete && (
          <MMCell size="small" title={<View className={styles.wxTitle}>退回微信</View>}>
            <GoodPrice value={totalAmount} fontSize={13} color={shopVariable.fontColor} />
          </MMCell>
        )}
      </MMCard>

      <MMCard title="售后商品">
        {refundData?.refundItemList?.map((item) => (
          <OrderGood className={styles.goods} data={item} key={item.skuNo} showPrice={false} showMarketPrice={false} />
        )) || null}
      </MMCard>

      <View className="spacing" />

      <MMCellGroup title={<View className={styles.cellGroupTitle}>售后信息</View>}>
        <MMCell size="small" title="售后编号">
          <MMSpace>
            <View>{refundData.refundNo}</View>
            <View className={styles.copy} onClick={() => copy(refundData.refundNo!)}>
              复制
            </View>
          </MMSpace>
        </MMCell>

        <MMCell size="small" title="申请时间">
          {refundData.applyTime}
        </MMCell>

        <MMCell size="small" title="退款原因" titleAlign="baseline">
          {refundData.reasonTxt}
        </MMCell>
        {/* <MMCell title="退款金额">
          <GoodPrice value={totalAmount} fontSize={14} color="#333333" />
          {!!freightAmount && (
            <View style={{ display: 'flex', alignItems: 'center' }}>
              (含运费&nbsp;
              <GoodPrice value={freightAmount} fontSize={14} color="#333333" />)
            </View>
          )}
        </MMCell> */}
        {(!!imgList.length || !!refundData.refundNote) && (
          <MMCell size="small" title="申请凭证" titleAlign="top">
            <View style={{ width: '100%' }}>
              <View style={{ marginBottom: 15 }}>{refundData.refundNote}</View>

              <MMImageList gap="10px" data={imgList} justifyContent="flex-end" />
            </View>
          </MMCell>
        )}
      </MMCellGroup>

      <View className="spacing" />
      <HandleInfo refundData={refundData} totalAmount={totalAmount} />
      {/* {refundData.refundStatus !== ERefundStatus.StoreProcess && (
        <MMCellGroup title="处理信息" style={{ marginBottom: '10px' }}>
          <MMCell size="small" title="处理时间">{refundData.processTime}</MMCell>

          <MMCell size="small" title="处理结果">{getProcessResult(refundData.refundType!, refundData.processResult!)}</MMCell>

          {!!refundData.storeNote && (
            <MMCell size="small" title="处理说明" titleAlign="top">
              {refundData.storeNote}
            </MMCell>
          )}

          {isReturns && !!refundData.returnTime && <MMCell size="small" title="退货时间">{refundData.returnTime!}</MMCell>}

          {[ERefundStatus.StoreCheckFail, ERefundStatus.Process, ERefundStatus.Complete, ERefundStatus.CompleteRefundFail].includes(
            refundData.refundStatus!
          ) && (
            <>
              {!!refundData.completeResult && <MMCell size="small" title="退款状态">{MMoneybackStatus[refundData.completeResult!]}</MMCell>}

              <MMCell size="small" title="退款时间">{refundData.completeTime!}</MMCell>
            </>
          )}

          {!!refundData.processCheckTime && <MMCell size="small" title="处理时间">{refundData.processCheckTime}</MMCell>}

          {refundData.refundStatus === ERefundStatus.Complete && (
            <MMCell size="small" title="退款金额">
              <GoodPrice value={totalAmount} fontSize={14} color={shopVariable.fontColor} />
              {!!freightAmount && (
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  （含运费&nbsp;
                  <GoodPrice value={freightAmount} fontSize={14} color={shopVariable.fontColor} />）
                </View>
              )}
            </MMCell>
          )}

          {!!refundData.processCheckNote && (
            <MMCell size="small" title="处理说明" titleAlign="top">
              {refundData.processCheckNote}
            </MMCell>
          )}
        </MMCellGroup>
      )} */}

      {/* 退货退款并且不是 商家处理中或是商家拒绝的。显示退货地址 */}
      {isReturns && ![ERefundStatus.StoreRefuse, ERefundStatus.StoreProcess].includes(refundData.refundStatus!) && (
        <>
          <MMCellGroup title="退货地址">
            <MMCell size="small" title="收件人" titleAlign="baseline">
              {refundData.name}
            </MMCell>
            <MMCell size="small" title="联系电话">
              {refundData.mobile}
            </MMCell>
            <MMCell size="small" title="退货地址" titleAlign="baseline">
              {refundData.provinceName}
              {refundData.cityName}
              {refundData.areaName}
              {refundData.singleAddress}
            </MMCell>
          </MMCellGroup>

          <View className="spacing" />
        </>
      )}

      {needShow && (
        <MMFixFoot border>
          <View className={styles.fixFootOut}>
            <MMSpace gap={5}>
              {showDelete && (
                <MMButton type={MMButtonType.default} size="tiny" style={{ width: 70 }} onClick={() => deleteRecord()}>
                  删除记录
                </MMButton>
              )}

              {showLogistics && refundData.expressNo && (
                <MMButton type={MMButtonType.default} size="tiny" style={{ width: 92 }} onClick={() => logisticsClick(refundData)}>
                  退货物流
                </MMButton>
              )}

              {showReturnLogisitcs && (
                <MMButton type={MMButtonType.default} size="tiny" style={{ width: 92 }} onClick={() => setShowPop(true)}>
                  填写退货信息
                </MMButton>
              )}
            </MMSpace>
          </View>
        </MMFixFoot>
      )}

      <ReturnLogisticsPop
        visible={showPop}
        addressInfo={refundData}
        refundNo={refundData.refundNo!}
        onClose={() => setShowPop(false)}
        onOk={() => {
          setShowPop(false)
          handleRefresh()
        }}
      />
    </PageContainer>
  )
}

const AftersalesDetail = memo(Component)
export default AftersalesDetail
