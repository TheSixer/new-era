import { FC, memo, useState } from 'react'

import IconFont from '../iconFont'
import IconFontName from '../iconFont/name'
import IconFontSelectModal from './iconFontSelectModal'

export interface IconSelectProps {
  value?: IconFontName
  onChange?: (value: IconFontName) => void
}

const Component: FC<IconSelectProps> = (props) => {
  const { value } = props
  const [show, setShow] = useState(false)

  function handleClick() {
    setShow(true)
  }

  function handleIconFontSelectOk(data: any) {
    setShow(false)
    props.onChange && props.onChange(data)
  }

  return (
    <span>
      <span onClick={handleClick}>{!value ? <span style={{ color: '#1890ff', cursor: 'pointer' }}>选择icon</span> : <IconFont value={value} />}</span>
      <IconFontSelectModal visible={show} icon={value as any} onOk={handleIconFontSelectOk} onCancel={() => setShow(false)} />
    </span>
  )
}

Component.defaultProps = {}
Component.displayName = 'IconSelect'

const IconSelect = memo(Component)
export default IconSelect
