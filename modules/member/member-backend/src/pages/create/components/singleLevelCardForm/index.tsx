import ProForm from '@ant-design/pro-form'
import { Space } from 'antd'
import { FC, memo } from 'react'
import BasicInfoCard from '../cards/basicInfoCard'
import MemberDescriptionCard from '../cards/memberDescriptionCard'
import MemberRightsCard from '../cards/memberRightsCard'
import SettingCard from '../cards/settingCard'

interface ISingleLevelCardFormProps {
  upload: any
  form: any
}

const Component: FC<ISingleLevelCardFormProps> = (props) => {
  const { form, upload } = props

  return (
    <ProForm form={form} layout="horizontal" labelCol={{ style: { width: 120 } }} wrapperCol={{ style: { maxWidth: '550px' } }} submitter={false}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* 基础信息设置 */}
        <BasicInfoCard />
        {/* 会员卡设置 */}
        <SettingCard form={form} />
        {/* 会员权益设置 */}
        <MemberRightsCard upgrade={false} form={form} />
        {/* 会员说明 */}
        <MemberDescriptionCard upload={upload} />
      </Space>
    </ProForm>
  )
}

const SingleLevelCardForm = memo(Component)
export default SingleLevelCardForm
