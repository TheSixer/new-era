import ProTable from '@ant-design/pro-table'
import { api } from '@wmeimob/backend-api'
import { GoodsVO } from '@wmeimob/backend-api/src/request/data-contracts'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { Button, Card, CardProps } from 'antd'
import { MMProColumns } from 'MMProType'
import { FC, memo, useEffect, useState } from 'react'
import useGoodClassifyColumn from '../../../hooks/good/useGoodClassifyColumn'
import { setClassifyValues } from '../../../pages/goodsManagement/goodsClassify/const'
import ChooseGoodsDrawer from '../chooseGoodsDrawer'

export interface IAssignGoodsProps {
  value?: string[]

  cardProps?: CardProps

  disabled?: boolean

  onChange?(value: string[]): void
}

/**
 * FIXME: 此文件是复制的backend-shop/src/components/goods中的文件。文件内容
 * 基本一致，后期可直接使用此组件替换
 */

/**
 * 选择指定商品
 *
 * 支持多选与翻页多选
 * @param props
 * @returns
 */
const Component: FC<IAssignGoodsProps> = (props) => {
  const { disabled } = props
  const [showModal, setShowModal] = useState(false)
  const { columns, dataSource, tableLoading } = useGoodsTableService(props)

  return (
    <Card
      {...props.cardProps}
      extra={
        !disabled && (
          <Button type="primary" onClick={() => setShowModal(true)}>
            选择商品
          </Button>
        )
      }
    >
      <ProTable columns={columns} dataSource={dataSource} loading={tableLoading} rowKey="goodsNo" search={false} toolBarRender={false} />

      <ChooseGoodsDrawer
        visible={showModal}
        value={props.value || []}
        onClose={() => setShowModal(false)}
        onOk={(values) => {
          props.onChange?.(values)
          setShowModal(false)
        }}
      />
    </Card>
  )
}

Component.displayName = 'AssignGoods'

const AssignGoods = memo(Component)
export default AssignGoods

export function useGoodsTableService(props: IAssignGoodsProps) {
  const { value, disabled, onChange } = props
  const [classifyColumn] = useGoodClassifyColumn()

  const [dataSource, setDataSource] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)

  const columns: MMProColumns<GoodsVO>[] = [
    { title: '商品编号', dataIndex: 'goodsNo' },
    { title: '商品名称', dataIndex: 'goodsName' },
    classifyColumn,
    { title: '价格', dataIndex: 'salePrice', valueType: 'money' }
  ]
  if (!disabled) {
    columns.push({
      title: '操作',
      dataIndex: '_ops',
      width: 96,
      render: (_value, record) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            const values = (value || []).filter((item) => item !== `${record.goodsNo}`)
            onChange?.(values)
          }}
        >
          删除
        </Button>
      )
    })
  }

  useEffect(() => {
    async function getData() {
      if (value?.length) {
        setTableLoading(true)
        try {
          const { data = [] } = await tableRequest({ current: 1, pageSize: 1000, goodNos: value } as any, {}, {})
          setDataSource(data)
        } catch (error) {}
        setTableLoading(false)
      }
    }
    if (value?.length) {
      getData()
    } else {
      setDataSource([])
    }
  }, [value])

  // 表格请求
  const { request: tableRequest } = useProTableRequest((params: any) => api['/admin/goods/listByNos_POST']({ ...params }), {
    dataFormat: (data) => {
      return data.map((it) => {
        return {
          ...it,
          classifys: setClassifyValues(it)
        }
      })
    }
  })

  return {
    dataSource,
    tableLoading,
    columns
  }
}
