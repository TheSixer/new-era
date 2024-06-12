import { ProFormCascader, ProFormDependency, ProFormDigit, ProFormRadio, ProFormSelect } from '@ant-design/pro-form'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import { api } from '@wmeimob/backend-api/src/request'
import { EProductDataType } from '@wmeimob-modules/decoration-data/src/enums/EProductDataType'
import convertToTree from '@wmeimob/utils/src/tree/convertToTree'
import { Form } from 'antd'
import { FC, memo, useState } from 'react'
import AddImageButton from '../../../commModuleComponents/addImageButton'
import DragFormItem from '../../../commModuleComponents/dragFormItem'
import GoodsSelectModal from '../../../commModuleComponents/goodsSelectModal'
import TabContainer from '../../../commModuleComponents/tabContainer'
import { blockWrapperCol, IModuleEditFormProps } from '../../../moduleEditForm/const'
import { useModuleEditForm } from '../../../moduleEditForm/useModuleEditForm'
import ComponentStyle from '../../../styleSetting/componentStyle'
import { BasicModuleProductDTO, BasicModuleProductGood } from '@wmeimob-modules/decoration-data'

interface ISettingComponetProps extends IModuleEditFormProps<BasicModuleProductDTO> {}

const { List: FormList, Item: FormItem } = Form

const Component: FC<ISettingComponetProps> = (props) => {
  const [visible, setVisible] = useState(false)
  const { form, formProps } = useModuleEditForm(props)

  const renderContent = (
    <>
      <ProFormRadio.Group
        name="type"
        label="设置方式"
        options={[
          { label: '自动选择商品', value: EProductDataType.All },
          { label: '手动选择商品', value: EProductDataType.Partial }
        ]}
      />

      <ProFormDependency name={['type']}>
        {({ type }) =>
          type === EProductDataType.All ? (
            <>
              <ProFormCascader
                label="商品分类"
                name="classify"
                request={async () => {
                  const { data = [] } = await api['/admin/mall/classify/tree_GET']()
                  return convertToTree(data, { title: 'name', value: 'id' })
                }}
              />

              {/* 1:sort 2:实际销量倒序 3:实际销量正序 4:价格倒序 5:价格正序 6：上架时间倒序 7：上架时间正序 */}
              <ProFormSelect
                label="商品排序"
                name="sort"
                options={[
                  { label: '综合', value: 1 },
                  { label: '销量从高到低', value: 2 },
                  { label: '销量从低到高', value: 3 },
                  { label: '价格从高到低', value: 4 },
                  { label: '价格从低到高', value: 5 },
                  { label: '时间降序', value: 6 },
                  { label: '时间升序', value: 7 }
                ]}
                fieldProps={{ allowClear: false }}
              />

              <ProFormDigit label="商品数量" name="pageSize" fieldProps={{ min: 1, max: 50, precision: 0, placeholder: '显示商品数量' }} />
            </>
          ) : (
            <>
              <div style={{ display: type === EProductDataType.Partial ? 'block' : 'none' }}>
                <FormList name="goods">
                  {(fields, operation) => (
                    <DragFormItem
                      {...blockWrapperCol}
                      fields={fields}
                      operation={operation}
                      itemRender={(field) => (
                        <FormItem name={field.name}>
                          <GoodCard />
                        </FormItem>
                      )}
                    />
                  )}
                </FormList>
              </div>

              <FormItem labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} noStyle>
                <div className="textTip">商品图片尺寸建议为501px * 501px</div>
              </FormItem>

              <AddImageButton text="选择商品" onClick={() => setVisible(true)} />
            </>
          )
        }
      </ProFormDependency>
    </>
  )

  return (
    <Form {...formProps}>
      <TabContainer renderContent={renderContent} renderStyle={<ComponentStyle />} />
      <GoodsSelectModal
        data={props.data}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={(data) => {
          form.setFieldsValue(data)
          props.onChange({ ...props.data, ...data })
          setVisible(false)
        }}
      />
    </Form>
  )
}

Component.displayName = 'SettingComponet'

const SettingComponet = memo(Component)
export default SettingComponet

function GoodCard(props: { value?: BasicModuleProductGood }) {
  const {
    value = {
      coverImg: '',
      goodsName: ''
    }
  } = props || {}
  return (
    <div style={{ position: 'relative' }}>
      <img src={value.coverImg + getResizeUrl({ width: 40, height: 40 })} style={{ width: 40, height: 40, position: 'absolute', top: 0, left: 0 }} />
      <div style={{ paddingLeft: 48 }}>
        <div>{value.goodsName}</div>
      </div>
    </div>
  )
}
