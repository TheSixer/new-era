import { TwitterPicker, TwitterPickerProps, ColorResult, SketchPicker, SketchPickerProps } from 'react-color'

export interface ColorPickerProps {
  /**
   * 颜色值
   */
  value?: string

  /**
   * 风格
   */
  type?: EColorPickerType | keyof typeof EColorPickerType

  twitterPickerProps?: TwitterPickerProps

  /**  */
  sketchPickerProps?: SketchPickerProps

  /**
   * change处理事件
   */
  onChange?: (data: string) => void
}

export enum EColorPickerType {
  /**
   * 推特风格
   */
  Twitter = 'Twitter',
  /**
   * Sketch风格
   */
  Sketch = 'Sketch'
}
