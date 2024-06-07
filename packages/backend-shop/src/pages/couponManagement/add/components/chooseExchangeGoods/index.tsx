import ProTable from '@ant-design/pro-table'
import { Button, Space, Typography } from 'antd'
import { FC, memo, useMemo, useState } from 'react'
import useGoodsSelectedTable from '@wmeimob-modules/goods-backend/src/hooks/useGoodsSelectedTable'
import ChooseGoodsDrawer from '@wmeimob/backend-pages-shop/src/components/goods/chooseGoodsDrawer'

interface IChooseExchangeGoodsProps {
  value?: string

  disabled?: boolean

  onChange?(data: string): void
}

const Component: FC<IChooseExchangeGoodsProps> = (props) => {
  const { value, disabled, onChange } = props

  const [showModal, setShowModal] = useState(false)

  const goosNos = useMemo(() => {
    return !value ? [] : (value || '').split(',')
  }, [value])

  const { columns, dataSource, tableLoading } = useGoodsSelectedTable({
    value: goosNos,
    disabled,
    onChange: (nos) => onChange?.(nos.join(','))
  })

  return (
    <div>
      {!value ? (
        <Button type="link" size="small" onClick={() => setShowModal(true)}>
          选择商品
        </Button>
      ) : (
        <div>
          <Space>
            <Typography.Text>已选择{goosNos.length}件商品</Typography.Text>
            {!disabled && (
              <Button type="link" size="small" onClick={() => setShowModal(true)}>
                修改
              </Button>
            )}
          </Space>

          <ProTable
            columns={columns}
            dataSource={dataSource}
            loading={tableLoading}
            rowKey="goodsNo"
            size="small"
            search={false}
            toolBarRender={false}
            pagination={{ showSizeChanger: false }}
          />
        </div>
      )}

      <ChooseGoodsDrawer
        visible={showModal}
        value={goosNos}
        onClose={() => setShowModal(false)}
        onOk={(values) => {
          onChange?.(values.join(','))
          setShowModal(false)
        }}
      />
    </div>
  )
}

const ChooseExchangeGoods = memo(Component)
export default ChooseExchangeGoods
