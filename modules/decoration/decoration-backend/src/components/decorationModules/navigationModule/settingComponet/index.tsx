import { ProFormDependency } from '@ant-design/pro-form'
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { getGlobalData } from '@wmeimob/backend-store'
import { ENavArrangeType } from '@wmeimob-modules/decoration-data/src/enums/ENavArrangeType'
import { Form, Space } from 'antd'
import { FC, memo, useState } from 'react'
import ButtonRadioWithTextItem from '../../../commModuleComponents/buttonRadioWithTextItem'
import CustomCard from '../../../commModuleComponents/customCard'
import ImageFormList from '../../../commModuleComponents/imageFormList'
import JumpModeSelect from '../../../commModuleComponents/jumpModeSelect'
import MaterialItem from '../../../commModuleComponents/materialItem'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { customCardFormItemProps } from '../../../const'
import { formCol, imageLinkRule, IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'

interface ISettingComponetProps extends IModuleEditFormProps {}

const { decorationConfig } = getGlobalData('systemConfig')

const imgSize = decorationConfig.nav.size

const { Item: FormItem } = Form

const sizes = [
  { label: '默认', value: 'default', tip: '每行5个' },
  { label: '大', value: 'large', tip: '每行4个' }
]

const iconShapes = [
  { label: '圆形', value: 'circle' },
  { label: '方形', value: 'square' }
]

const Component: FC<ISettingComponetProps> = (props) => {
  const { formProps, form } = useModuleEditForm({
    ...props,
    formProps: {
      onValuesChange(changedValue) {
        setTimeout(() => {
          const values = form.getFieldsValue()
          // setMeasure(changedValue.size === 'default' ? [40, 40] : [46, 46])
          props.onChange(values)
        }, 0)
      }
    }
  })

  const [measure, setMeasure] = useState<[number, number]>([imgSize, imgSize])

  const [backgroundColor] = useState([
    { label: '无', value: 'transparent' },
    { label: '白色', value: '#ffffff' }
  ])

  return (
    <Form {...formProps}>
      <TabContainer
        renderContent={
          <Space direction="vertical" style={{ width: '100%' }}>
            <CustomCard title="基础设置">
              <Form.Item label="尺寸" name="size" {...customCardFormItemProps}>
                <ButtonRadioWithTextItem options={sizes} />
              </Form.Item>

              <ProFormDependency name={['size']}>
                {({ size }) => {
                  const options = [
                    { label: '平均分布', value: ENavArrangeType.Average, tip: '宽度均分' },
                    { label: '固定宽度', value: ENavArrangeType.Fixed, tip: size === 'default' ? '占比20%' : '占比25%' }
                  ]
                  return (
                    <Form.Item label="排列方式" name="arrangeType" {...customCardFormItemProps}>
                      <ButtonRadioWithTextItem options={options} />
                    </Form.Item>
                  )
                }}
              </ProFormDependency>

              <Form.Item label="图片形状" name="iconShape" {...customCardFormItemProps}>
                <ButtonRadioWithTextItem options={iconShapes} showTip={false} />
              </Form.Item>
            </CustomCard>

            <ImageFormList
              addButtonText="添加导航"
              itemRender={(field) => (
                <>
                  <ProFormLimitInput label="导航名称" name={[field.name, 'name']} maxLength={4} />

                  <FormItem {...formCol} label="选择图片" name={[field.name, 'url']} rules={imageLinkRule}>
                    <MaterialItem measure={measure} />
                  </FormItem>
                  <FormItem {...formCol} label="跳转链接" name={[field.name]}>
                    <JumpModeSelect />
                  </FormItem>
                </>
              )}
              max={0}
            />
          </Space>
        }
        renderStyle={
          <ComponentStyle>
            <ProFormItem label="背景色" name={['componentStyle', 'backgroundColor']} labelCol={{ span: 5 }} colon={false}>
              <ButtonRadioWithTextItem options={backgroundColor} />
            </ProFormItem>
          </ComponentStyle>
        }
      />
    </Form>
  )
}

Component.displayName = 'SettingComponet'

const SettingComponet = memo(Component)
export default SettingComponet
