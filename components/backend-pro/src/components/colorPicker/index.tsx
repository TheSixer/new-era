import React, { useCallback, memo } from 'react'
import { TwitterPicker, ColorResult, SketchPicker } from 'react-color'
import styles from './index.module.less'
import { Tooltip } from 'antd'
import { ColorPickerProps, EColorPickerType } from './const'

/**
 * 颜色选择组件
 *
 * @param {ColorPickerProps} props
 * @returns
 */
const Component: React.FC<ColorPickerProps> = (props) => {
  const { value, type = EColorPickerType.Twitter, onChange = () => {} } = props

  const handleChange = useCallback((color: ColorResult) => {
    onChange!(color.hex)
  }, [])

  function renderPicker() {
    switch (type) {
      case EColorPickerType.Sketch:
        return <SketchPicker presetColors={colors as any} {...props.sketchPickerProps} color={value} onChangeComplete={handleChange} />
      default:
        return <TwitterPicker triangle="hide" colors={colors} {...props.twitterPickerProps} color={value} onChangeComplete={handleChange} />
    }
  }

  return (
    <div className={styles.colorPicker}>
      <Tooltip trigger="click" overlayClassName="colorPicker_tooltip" title={<div style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{renderPicker()}</div>}>
        <div className={styles.colorBolck}>
          <span className={styles.colorBg} style={{ background: value }} />
          <span className={styles.colorText}>{value || '选择颜色'}</span>
        </div>
      </Tooltip>
    </div>
  )
}

const colors = [
  '#ffffff',
  '#999999',
  '#F44E3B',
  '#FE9200',
  '#FCDC00',
  '#DBDF00',
  '#A4DD00',
  '#68CCCA',
  '#73D8FF',
  '#AEA1FF',
  '#FDA1FF',
  '#333333',
  '#808080',
  '#cccccc',
  '#D33115',
  '#E27300',
  '#FCC400',
  '#B0BC00',
  '#68BC00',
  '#16A5A5',
  '#009CE0',
  '#7B64FF',
  '#FA28FF',
  '#000000',
  '#666666',
  '#B3B3B3',
  '#9F0500',
  '#C45100',
  '#FB9E00',
  '#808900',
  '#194D33',
  '#0C797D',
  '#0062B1',
  '#653294',
  '#AB149E'
]

const ColorPicker = memo(Component)

export default ColorPicker
