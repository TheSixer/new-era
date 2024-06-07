import { ImageLinkDataDTO } from '@wmeimob-modules/decoration-data'
import { BasicModuleSignEnum } from '@wmeimob-modules/decoration-data/src/enums/BasicModuleSignEnum'
import { FormProps } from 'antd'
import { Rule } from 'antd/lib/form'

export interface IModuleEditFormProps<T = any> {
  type: BasicModuleSignEnum
  /** 数据 */
  data: T
  /** 数据变化 */
  onChange(data: T): void
}

export const formCol: Pick<FormProps, 'labelCol' | 'wrapperCol'> = { labelCol: { span: 7 }, wrapperCol: { span: 17 } } // 基础布局
export const blockWrapperCol: Pick<FormProps, 'labelCol' | 'wrapperCol'> = { labelCol: { span: 0 }, wrapperCol: { span: 24 } } // 内容占满的布局

export const imageLinkRule: Rule[] = [
  {
    validator(rule, value: ImageLinkDataDTO) {
      if (!value) {
        return Promise.reject(Error('请上传图片'))
      }
      return Promise.resolve()
    }
  }
]
