import { FC, forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import { IAssignActivityGoodsProps } from './const'
import { Button, Card } from 'antd'
import ProTable from '@ant-design/pro-table'
import { MMProColumns } from 'MMProType'
import { GoodsVO } from '@wmeimob/backend-api'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '~/request'
import ChooseGoodsDrawer from '../chooseGoodsDrawer'
import useGoodClassifyColumn from '~/hooks/good/useGoodClassifyColumn'
import { setClassifyValues } from '~/pages/goodsManagement/goodsClassify/const'

export type AssignActivityGoodsRef = ReturnType<typeof useGoodsTableService>['imperativeHandle']

/**
 * 选择活动指定商品
 *
 * 支持多选与翻页多选
 * @param props
 * @returns
 */
const Component = forwardRef<AssignActivityGoodsRef, IAssignActivityGoodsProps>((props, ref) => {
  const { disabled } = props
  const [showModal, setShowModal] = useState(false)
  const { columns, dataSource, tableLoading } = useGoodsTableService(props, ref)

  return (
    <Card
      title="活动商品"
      {...props.cardProps}
      extra={
        !disabled && (
          <Button type="primary" onClick={() => setShowModal(true)}>
            选择商品
          </Button>
        )
      }
    >
      <ProTable
        columns={columns}
        dataSource={dataSource}
        loading={tableLoading}
        rowKey="goodsNo"
        search={false}
        toolBarRender={false}
        pagination={{ showSizeChanger: false }}
      />

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
})

Component.displayName = 'AssignActivityGoods'

const AssignActivityGoods = memo(Component)
export default AssignActivityGoods

function useGoodsTableService(props: IAssignActivityGoodsProps, ref: any) {
  const { value = [], onChange } = props
  const [classifyColumn] = useGoodClassifyColumn()

  const [dataSource, setDataSource] = useState<GoodsVO[]>([])
  const [tableLoading, setTableLoading] = useState(false)

  const imperativeHandle = {
    getDataSource: () => [...dataSource]
  }
  useImperativeHandle(ref, () => imperativeHandle, [dataSource])

  const columns: MMProColumns<GoodsVO>[] = [
    { title: '商品编号', dataIndex: 'goodsNo' },
    { title: '商品名称', dataIndex: 'goodsName' },
    classifyColumn,
    { title: '价格', dataIndex: 'salePrice', valueType: 'money' }
  ]

  if (!props.disabled) {
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

          const newGoodNOs = data.map((good) => good.goodsNo!)
          data.filter((good) => value.indexOf(good.goodsNo!) === -1)
          setDataSource((pre) => {
            // 如果有 用现成的
            const preGoods = pre.filter((pg) => newGoodNOs.indexOf(pg.goodsNo!) !== -1)
            // 过滤剩下的新增
            const preGoodNos = preGoods.map((good) => good.goodsNo!)
            let newGoods = data.filter((good) => preGoodNos.indexOf(good.goodsNo!) === -1)
            // 合并
            return [...newGoods, ...preGoods]
          })
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
    columns,
    imperativeHandle
  }
}
