import { MMCitysPickerProps } from '../../citys-picker'
import { IFeildContainerProps } from '../const'

export interface ICityPickerProps extends IFeildContainerProps {
  value: MMCitysPickerProps['value']

  placeholder?: string

  onChange?(data: any): void
}
