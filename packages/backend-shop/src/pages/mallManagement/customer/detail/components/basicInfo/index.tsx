import { FC, memo, useRef } from 'react'
import { EChangeScoreType, IBasicInfoProps, IModalFormValues, OChangeScoreType } from './const'
import { Descriptions, Space, Image, Button, message } from 'antd'
import { ModalForm, ProFormDependency, ProFormDigit, ProFormInstance, ProFormRadio } from '@ant-design/pro-form'
import { assembleResizeUrl } from '@wmeimob/aliyun'
import { mmMinus } from '@wmeimob/utils/src/mmCurrency'
import { api } from '~/request'
import { MCustomerStatus } from '~/enums/customer/ECustomerStatus'
import dayjs from 'dayjs'
import { systemConfig } from '~/config'
const { config, scoreConfig } = systemConfig

const Component: FC<IBasicInfoProps> = (props) => {
  const { detail, scoreInfo } = props

  const { formRef, minReduceScore, maxPlusScore, handleOperateTypeChange, handleFinish } = useBasicService(props)

  const modal = scoreInfo && (
    <ModalForm<IModalFormValues>
      formRef={formRef}
      title="调整积分"
      layout="horizontal"
      initialValues={{ isPlus: EChangeScoreType.Add }}
      onFinish={handleFinish}
      trigger={<Button type="primary">调整积分</Button>}
      modalProps={{ destroyOnClose: true }}
    >
      <ProFormRadio.Group label="操作" name="isPlus" fieldProps={{ options: OChangeScoreType, onChange: handleOperateTypeChange }} />

      <ProFormDependency name={['isPlus']}>
        {({ isPlus }) => {
          const maxInput = isPlus ? maxPlusScore : minReduceScore
          const disabled = maxInput! <= 0
          return (
            <ProFormDigit
              rules={[
                {
                  validator: (_, value?: number) => {
                    if (disabled) {
                      return Promise.resolve()
                    }

                    return !value ? Promise.reject(new Error('请输入大于0的整数')) : Promise.resolve()
                  }
                }
              ]}
              disabled={disabled}
              extra={disabled ? '' : `最多可输入 ${maxInput}`}
              width="md"
              name="score"
              label="积分"
              fieldProps={{ precision: 0, placeholder: disabled ? '已达积分上限' : '' }}
              min={0}
              max={disabled ? 0 : maxInput}
            />
          )
        }}
      </ProFormDependency>
    </ModalForm>
  )

  return (
    <Space direction="vertical" size={20}>
      <div>
        <Descriptions title="基础信息" bordered>
          <Descriptions.Item label="客户编号">{detail.memberNo}</Descriptions.Item>
          <Descriptions.Item label="手机号码">{detail.mobile}</Descriptions.Item>
          <Descriptions.Item label="生日">{detail.birthday ? dayjs(detail.birthday).format('YYYY年MM月DD日') : ''}</Descriptions.Item>
          <Descriptions.Item label="用户状态">{MCustomerStatus[detail.status!]}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{detail.gmtCreated}</Descriptions.Item>
          <Descriptions.Item label="openid">{detail.openId}</Descriptions.Item>
        </Descriptions>
      </div>

      <div>
        <Descriptions title="微信信息" bordered>
          <Descriptions.Item label="微信头像">
            <Image width={100} src={assembleResizeUrl(detail.headImg, { width: 100 })} />
          </Descriptions.Item>
          <Descriptions.Item label="微信昵称">{detail.nickName}</Descriptions.Item>
        </Descriptions>
      </div>

      {config.enableScore && (
        <div>
          <Descriptions title="积分信息" bordered extra={modal}>
            <Descriptions.Item label="当前可用积分">{scoreInfo?.availableScore || 0}</Descriptions.Item>
            <Descriptions.Item label="累计积分">{scoreInfo?.totalScore || 0}</Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Space>
  )
}

Component.displayName = 'BasicInfo'

const BasicInfo = memo(Component)
export default BasicInfo

function useBasicService(props: IBasicInfoProps) {
  const { detail, scoreInfo, onRefresh } = props

  /** 该用户最多可减少的积分 */
  const minReduceScore = scoreInfo?.availableScore
  /** 最多可加至的积分上限 */
  const maxPlusScore = mmMinus(scoreConfig.upperLimit, scoreInfo?.availableScore)

  const formRef = useRef<ProFormInstance<IModalFormValues>>()

  function handleOperateTypeChange() {
    formRef.current?.resetFields(['score'])
  }

  async function handleFinish(values: IModalFormValues) {
    if (!values.score) return true

    try {
      await api['/admin/api/member/changeScore_POST']({
        id: detail.id,
        isPlus: !!values.isPlus,
        score: values.score
      })

      await onRefresh()
      message.success('操作成功')
      return true
    } catch (error) {
      return false
    }
  }

  return {
    minReduceScore,
    maxPlusScore,
    formRef,
    handleOperateTypeChange,
    handleFinish
  }
}
