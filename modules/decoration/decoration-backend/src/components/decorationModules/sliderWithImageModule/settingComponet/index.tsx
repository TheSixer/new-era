import { ProFormDigit, ProFormRadio } from '@ant-design/pro-form'
import { ESliderWithImageMode } from '@wmeimob-modules/decoration-data/src/enums/ESliderWithImageMode'
import { Form, Space } from 'antd'
import { FC, memo } from 'react'
import CustomCard from '../../../commModuleComponents/customCard'
import ImageFormList from '../../../commModuleComponents/imageFormList'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'
import ContentStyle from './contentStyle'

interface ISettingComponetProps extends IModuleEditFormProps {}

const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps } = useModuleEditForm(props)

  const renderContent = (
    <Space direction="vertical" style={{ width: '100%' }}>
      <CustomCard title="图配置">
        <ProFormRadio.Group
          label="模式"
          name="mode"
          fieldProps={{
            optionType: 'button',
            options: [
              { label: '轮播在左', value: ESliderWithImageMode.SliderLeft },
              { label: '轮播在右', value: ESliderWithImageMode.SliderRight }
            ]
          }}
        />
      </CustomCard>

      <CustomCard title="轮播图配置">
        <ProFormDigit
          label="轮播间隔(s)"
          name={['slider', 'interval']}
          rules={[{ required: true, message: '轮播间隔(s)必填' }]}
          fieldProps={{ min: 1, max: 15, precision: 0 }}
        />

        <ImageFormList name={['slider', 'data']} max={10} measure={[167, 240]} />
      </CustomCard>

      <CustomCard title="图配置">
        <ImageFormList name={['images']} max={2} measure={73} />
      </CustomCard>
    </Space>
  )
  return (
    <Form {...formProps}>
      <TabContainer
        renderContent={renderContent}
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
