import { ProFormField } from '@ant-design/pro-form'
import { FC, memo } from 'react'
import MaterialSelect from '../../material/components/materialSelect'
import { IProFormMaterialProps } from './const'

/**
 * 素材库图片选择
 * @param props
 * @returns
 */
const Component: FC<IProFormMaterialProps> = (props) => {
  const { fieldProps = {}, disabled, ...formProps } = props

  return (
    <ProFormField {...formProps}>
      <MaterialSelect {...fieldProps} disabled={disabled} />
    </ProFormField>
  )
}

Component.displayName = 'ProFormMaterial'

const ProFormMaterial = memo(Component)
export default ProFormMaterial
