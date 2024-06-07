import React, { FC, memo, useState } from 'react'
import { Form, Space } from 'antd'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { blockWrapperCol, IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'
import CustomCard from '../../../commModuleComponents/customCard'
import DragFormItem from '../../../commModuleComponents/dragFormItem'
import AddImageButton from '../../../commModuleComponents/addImageButton'
import LivePlayerChooseModal from './livePlayerChooseModal'
import { IBasicModuleLiverPlayer } from '@wmeimob-modules/decoration-data'

interface ISettingComponetProps extends IModuleEditFormProps<IBasicModuleLiverPlayer> {}

const { Item: FormItem, List: FormList } = Form
const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps, form } = useModuleEditForm(props)

  const [visible, setVisible] = useState(false)

  return (
    <>
      <Form {...formProps}>
        <TabContainer
          renderContent={
            <Space direction="vertical" style={{ width: '100%' }}>
              <CustomCard title="直播计划" />
              <FormList name="data">
                {(fields, operation) => (
                  <>
                    <DragFormItem
                      {...blockWrapperCol}
                      fields={fields}
                      operation={operation}
                      itemRender={(field) => (
                        <FormItem name={field.name}>
                          <LiveItem />
                        </FormItem>
                      )}
                    />
                    <AddImageButton current={fields.length} max={5} text="选择直播间组" onClick={() => setVisible(true)} />
                  </>
                )}
              </FormList>
            </Space>
          }
          renderStyle={<ComponentStyle />}
        />
      </Form>
      <LivePlayerChooseModal
        data={props.data.data}
        visible={visible}
        onClose={() => setVisible(false)}
        onOk={(data: any) => {
          form.setFieldsValue({ data })
          props.onChange({ ...props.data, data })
          setVisible(false)
        }}
      />
    </>
  )
}

Component.displayName = 'SettingComponet'

const SettingComponet = memo(Component)
export default SettingComponet

function LiveItem({ value }: any) {
  return <div>{value.scheduleGroupName}</div>
}
