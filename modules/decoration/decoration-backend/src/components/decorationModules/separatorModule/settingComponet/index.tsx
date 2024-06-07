import { ProFormDigit, ProFormSelect } from '@ant-design/pro-form'
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem'
import { Form } from 'antd'
import { FC, memo } from 'react'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'

interface ISettingComponetProps extends IModuleEditFormProps {}

const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps } = useModuleEditForm(props)

  return (
    <Form {...formProps}>
      <TabContainer
        renderContent={
          <>
            <ProFormDigit label="高度" name="height" fieldProps={{ min: 0, max: 200, precision: 0 }} />
            <ProFormDigit label="线高" name="lineHeight" fieldProps={{ min: 0, max: 200, precision: 0 }} />
            <ProFormSelect
              label="线型"
              name="borderStyle"
              options={[
                { label: '实线', value: 'solid' },
                { label: '虚线', value: 'dashed' },
                { label: '点线', value: 'dotted' }
              ]}
            />
            <ProFormItem noStyle shouldUpdate={false}>
              <div className="textTip">
                <div>组件之间距离默认没有间隔.您可以通过使用该组件设置合适的高度来隔开其他组件</div>
                <div>线高设置是否在中间显示一条分隔线.设置为0则不显示</div>
              </div>
            </ProFormItem>
          </>
        }
        renderStyle={<ComponentStyle />}
      />
    </Form>
  )
}

Component.displayName = 'SettingComponet'

const SettingComponet = memo(Component)
export default SettingComponet
