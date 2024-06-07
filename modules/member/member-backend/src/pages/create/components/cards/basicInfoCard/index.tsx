import { ProFormSwitch } from '@ant-design/pro-form'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { Card } from 'antd'
import { FC, memo } from 'react'

interface IBasicInfoCardProps {}

const Component: FC<IBasicInfoCardProps> = () => {
  return (
    <Card title="基本信息设置">
      <ProFormInfo label="会员卡ID" name="id" hidden />

      {/* 有等级/无等级卡 */}
      <ProFormSwitch name="upgrade" hidden />

      <ProFormLimitInput label="会员卡名称" name="name" rules={[{ required: true }]} maxLength={20} />

      <ProFormMaterial label="会员卡图标" name="icon" rules={[{ required: true }]} />

      <ProFormMaterial label="会员卡背景图" name="bgUrl" rules={[{ required: true }]} />

      <ProFormSwitch label="使用状态" name="enabled" required />
    </Card>
  )
}

const BasicInfoCard = memo(Component)
export default BasicInfoCard
