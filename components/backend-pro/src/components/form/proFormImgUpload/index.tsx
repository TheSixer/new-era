import { FC, memo } from 'react'
import { ProFormField } from '@ant-design/pro-form'
import ImgUpload, { ImgUploadProps } from '../../imgUpload'
import { ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface'

export interface IProFormImgUploadProps extends ProFormFieldItemProps<Omit<ImgUploadProps, 'value' | 'onChange'>> {
  upload: ImgUploadProps['upload']
}

/**
 * 阿里云图片上传组件
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<IProFormImgUploadProps> = (props) => {
  const { fieldProps, upload, ...formProps } = props

  return (
    <ProFormField {...formProps}>
      <ImgUpload {...fieldProps} upload={upload} />
    </ProFormField>
  )
}

Component.displayName = 'ProFormImgUpload'

const ProFormImgUpload = memo(Component)
export default ProFormImgUpload
