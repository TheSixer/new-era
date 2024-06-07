import { ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface'
import { MaterialSelectProps } from '../../material/components/materialSelect'

export interface IProFormMaterialProps extends ProFormFieldItemProps {
  /**
   * 组件项的props参数
   */
  fieldProps?: MaterialSelectProps
}
