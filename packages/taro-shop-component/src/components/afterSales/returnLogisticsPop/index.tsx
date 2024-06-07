import { memo, useEffect, useState, FC } from 'react'
import { View } from '@tarojs/components'
import { IReturnLogisticsPopProps } from './const'
// import styles from './index.module.less'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMFeild from '@wmeimob/taro-design/src/components/feild'
import { useToast } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'
import { useExpressCompany } from '../../../pages/order/store'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import MMCard from '@wmeimob/taro-design/src/components/card'
import AddressInfoCard from '../../addressInfoCard'

const Component: FC<IReturnLogisticsPopProps> = (props) => {
  const { visible, refundNo, addressInfo, onClose } = props
  const [expressCompanyCode, setExpressCompanyCode] = useState('')
  const [expressNo, setExpressNo] = useState('')
  const [toast] = useToast()

  const [showClose, setShowClose] = useState(true)

  const { expressCompanys, getExpressCompany } = useExpressCompany()

  async function submitShipping() {
    if (!expressCompanyCode) {
      return toast?.message('请选择物流公司')
    }
    if (!expressNo) {
      return toast?.message('请输入快递单号')
    }
    const expressCompany = expressCompanys.find((dt) => dt.value === expressCompanyCode)!.label

    await api['/wechat/web/refund/shipping_PUT']({ expressCompany, expressCompanyCode, expressNo, refundNo })
    toast?.success('提交成功')
    props.onOk?.()
  }

  useEffect(() => {
    if (visible) {
      getExpressCompany()
    }
  }, [visible])

  return (
    <MMPopup
      visible={visible}
      title="填写退货信息"
      close={showClose}
      backgroundColor={shopVariable.gray2}
      footer={
        // 部分手机会挡住物流公司选择框
        showClose && (
          <View>
            <MMButton block onClick={() => submitShipping()}>
              确定
            </MMButton>
          </View>
        )
      }
      onClose={onClose}
    >
      <MMCard>
        <AddressInfoCard data={addressInfo} showArrow={false} />
      </MMCard>

      <View className="spacing" />

      <MMCellGroup>
        <MMCell title="物流公司">
          <MMFeild.Select
            name="expressCompany"
            suffix
            noStyle
            value={expressCompanyCode}
            options={expressCompanys}
            placeholder="请选择物流公司"
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onChange={setExpressCompanyCode}
            onShowChange={(val) => {
              setShowClose(!val)
            }}
          />
        </MMCell>
      </MMCellGroup>

      <View className="spacing" />

      <MMCellGroup>
        <MMCell title="快递单号">
          <MMFeild
            noStyle
            value={expressNo}
            style={{ paddingLeft: 0, paddingRight: 0 }}
            fieldProps={{ maxlength: 20, placeholder: '请输入快递单号' }}
            onChange={(va) => setExpressNo((va || '').replace(/ /g, ''))}
          />
        </MMCell>
      </MMCellGroup>
    </MMPopup>
  )
}

const ReturnLogisticsPop = memo(Component)
export default ReturnLogisticsPop
