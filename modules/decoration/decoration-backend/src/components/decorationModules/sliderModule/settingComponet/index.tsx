import { ProFormDependency, ProFormDigit } from '@ant-design/pro-form'
import { Form } from 'antd'
import { FC, memo } from 'react'
import ImageFormList from '../../../commModuleComponents/imageFormList'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'

interface ISettingComponetProps extends IModuleEditFormProps {}

const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps } = useModuleEditForm(props)

  const renderContent = (
    <>
      <ProFormDigit
        label="轮播间隔(s)"
        name="interval"
        rules={[{ required: true, message: '轮播间隔(s)必填' }]}
        fieldProps={{ min: 0, max: 15, precision: 0 }}
        extra="填 0 则不轮播"
      />

      <ProFormDigit label="图片高度" name="height" rules={[{ required: true }]} fieldProps={{ min: 100, max: 1000, precision: 0 }} />

      <ProFormDependency name={['height']}>{({ height }) => <ImageFormList max={10} measure={[345, height]} />}</ProFormDependency>
    </>
  )
  return (
    <Form {...formProps}>
      <TabContainer renderContent={renderContent} renderStyle={<ComponentStyle />} />
    </Form>
  )
}

Component.displayName = 'SettingComponet'

const SettingComponet = memo(Component)
export default SettingComponet
