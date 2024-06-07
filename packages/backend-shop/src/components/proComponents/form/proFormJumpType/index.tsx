import { ProFormField } from '@ant-design/pro-form'
import { FC, memo } from 'react'
import { IProFormJumpTypeProps } from './const'
import JumpType from '~/components/jumpType'

/**
 * 跳转类型
 * @param props
 * @returns
 */
const Component: FC<IProFormJumpTypeProps> = (props) => {
  const { fieldProps = {}, ...formProps } = props

  return (
    <ProFormField {...formProps}>
      <JumpType {...fieldProps} />
    </ProFormField>
  )
}

Component.displayName = 'ProFormJumpType'

const ProFormJumpType = memo(Component)
export default ProFormJumpType
