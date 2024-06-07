import MaterialModal from '@wmeimob/backend-pages/src/components/material'
import { EJumpLinkMode } from '@wmeimob-modules/decoration-data/src/enums/EJumpLinkMode'
import { Form, Radio } from 'antd'
import { FormListFieldData } from 'antd/lib/form/FormList'
import { NamePath } from 'antd/lib/form/interface'
import { FC, memo, ReactNode, useState } from 'react'
import { blockWrapperCol, formCol, imageLinkRule } from '../../moduleEditForm/const'
import { getDefaultImageLink } from '../../utils'
import AddImageButton from '../addImageButton'
import DragFormItem from '../dragFormItem'
import JumpModeSelect from '../jumpModeSelect'
import MaterialItem from '../materialItem'

export interface IImageFormListProps {
  /**
   * 表单项绑定的name
   * @default data
   */
  name?: NamePath
  /** 最多可添加数量 */
  max?: number
  /** 添加按钮文本 */
  addButtonText?: string
  /** 图片尺寸 */
  measure?: number | [number, number]
  /** 自定义如何渲染某一项 */
  itemRender?: (fields: FormListFieldData, index: number) => ReactNode
}

const { List: FormList, Item: FormItem } = Form
const { Group: RadioGroup, Button: RadioButton } = Radio

const Component: FC<IImageFormListProps> = (props) => {
  // 通过解构定义defaultProps
  const { max = 10, name = 'data', addButtonText, measure } = props
  const [visible, setVisible] = useState(false)

  return (
    <FormList name={name}>
      {(fields, operation) => (
        <>
          <DragFormItem
            {...blockWrapperCol}
            fields={fields}
            operation={operation}
            // itemRender={(field) => <EditNavCard showName={false} index={field.name} total={fields.length} onMove={move} onRemove={remove} />}
            itemRender={
              props.itemRender ||
              ((field) => (
                <>
                  <FormItem {...formCol} label="选择图片" name={[field.name, 'url']} rules={imageLinkRule}>
                    <MaterialItem measure={measure} />
                  </FormItem>
                  <FormItem {...formCol} label="跳转模式" name={[field.name, 'jumpMode']}>
                    <RadioGroup>
                      <RadioButton value={EJumpLinkMode.Link}>单链接</RadioButton>
                      <RadioButton value={EJumpLinkMode.HotZone}>热区</RadioButton>
                    </RadioGroup>
                  </FormItem>
                  <FormItem {...formCol} label="跳转链接" name={[field.name]}>
                    <JumpModeSelect />
                  </FormItem>
                </>
              ))
            }
          />
          <AddImageButton text={addButtonText} current={fields.length} max={max} onClick={() => setVisible(true)} />
          <MaterialModal
            visible={visible}
            max={1}
            onOk={([url]) => {
              operation.add({ ...getDefaultImageLink(), url })
              setVisible(false)
            }}
            onCancel={() => setVisible(false)}
          />
        </>
      )}
    </FormList>
  )
}

Component.displayName = 'ImageFormList'

const ImageFormList = memo(Component)
export default ImageFormList
