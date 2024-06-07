import { FC, memo, useCallback } from 'react'
import { ISwitchProProps } from './const'
import { Switch } from 'antd'

const Component: FC<ISwitchProProps> = (props) => {
  const { checked, defaultChecked, trueValue = true, falseValue = false, onChange = () => {}, ...rest } = props

  const handleChange = useCallback((checked: boolean, event: MouseEvent) => {
    onChange(checked ? trueValue : falseValue, event)
  }, [onChange])

  return (
    <Switch
      {...rest}
      checked={checked === undefined ? checked : checked === trueValue}
      defaultChecked={defaultChecked === undefined ? defaultChecked : defaultChecked === falseValue}
      onChange={handleChange}
    />
  )
}

Component.displayName = 'SwitchPro'

const SwitchPro = memo(Component)
export default SwitchPro
