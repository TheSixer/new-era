import ProTable from '@ant-design/pro-table'
import useGoodClassifyColumn from '@wmeimob-modules/goods-backend/src/hooks/useGoodClassifyColumn'
import { api, GoodsVO, MarketingActivityGoodsParam } from '@wmeimob/backend-api'
import ChooseGoodsDrawer from '@wmeimob/backend-pages-shop/src/components/goods/chooseGoodsDrawer'
import { setClassifyValues } from '@wmeimob/backend-pages-shop/src/pages/goodsManagement/goodsClassify/const'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import convertToTree from '@wmeimob/utils/src/tree/convertToTree'
import { Button, Card } from 'antd'
import { MMProColumns } from 'MMProType'
import { FC, memo, useMemo, useState, useEffect } from 'react'
import { IAssignActivityGoodsProps } from './const'

/**
 * 选择活动指定商品
 *
 * 支持多选与翻页多选
 * @param props
 * @returns
 */
const Component: FC<IAssignActivityGoodsProps> = (props) => {
  const { disabled, goodsDrawerProps } = props
  const [showModal, setShowModal] = useState(false)
  const { columns, tableLoading, handleGoodsDrawerOk } = useGoodsTableService(props)

  const selectedGoodsNos = useMemo(() => (props.value ? props.value.map(({ goodsNo }) => goodsNo!) : []), [props.value])

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
        dataSource={props.value}
        loading={tableLoading}
        rowKey="goodsNo"
        search={false}
        toolBarRender={false}
        pagination={{ showSizeChanger: false }}
      />

      <ChooseGoodsDrawer
        {...goodsDrawerProps}
        visible={showModal}
        value={selectedGoodsNos}
        onClose={() => setShowModal(false)}
        onOk={async (values) => {
          await handleGoodsDrawerOk(values)
          setShowModal(false)
        }}
      />
    </Card>
  )
}

Component.displayName = 'AssignActivityGoods'

const AssignActivityGoods = memo(Component)
export default AssignActivityGoods

function useGoodsTableService(props: IAssignActivityGoodsProps) {
  const { value = [], onChange } = props

  const [tableLoading, setTableLoading] = useState(false)

  const columns: MMProColumns<GoodsVO>[] = [
    { title: '商品编号', dataIndex: 'goodsNo' },
    { title: '商品名称', dataIndex: 'goodsName' },
    { title: '商品分类', dataIndex: 'categoryNames' },
    { title: '价格', dataIndex: 'salePrice', valueType: 'money' },
    ...(props.concatColumns?.({ remove: handleRemove }) || [])
  ]

  useEffect(() => {
    if (props.value?.length) {
      getData(props.value.map(({ goodsNo }) => goodsNo!)).then((list) => {
        props.onChange?.(list)
      })
    }
  }, [])

  async function getData(nos: string[]) {
    if (!nos?.length) {
      return [] // 待确认
    }

    setTableLoading(true)
    try {
      const { data = [] } = await tableRequest({ current: 1, pageSize: 1000, goodNos: nos } as any, {}, {})

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

      setTableLoading(false)

      return tableGoods
    } catch (error) {
      setTableLoading(false)
    }

    return []
  }

  const [handleGoodsDrawerOk] = useSuperLock(async (nos) => {
    const list = await getData(nos)
    props.onChange?.(list)
  })

  function handleRemove(goodsNo: string) {
    const values = value.filter((item) => item.goodsNo !== `${goodsNo}`)
    onChange?.(values)
  }

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
    // dataSource,
    tableLoading,
    columns,
    // imperativeHandle,
    handleGoodsDrawerOk
  }
}
