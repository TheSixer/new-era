import { ProFormRadio, ProFormSwitch, ProFormText } from '@ant-design/pro-form'
import { EVideoSource, MVideoSource } from '@wmeimob-modules/decoration-data/src/enums/EVideoSource'
import { Form, Space } from 'antd'
import { FC, memo, useState } from 'react'
import AddImageButton from '../../../commModuleComponents/addImageButton'
import CustomCard from '../../../commModuleComponents/customCard'
import DragFormItem from '../../../commModuleComponents/dragFormItem'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { blockWrapperCol, IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'
// TODO: 外部以来
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import MaterialModal from '@wmeimob/backend-pages/src/components/material'
import { MaterialType } from '@wmeimob/backend-pages/src/components/material/const'

interface ISettingComponetProps extends IModuleEditFormProps {}

const { List: FormList, Item: FormItem } = Form

const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps } = useModuleEditForm(props)
  const [visible, setVisible] = useState(false)

  const Video = ({ value }: any) => value

  return (
    <div>
      <Form {...formProps}>
        <TabContainer
          renderContent={
            <Space direction="vertical" style={{ width: '100%' }}>
              <ProFormRadio.Group
                label="视频来源"
                name="source"
                options={[
                  { label: MVideoSource[EVideoSource.System], value: EVideoSource.System },
                  { label: MVideoSource[EVideoSource.External], value: EVideoSource.External }
                ]}
              />

              <Form.Item noStyle shouldUpdate={(pre, next) => pre.source !== next.source}>
                {({ getFieldValue }) => {
                  const source = getFieldValue('source')
                  return source === EVideoSource.System ? (
                    <FormList name="videos">
                      {(fields, operation) => (
                        <>
                          <DragFormItem
                            {...blockWrapperCol}
                            fields={fields}
                            operation={operation}
                            itemRender={(field) => (
                              <FormItem name={field.name}>
                                <Video />
                              </FormItem>
                            )}
                          />
                          <MaterialModal
                            visible={visible}
                            max={10 - fields.length}
                            type={MaterialType.Video}
                            onCancel={() => setVisible(false)}
                            onOk={(values) => {
                              values.forEach((value) => operation.add(value))
                              setVisible(false)
                            }}
                          />
                          <AddImageButton max={10} text="选择视频" onClick={() => setVisible(true)} />
                        </>
                      )}
                    </FormList>
                  ) : (
                    <CustomCard>
                      <ProFormText
                        label="视频地址"
                        name="videoAddress"
                        rules={[{ required: true, message: '请输入视频地址' }]}
                        fieldProps={{ maxLength: 100 }}
                      />

                      <ProFormMaterial label="视频封面" name="videoCoverImg" fieldProps={{ measure: [375, 210] }} />
                    </CustomCard>
                  )
                }}
              </Form.Item>

              <CustomCard title="播放设置">
                <ProFormSwitch
                  label="进度条"
                  name={['palySetting', 'progress']}
                  valuePropName="checked"
                  extra={<span style={{ fontSize: 12 }}>仅支持小程序</span>}
                />
              </CustomCard>
            </Space>
          }
          renderStyle={<ComponentStyle />}
        />
      </Form>
    </div>
  )
}

Component.displayName = 'SettingComponet'

const SettingComponet = memo(Component)
export default SettingComponet
