import { InputNumber, Space } from 'antd'
import { FC, memo } from 'react'
import { ILocationInputProps, POSITION_SITE_URL } from './const'

const Component: FC<ILocationInputProps> = (props) => {
  const { value = '', disabled, onChange = () => {} } = props

  const [longitude, latitude] = value.split(',')

  function handleChange(lon: number | string | null, lat: number | string | null) {
    const valid = (num) => !!num || num?.toString() === '0'
    !valid(lon) && !valid(lat) ? onChange('') : onChange([lon, lat].join(','))
  }

  return (
    <Space>
      <InputNumber
        disabled={disabled}
        addonBefore="经度"
        value={longitude as unknown as number}
        style={{ width: 180 }}
        min={0}
        max={180}
        placeholder="填写经度"
        onChange={(num) => handleChange(num, latitude)}
      />

      <InputNumber
        disabled={disabled}
        addonBefore="纬度"
        value={latitude as unknown as number}
        style={{ width: 180 }}
        min={0}
        max={85}
        placeholder="填写纬度"
        onChange={(num) => handleChange(longitude, num)}
      />

      {!disabled && (
        <a target="_blank" rel="noreferrer" href={POSITION_SITE_URL}>
          选择定位
        </a>
      )}
    </Space>
  )
}

const LocationInput = memo(Component)
export default LocationInput
