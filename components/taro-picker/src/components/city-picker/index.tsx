import { memo, FC, useState } from 'react'
import MMPicker from '../picker'
import { IMMPopPickerProps } from '../picker/const'

interface IMMCityPickerProps extends Omit<IMMPopPickerProps, 'data' | 'value'> {
  value?: string[]

  data: any[]
}

const Component: FC<IMMCityPickerProps> = (props) => {
  const [fieldKey] = useState({ label: 'text', value: 'id' })

  return <MMPicker {...props} fieldKey={fieldKey} title="选择地区" data={props.data} value={props.value || []} />
}

const MMCityPicker = memo(Component)
export default MMCityPicker
