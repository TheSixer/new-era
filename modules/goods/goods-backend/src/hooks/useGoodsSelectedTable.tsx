import { GoodsVO, api } from '@wmeimob/backend-api'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { Button } from 'antd'
import { MMProColumns } from 'MMProType'
import { useState, useImperativeHandle, useEffect } from 'react'
import { setClassifyValues } from '../pages/goodsClassify/const'
import useGoodClassifyColumn from './useGoodClassifyColumn'

interface IUseGoodsSelectedTableProps {
  value: string[]

  disabled?: boolean
  onChange?(goodsNo: string[]): void
}

export default function useGoodsSelectedTable(props: IUseGoodsSelectedTableProps, ref?: any) {
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
            const newGoods = data.filter((good) => preGoodNos.indexOf(good.goodsNo!) === -1)
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
