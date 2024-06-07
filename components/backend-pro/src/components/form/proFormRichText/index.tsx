import { FC, memo } from 'react'
import { IProFormRichTextProps } from './const'
import { ProFormField } from '@ant-design/pro-form'
import { MMRichText } from '@wmeimob/rich-text'

const Component: FC<IProFormRichTextProps> = (props) => {
  const { fieldProps, upload, readonly, ...formProps } = props

  return (
    <ProFormField {...formProps}>
      <MMRichText readonly={readonly} {...fieldProps} fileUpload={upload} />
    </ProFormField>
  )
}

Component.displayName = 'ProFormRichText'

const ProFormRichText = memo(Component)
export default ProFormRichText
