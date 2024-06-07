import { Form } from 'antd'
import { FC, memo, PropsWithChildren } from 'react'
import ButtonRadioWithTextItem from '../../commModuleComponents/buttonRadioWithTextItem'
import CustomCard from '../../commModuleComponents/customCard'
import { customCardFormItemProps } from '../../const'

interface IComponentStyleProps {}

const margins = [
  { label: '无', value: 0 },
  { label: '小', value: 10 },
  { label: '中', value: 15 },
  { label: '大', value: 30 }
]

const Component: FC<PropsWithChildren<IComponentStyleProps>> = (props) => {
  const getName = (name: string) => ['componentStyle', name]

  return (
    <CustomCard title="组件样式">
      <Form.Item label="页边距" name={getName('pagePadding')} {...customCardFormItemProps}>
        <ButtonRadioWithTextItem options={margins} />
      </Form.Item>

      <Form.Item label="上边距" name={getName('paddingTop')} {...customCardFormItemProps}>
        <ButtonRadioWithTextItem options={margins} />
      </Form.Item>

      <Form.Item label="下边距" name={getName('paddingBottom')} {...customCardFormItemProps}>
        <ButtonRadioWithTextItem options={margins} />
      </Form.Item>

      {props.children}
    </CustomCard>
  )
}

Component.displayName = 'ComponentStyle'

const ComponentStyle = memo(Component)
export default ComponentStyle
