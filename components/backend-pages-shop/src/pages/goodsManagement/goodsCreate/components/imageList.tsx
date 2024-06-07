import { FC, memo, CSSProperties } from 'react'
import { Badge } from 'antd'
import MaterialSelect, { MaterialSelectProps } from '@wmeimob/backend-pages/src/components/material/components/materialSelect'
import { MaterialType } from '@wmeimob/backend-pages/src/components/material/const'

interface IFromProps extends Pick<MaterialSelectProps, 'multiple'> {
  id?: string
  value?: string[]

  badge?: boolean
  onChange?: (value?: string[]) => void
}

const ImageList: FC<IFromProps> = (props) => {
  const { value = [], multiple = true, badge = true, ...rest } = props

  function onChange(newValue: any) {
    props.onChange?.(newValue || [])
  }

  const badgeStyle: CSSProperties = { visibility: !!value.length && !multiple && badge ? undefined : 'hidden' }

  return (
    <Badge.Ribbon text="主图" placement="start" style={badgeStyle}>
      <MaterialSelect multiple={multiple} {...rest} value={value} onChange={onChange} type={MaterialType.Image} maxLength={9} repeatTip measure={375} />
    </Badge.Ribbon>
  )
}

export default memo(ImageList)
