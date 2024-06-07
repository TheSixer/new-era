import { FC, memo, useEffect, useState } from 'react'
import { IAssignGoodsProps } from './const'
import { Button, Card } from 'antd'
import ProTable from '@ant-design/pro-table'
import { MMProColumns } from 'MMProType'
import { GoodsVO } from '@wmeimob/backend-api'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '~/request'
import ChooseGoodsDrawer from '../chooseGoodsDrawer'
import useGoodClassifyColumn from '~/hooks/good/useGoodClassifyColumn'
import { setClassifyValues } from '~/pages/goodsManagement/goodsClassify/const'

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
          props.onChange(values)
          setShowModal(false)
        }}
      />
    </Card>
  )
}

Component.displayName = 'AssignGoods'

const AssignGoods = memo(Component)
export default AssignGoods

function useGoodsTableService(props: IAssignGoodsProps) {
  const { value = [], disabled, onChange } = props
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
            const values = value.filter((item) => item !== `${record.goodsNo}`)
            onChange(values)
          }}
        >
          删除
        </Button>
      )
    })
  }

  useEffect(() => {
    async function getData() {
      if (value.length) {
        setTableLoading(true)
        try {
          const { data = [] } = await tableRequest({ current: 1, pageSize: 1000, goodNos: value } as any, {}, {})
          setDataSource(data)
        } catch (error) {}
        setTableLoading(false)
      }
    }
    if (value.length) {
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
