import { ITextareaProps } from '../../textarea/const'
import { IFeildContainerProps } from '../const'

export interface IMMFeildTextAreaProps extends IFeildContainerProps {
  value: string

  feildProps?: ITextareaProps

  onChange?: (value: string) => void
}
