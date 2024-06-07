import { ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface'
import { JumpTypeProps } from '~/components/jumpType/const'

export interface IProFormJumpTypeProps extends ProFormFieldItemProps {
  /**
   * 组件项的props参数
   */
  fieldProps?: JumpTypeProps
}
