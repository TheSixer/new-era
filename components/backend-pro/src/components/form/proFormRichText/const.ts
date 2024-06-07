import { ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface'
import { IMMRichTextProps } from '@wmeimob/rich-text/src/components/richText/const'
import { Rule } from 'antd/lib/form'

export interface IProFormRichTextProps extends ProFormFieldItemProps<Omit<IMMRichTextProps, 'fileUpload'>> {
  upload?(fileList: File[]): Promise<string[]>
}

/** 富文本组件专用必填校验 */
export const richTextRequiredRule: Rule[] = [{ validator: (_, value) => {
  const richTextEmpty = '<p><br></p>'

  return !value || value === richTextEmpty ? Promise.reject(new Error('请输入')) : Promise.resolve(value)
} }]
