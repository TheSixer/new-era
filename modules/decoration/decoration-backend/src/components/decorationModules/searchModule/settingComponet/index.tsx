import { ProFormDependency, ProFormRadio, ProFormSwitch } from '@ant-design/pro-form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { EModuleSearcType, OModuleSearcType } from '@wmeimob-modules/decoration-data'
import { Form } from 'antd'
import { FC, memo } from 'react'
import AddImageButton from '../../../commModuleComponents/addImageButton'
import DragFormItem from '../../../commModuleComponents/dragFormItem'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { blockWrapperCol, formCol, IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'

interface ISettingComponetProps extends IModuleEditFormProps {}

const { List: FormList } = Form

const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps } = useModuleEditForm(props)

  const renderContent = (
    <>
      <ProFormRadio.Group label="显示模式" name="type" options={OModuleSearcType} />

      <ProFormDependency name={['type']}>
        {({ type }) => {
          return type === EModuleSearcType.Swiper ? (
            <FormList name="keywords">
              {(fields, operation) => (
                <>
                  <DragFormItem
                    {...blockWrapperCol}
                    fields={fields}
                    operation={operation}
                    itemRender={(field) => (
                      <>
                        <ProFormLimitInput {...formCol} label="搜索词" name={[field.name, 'text']} maxLength={10} />
                        <ProFormSwitch {...formCol} label="是否显示" name={[field.name, 'show']} />
                      </>
                    )}
                  />
                  <AddImageButton text="添加关键词" current={fields.length} max={10} onClick={() => operation.add({ text: '', show: false })} />
                </>
              )}
            </FormList>
          ) : (
            <ProFormLimitInput
              label="预设内容"
              name="placeholder"
              maxLength={10}
              rules={[{ required: true }]}
              fieldProps={{ placeholder: '请输入预设内容', allowClear: true }}
            />
          )
        }}
      </ProFormDependency>
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
