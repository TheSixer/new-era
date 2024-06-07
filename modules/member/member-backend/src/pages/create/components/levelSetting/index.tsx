import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import { Space } from 'antd'
import { FC, memo } from 'react'
import styles from './index.module.less'

interface ILevelSettingProps {
  index: number
}

const Component: FC<ILevelSettingProps> = (props) => {
  const { index } = props

  return (
    <Space direction="vertical" className={styles.levelSettingStyle}>
      <ProFormInfo label="等级级别" labelAlign="left" required info={index + 1} />

      <ProFormLimitInput label="等级名称" labelAlign="left" name="levelName" maxLength={20} rules={[{ required: true }]} />

      <ProFormRichText label="等级描述" labelAlign="left" name="richTextContent" fieldProps={{ plain: 'minimalism' }} rules={[{ required: true }]} />

      <Space>
        <ProFormMaterial label="等级图标" labelAlign="left" name="icon" rules={[{ required: true }]} />

        <ProFormMaterial label="等级背景图" labelAlign="left" name="bgUrl" rules={[{ required: true }]} />
      </Space>
    </Space>
  )
}

const LevelSetting = memo(Component)
export default LevelSetting
