import { ProFormColorPicker, ProFormRadio, ProFormSelect } from '@ant-design/pro-form'
import { FC, memo } from 'react'
import CustomCard from '../../../../commModuleComponents/customCard'

interface IContentStyleProps {}

const Component: FC<IContentStyleProps> = (props) => {
  return (
    <CustomCard>
      <ProFormRadio.Group
        label="文本样式"
        name={['contentStyle', 'fontWeight']}
        options={[
          { label: '常规', value: 'normal' },
          { label: '加粗', value: 'bold' }
        ]}
      />

      <ProFormRadio.Group
        label="对齐方式"
        name={['contentStyle', 'textAlign']}
        options={[
          { label: '左对齐', value: 'left' },
          { label: '居中', value: 'center' },
          { label: '右对齐', value: 'right' }
        ]}
      />

      <ProFormSelect
        label="字体大小"
        name={['contentStyle', 'fontSize']}
        options={[16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40].map((va) => ({ value: va, label: va }))}
      />

      <ProFormColorPicker label="名称颜色" name={['contentStyle', 'color']} />

      <ProFormColorPicker label="背景颜色" name={['contentStyle', 'backgroundColor']} />
    </CustomCard>
  )
}

Component.displayName = 'ContentStyle'

const ContentStyle = memo(Component)
export default ContentStyle
