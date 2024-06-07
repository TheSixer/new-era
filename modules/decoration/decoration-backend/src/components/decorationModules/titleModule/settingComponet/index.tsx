import { Form, Space } from 'antd'
import { FC, memo } from 'react'
import CustomCard from '../../../commModuleComponents/customCard'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'
import ContentStyle from './contentStyle'
import styles from './index.module.less'
import { ProFormSwitch } from '@ant-design/pro-form'
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import IconSelect from '@wmeimob/backend-pro/src/components/iconSelect'
// FIXME: 这里引用了外部依赖
import JumpType from '~/components/jumpType'
import { IModuleEditFormProps } from '../../../moduleEditForm/const'

interface ISettingComponetProps extends IModuleEditFormProps {}

const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps } = useModuleEditForm(props)

  return (
    <Form {...formProps} className={styles.settingComponetStyle}>
      <TabContainer
        renderContent={
          <Space direction="vertical" style={{ width: '100%' }}>
            <CustomCard>
              <ProFormLimitInput label="标题名称" name="name" maxLength={10} rules={[{ required: true }]} />
            </CustomCard>

            <CustomCard>
              <ProFormSwitch label="显示左侧" name={['left', 'show']} valuePropName="checked" />

              <ProFormItem label="选择图标" name={['left', 'icon']}>
                <IconSelect />
              </ProFormItem>

              <ProFormMaterial label="选择图片" name={['left', 'image']} fieldProps={{ measure: 40 }} />
            </CustomCard>

            <CustomCard>
              <ProFormSwitch label="显示箭头" name={['right', 'showArrow']} valuePropName="checked" />

              <ProFormLimitInput label="文本" name={['right', 'content']} maxLength={4} />

              <ProFormItem label="跳转链接" name={['link']}>
                <JumpType />
              </ProFormItem>
            </CustomCard>
          </Space>
        }
        renderStyle={
          <>
            <ContentStyle />
            <ComponentStyle />
          </>
        }
      />
    </Form>
  )
}

Component.displayName = 'SettingComponet'

const SettingComponet = memo(Component)
export default SettingComponet
