import { FC, memo, useEffect, useState } from 'react'
import { Button, Space, Form, message } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import { api } from '~/request'
import { history } from 'umi'
import { useAtom } from 'jotai'
import { afterDetailAtom, useRefundOrder } from './store'
import AfterCard from './components/afterCard'
import GoodsCard from './components/goodsCard'
// import RefundCard from './components/refundCard'
import AfterInfoCard from './components/afterInfoCard'
import DealInfoCard from './components/dealInfoCard'
import AfterExpressCard from './components/afterExpressCard'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import AuditModal from './components/auditModal'
import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'
import { ModalForm, ModalFormProps, ProFormTextArea } from '@ant-design/pro-form'
import { RefundMasterDto } from '@wmeimob/backend-api'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'

const { useForm } = Form

const Component: FC = (props) => {
  const [detail, setAfterDetail] = useAtom(afterDetailAtom)
  const [refundForm] = useForm() // 退款明细表单

  const [loading, setLoading] = useState(false)

  useRefundOrder(detail.orderNo)

  useEffect(() => {
    getDetail()
  }, [history.location.query?.refundNo])

  async function getDetail() {
    const refundNo = (history.location.query?.refundNo as string) || ''
    if (!refundNo) {
      return
    }
    setLoading(true)
    const { data = {} } = await api['/admin/refund/info_GET']({ refundNo })
    setAfterDetail(data)
    setLoading(false)
  }

  const auditForm = useProTableForm()
  //审核按钮事件
  async function handleAudit() {
    try {
      const refundInfo = await refundForm.validateFields()
      auditForm.setVisible(true)
      auditForm.setEditData({ ...detail, refundInfo })
    } catch (error) {
      message.error('请完善退货明细中信息')
    }
  }

  const { modalFormProps } = useAuditRefuse({ data: detail, onRefresh: getDetail })

  const canAudit = [ERefundStatus.StoreProcess, ERefundStatus.StoreCheck].includes(detail.refundStatus!)

  const footer = [
    canAudit && (
      <Button key="refund" type="primary" onClick={handleAudit}>
        审核
      </Button>
    ),
    canAudit && (
      <Button key="refuse" onClick={() => modalFormProps.onVisibleChange!(true)}>
        驳回
      </Button>
    ),
    <Button key="back" type="primary" onClick={() => history.goBack()}>
      返回
    </Button>
  ]

  return (
    <PageContainer footer={footer} loading={loading}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* 售后信息 */}
        <AfterCard />
        {/* 售后信息 */}
        <AfterInfoCard />
        {/* 处理信息 */}
        <DealInfoCard />
        {/* 退货明细 */}
        <GoodsCard form={refundForm} />

        <AfterExpressCard />
      </Space>
      {/* 审核弹窗 */}
      <AuditModal
        {...auditForm.modalProps}
        data={auditForm.editData}
        onSuccess={() => {
          auditForm.setVisible(false)
          history.goBack()
        }}
      />

      <ModalForm title="审核-驳回" layout="horizontal" labelCol={{ span: 4 }} {...modalFormProps}>
        <ProFormInfo label="审核结果" info="不同意" />

        <ProFormTextArea label="处理说明" name="storeNote" rules={[{ required: true }]} fieldProps={{ maxLength: 200 }} />
      </ModalForm>
    </PageContainer>
  )
}

Component.displayName = 'AfterDetail'

const AfterDetail = memo(Component)
export default AfterDetail

/**
 * 审核驳回
 *
 * @param {{ data: RefundMasterDto; onRefresh: () => any }} { data, onRefresh }
 * @return {*}
 */
function useAuditRefuse({ data, onRefresh }: { data: RefundMasterDto; onRefresh: () => any }) {
  const [visibleRefuse, setVisibleRefuse] = useState(false)

  const [form] = useForm()

  const modalFormProps: ModalFormProps = {
    form,
    visible: visibleRefuse,
    onVisibleChange: (visible) => {
      if (!visible) {
        // FIXED: 设置延时清空。防止弹窗里面存在request组件导致发出请求
        setTimeout(() => {
          form.resetFields()
        }, 300)
      }
      setVisibleRefuse(visible)
    },
    onFinish: async (value) => {
      const { storeNote } = value
      const { refundNo, refundStatus } = data

      try {
        if (refundStatus === ERefundStatus.StoreCheck) {
          //  验货不通过
          await api['/admin/refund/checkRefuse_PUT']({ storeNote, refundNo })
        } else if (refundStatus === ERefundStatus.StoreProcess) {
          // 商家处理-拒绝
          await api['/admin/refund/refuse_PUT']({ refundNo, storeNote })
        }
        message.success('操作成功')
        onRefresh()
        setVisibleRefuse(false)
      } catch (error) {}

      return false
    }
  }

  return {
    modalFormProps
  }
}
