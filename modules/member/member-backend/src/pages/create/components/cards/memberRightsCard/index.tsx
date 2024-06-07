import { ProFormCheckbox, ProFormDependency, ProFormDigit, ProFormItem, ProFormList, ProFormRadio } from '@ant-design/pro-form'
import { EMemberRangeType } from '@wmeimob-modules/member-data/src/enums/EMemberRangeType'
import { useGoodsTableService } from '@wmeimob/backend-pages-shop/src/components/goods/assignGoods'
import ChooseGoodsDrawer from '@wmeimob/backend-pages-shop/src/components/goods/chooseGoodsDrawer'
import { Button, Card, Divider, FormInstance, Space, Typography } from 'antd'
import { NamePath } from 'antd/lib/form/interface'
import { FC, memo, useMemo, useState } from 'react'
import { rangeTypeOptions } from '../../../const'
import ProTable from '@ant-design/pro-table'

interface IMemberRightsCardProps {
  form: FormInstance<any>
  /**
   * 是否为有等级卡
   * @default true
   */
  upgrade?: boolean
}

const Component: FC<IMemberRightsCardProps> = ({ form, upgrade = true }) => {
  const [goodsDrawer, setGoodsDrawer] = useState<{ visible: boolean; goodsNos?: string[]; namePath?: NamePath }>({ visible: false, goodsNos: [] })

  return (
    <Card title="会员权益设置">
      <ProFormCheckbox label="权益类型" disabled required initialValue={true}>
        商品折扣
      </ProFormCheckbox>

      <Divider />

      <ProFormItem
        label="商品折扣"
        required
        extra={
          upgrade && (
            <div>
              <Typography.Text type="secondary">下一等级的折扣≤上一等级的折扣；</Typography.Text>
              <div />
              <Typography.Text type="secondary">支持两位小数，输入范围支持（0，10]</Typography.Text>
            </div>
          )
        }
      >
        <ProFormList name="levelList" copyIconProps={false} deleteIconProps={false} creatorButtonProps={false}>
          {(_meta, levelIndex, action) => {
            return (
              <ProFormList name="rightsList" copyIconProps={false} deleteIconProps={false} creatorButtonProps={false}>
                {(rightsListField) => {
                  return (
                    <div>
                      <ProFormItem>
                        <Space>
                          {upgrade && <span>等级{levelIndex + 1}</span>}
                          <ProFormDigit
                            name="discount"
                            placeholder="请输入非负数值"
                            fieldProps={{ min: 0.01, max: 10, precision: 2, addonAfter: '折' }}
                            noStyle
                          />
                        </Space>
                      </ProFormItem>

                      <ProFormRadio.Group name="rangeType" options={rangeTypeOptions} />

                      <ProFormDependency name={['rangeType']}>
                        {(data) => {
                          const { rangeType } = data
                          return (
                            rangeType === EMemberRangeType.PartGoods && (
                              <ProFormItem name="rightsGoodsList">
                                <RightsGoodsItem
                                  onAdd={(goodsNos) =>
                                    setGoodsDrawer({
                                      visible: true,
                                      goodsNos,
                                      namePath: ['levelList', _meta.key, 'rightsList', rightsListField.key, 'rightsGoodsList']
                                    })
                                  }
                                />
                              </ProFormItem>
                            )
                          )
                        }}
                      </ProFormDependency>
                    </div>
                  )
                }}
              </ProFormList>
            )
          }}
        </ProFormList>
      </ProFormItem>

      <ChooseGoodsDrawer
        visible={goodsDrawer.visible}
        value={goodsDrawer.goodsNos!}
        onClose={() => setGoodsDrawer(() => ({ visible: false, goodsNos: [] }))}
        onOk={(value) => {
          setGoodsDrawer((prev) => {
            form.setFieldValue(
              goodsDrawer.namePath!,
              value.map((goodsNo) => ({ goodsNo }))
            )
            return { ...prev, visible: false }
          })
        }}
      />
    </Card>
  )
}

const MemberRightsCard = memo(Component)
export default MemberRightsCard

const RightsGoodsItem = memo(
  ({ value, onChange, onAdd }: any) => {
    const deps = (value ?? []).map((item) => item.goodsNo || '').join(',')

    const goodsNo = useMemo(() => {
      return value?.map((item) => item.goodsNo) || []
    }, [deps])

    const { columns, dataSource, tableLoading } = useGoodsTableService({
      value: goodsNo,
      onChange: (goodsNos) => onChange(goodsNos.map((no) => ({ goodsNo: no })))
    })

    return (
      <Card
        extra={
          <Button type="primary" onClick={() => onAdd(goodsNo)}>
            选择商品
          </Button>
        }
      >
        <ProTable columns={columns} dataSource={dataSource} loading={tableLoading} rowKey="goodsNo" search={false} toolBarRender={false} />
      </Card>
    )
  },
  (pre, next) => {
    const preGoodsNo = (pre.value ?? []).map((item) => item.goodsNo || '').join(',')
    const nextGoodsNo = (next.value ?? []).map((item) => item.goodsNo || '').join(',')
    return preGoodsNo === nextGoodsNo
  }
)
