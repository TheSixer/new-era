import ProFormItem from '@ant-design/pro-form/lib/components/FormItem'
import { FC, memo } from 'react'
import ButtonRadioWithTextItem from '../../../../commModuleComponents/buttonRadioWithTextItem'
import styles from './index.module.less'

interface IContentStyleProps {}

const itemProps = {
  labelCol: { span: 5 },
  colon: false
}

const margins = [
  { label: '无', value: 0 },
  { label: '小', value: 10 },
  { label: '中', value: 15 },
  { label: '大', value: 30 }
]

const radius = [
  { label: '直角', value: 0 },
  { label: '圆角', value: 8 }
]

const getName = (name: string) => ['contentStyle', name]

const Component: FC<IContentStyleProps> = (props) => {
  return (
    <div className={styles.componentStyleStyle}>
      <div className={styles.customCard}>
        <div className={styles.card_head}>内容样式</div>

        <ProFormItem {...itemProps} label="边角样式" name={getName('borderRadius')}>
          <ButtonRadioWithTextItem options={radius} />
        </ProFormItem>

        <ProFormItem {...itemProps} label="图片间距" name={getName('imageMargin')}>
          <ButtonRadioWithTextItem options={margins} />
        </ProFormItem>
      </div>
    </div>
  )
}

const ContentStyle = memo(Component)
export default ContentStyle
