import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import { IBasicModuleRichText } from '@wmeimob-modules/decoration-data'
import { Form } from 'antd'
import { FC, memo, useContext } from 'react'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import StoreContext from '../../../store-context'
import ComponentStyle from '../../../styleSetting/componentStyle'
import styles from './index.module.less'

interface ISettingComponetProps extends IModuleEditFormProps<IBasicModuleRichText> {}

const Component: FC<ISettingComponetProps> = (props) => {
  const { upload } = useContext(StoreContext)
  const { formProps } = useModuleEditForm(props)

  return (
    <Form {...formProps} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} className={styles.settingComponetStyle}>
      <TabContainer renderContent={<ProFormRichText name="data" upload={upload} />} renderStyle={<ComponentStyle />} />
    </Form>
  )
}

Component.displayName = 'SettingComponet'

const SettingComponet = memo(Component)
export default SettingComponet
