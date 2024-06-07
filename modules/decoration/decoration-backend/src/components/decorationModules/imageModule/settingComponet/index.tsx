import { ProFormRadio } from '@ant-design/pro-form'
import { BasicModuleImageDTO } from '@wmeimob-modules/decoration-data'
import { EArrangeType, MArrangeType } from '@wmeimob-modules/decoration-data/src/enums/EArrangeType'
import { Form } from 'antd'
import { FC, memo, useMemo } from 'react'
import ImageFormList from '../../../commModuleComponents/imageFormList'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'
import ContentStyle from './contentStyle'
import styles from './index.module.less'

interface ISettingComponetProps extends IModuleEditFormProps<BasicModuleImageDTO> {}

const Component: FC<ISettingComponetProps> = (props) => {
  const { arrangeType, data } = props.data
  const { form, formProps } = useModuleEditForm({
    ...props,
    formProps: {
      onValuesChange(changedValue) {
        setTimeout(() => {
          const values = form.getFieldsValue()

          if (changedValue.arrangeType === EArrangeType.Orientation) {
            if (values.data && values.data.length > max) {
              values.data = values.data.slice(0, max)
            }
          }
          props.onChange(values)
        }, 0)
      }
    }
  })

  const max = useMemo(() => {
    return props.data.arrangeType === EArrangeType.Orientation ? 4 : 10
  }, [arrangeType])

  const measure = useMemo<[number, number]>(() => {
    const len = data.length || 1
    return arrangeType === EArrangeType.Vertical ? [345, 140] : arrangeType === EArrangeType.Scroll ? [140, 68] : [parseInt(`${345 / len}`, 10), 140]
  }, [arrangeType, data])

  return (
    <Form {...formProps} className={styles.settingComponetStyle}>
      <ProFormRadio.Group
        name="arrangeType"
        wrapperCol={{ span: 24 }}
        fieldProps={{
          optionType: 'button',
          options: [EArrangeType.Vertical, EArrangeType.Orientation, EArrangeType.Scroll].map((value) => ({ label: MArrangeType[value], value }))
        }}
      />

      <TabContainer
        renderContent={<ImageFormList max={max} measure={measure} />}
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
