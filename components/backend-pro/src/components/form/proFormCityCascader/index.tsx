import { FC, memo } from 'react'
import deafultOptions from '../../../../assets/json/district.json'
import { ProFormCascader } from '@ant-design/pro-form'
import { ProFormFieldProps } from '@ant-design/pro-form'
import { CascaderProps } from 'antd'

export interface IProFormCityCascaderProps<FiledProps = CascaderProps<any>, DataType = {}> extends ProFormFieldProps<DataType, FiledProps> {
  /**
   * 与 cascader 相同，根据 options 生成子节点，推荐使用
   */
  options?: CascaderProps<any>['options']
}

/**
 * 表单组件-城市选择组件
 * @param props
 * @returns
 */
const Component: FC<IProFormCityCascaderProps> = (props) => {
  const { options = deafultOptions, fieldProps = {}, ...formProps } = props

  return <ProFormCascader {...formProps} fieldProps={{ ...fieldProps, options }} />
}

Component.displayName = 'ProFormCityCascader'

const ProFormCityCascader = memo(Component)
export default ProFormCityCascader
