import { ProFormField } from '@ant-design/pro-form'
import { FC, memo } from 'react'
import ColorPicker from '../../colorPicker'
import { ProFormFieldProps } from '@ant-design/pro-form'
import { ColorPickerProps } from '../../colorPicker/const'

export interface IProFormColorPickerProps<T = any> extends ProFormFieldProps<T, ColorPickerProps> {
  /** 类型 */
  type?: ColorPickerProps['type']
}

const Component: FC<IProFormColorPickerProps> = (props) => {
  const { type, fieldProps = {}, ...formProps } = props

  return (
    <ProFormField {...formProps}>
      <ColorPicker type={type} {...fieldProps} />
    </ProFormField>
  )
}

Component.displayName = 'ProFormColorPicker'

const ProFormColorPicker = memo(Component)
export default ProFormColorPicker
