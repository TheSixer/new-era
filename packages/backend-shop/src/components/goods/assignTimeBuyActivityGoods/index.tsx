import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { IAssignTimeBuyActivityGoodsProps } from './const'
import { Button, Card, Space } from 'antd'
import ProTable from '@ant-design/pro-table'
import { MMProColumns } from 'MMProType'
import { MarketingActivityGoodsParam } from '@wmeimob/backend-api'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '~/request'
import useGoodClassifyColumn from '~/hooks/good/useGoodClassifyColumn'
import SetGoodModal from './setGoodModal'
import { setClassifyValues } from '~/pages/goodsManagement/goodsClassify/const'
import ChooseGoodsDrawer from '@wmeimob/backend-pages-shop/src/components/goods/chooseGoodsDrawer'

export type AssignTimeBuyActivityGoodsRef = {
  getDataSource: () => MarketingActivityGoodsParam[]
}

/**
 * 选择活动指定商品
 *
 * 支持多选与翻页多选
 * @param props
 * @returns
 */
const Component = forwardRef<AssignTimeBuyActivityGoodsRef, IAssignTimeBuyActivityGoodsProps>((props, ref) => {
  const { disabled } = props
  const [showModal, setShowModal] = useState(false)

  const { goodsNo, columns, dataSource, setDataSource, tableLoading, showSetGoodModal, setShowSetGoodModal, editGood, getData } = useGoodsTableService(props)

  const imperativeHandle = {
    getDataSource: () => [...dataSource]
  }

  useImperativeHandle(ref, () => imperativeHandle, [dataSource])

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

      {/* 选择商品 */}
      <ChooseGoodsDrawer
        visible={showModal}
        value={goodsNo}
        onClose={() => setShowModal(false)}
        onOk={async (values) => {
          setShowModal(false)
          await getData(values)
        }}
      />

      <SetGoodModal
        visible={showSetGoodModal}
        disabled={disabled}
        good={editGood}
        onVisibleChange={setShowSetGoodModal}
        onChange={(data) => {
          // console.log(data, 'skuList')
          setDataSource((pre) =>
            pre.map((it) => {
              return it.goodsNo === data.goodsNo ? data : it
            })
          )
        }}
      />
    </Card>
  )
})

Component.displayName = 'AssignTimeBuyActivityGoods'

const AssignTimeBuyActivityGoods = memo(Component)
export default AssignTimeBuyActivityGoods

function useGoodsTableService(props: IAssignTimeBuyActivityGoodsProps) {
  const { value = [], disabled } = props

  const [classifyColumn] = useGoodClassifyColumn()

  const [dataSource, setDataSource] = useState<MarketingActivityGoodsParam[]>([])

  const goodsNo = useMemo(() => dataSource.map((it) => it.goodsNo!), [dataSource])

  const [tableLoading, setTableLoading] = useState(false)

  const [showSetGoodModal, setShowSetGoodModal] = useState(false)
  const [editGood, setEditGood] = useState<MarketingActivityGoodsParam>()

  const columns: MMProColumns<MarketingActivityGoodsParam>[] = [
    { title: '商品编号', dataIndex: 'goodsNo' },
    { title: '商品名称', dataIndex: 'goodsName' },
    // classifyColumn,
    { title: '商品分类', dataIndex: 'categoryNames' },
    { title: '价格', dataIndex: 'price', valueType: 'money' },
    {
      title: '操作',
      dataIndex: '_ops',
      width: 96,
      render: (_value, record) => {
        return disabled ? (
          <Button
            type="primary"
            onClick={() => {
              setEditGood({ ...record })
              setShowSetGoodModal(true)
            }}
          >
            查看
          </Button>
        ) : (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setEditGood({ ...record })
                setShowSetGoodModal(true)
              }}
            >
              设置商品
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                setDataSource((pre) => pre.filter(({ goodsNo }) => goodsNo !== `${record.goodsNo}`))
              }}
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  async function getData(goodNos: string[]) {
    setTableLoading(true)
    try {
      const { data = [] } = await tableRequest({ current: 1, pageSize: 1000, goodNos } as any, {}, {})
      // value里面存在的。直接用value。没有的用新增的数据
      const tableGoods: MarketingActivityGoodsParam[] = []
      const valueGoodsNo = value.map((it) => it.goodsNo!)
      data.forEach((it) => {
        const { id, ...rest } = it
        const findIndex = valueGoodsNo.indexOf(it.goodsNo!)
        const { goodsName, price, ...cacheValue } = value[findIndex] || {}
        tableGoods.push({
          ...rest,
          categoryNames: [it.classifyName3, it.classifyName2, it.classifyName1].join(' '),
          groupBuyingNum: 0,
          price: it.salePrice,
          saleNum: it.actualSales,
          marketingActivitySkuParams: [],
          ...cacheValue
        })
      })

      setDataSource(tableGoods)
    } catch (error) {}
    setTableLoading(false)
  }

  useEffect(() => {
    if (value.length) {
      getData(value.map((it) => it.goodsNo!))
    }
  }, [])

  useEffect(() => {
    props.onChange(dataSource)
  }, [dataSource])

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
    goodsNo,
    dataSource,
    setDataSource,
    tableLoading,
    columns,
    getData,

    showSetGoodModal,
    setShowSetGoodModal,
    editGood
  }
}
