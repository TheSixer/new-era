import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { OGoodStatus } from '@wmeimob-modules/goods-data/src/enums/EGoodStatus'
import { api } from '@wmeimob/backend-api/src/request'
import { IntegralGoodsVO } from '@wmeimob/backend-api/src/request/data-contracts'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import convertToTree from '@wmeimob/utils/src/tree/convertToTree'
import { Button, message } from 'antd'
import { MMProColumns } from 'MMProType'
import { FC, memo, useState } from 'react'
import config from '../../config'
import { getClassifyValues, setClassifyValues } from '../goodsClassify/const'
import styles from './index.module.less'

export interface IGoodsListProps {
  service: ReturnType<typeof useService>

  /**
   * 点击新增
   */
  onAdd(): void
}

/**
 * 积分商品列表
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<IGoodsListProps> = (props) => {
  const { request, columns, actionRef } = props.service

  return (
    <PageContainer className={styles.goodsListStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={request}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom,
            <Button type="primary" key="out" onClick={props.onAdd}>
              新增积分商品
            </Button>
          ]
        }}
        scroll={{ x: 1200 }}
      />
    </PageContainer>
  )
}

const MMIntegralGoodsListPage = memo(Component)
export default MMIntegralGoodsListPage

interface IUseServiceProps<T = IntegralGoodsVO> {
  /**
   * 点击编辑
   */
  onEdit?(record: T, index: number): void
  /**
   * 点击复制
   * @param record
   * @param index
   */
  onCopy?(record: T, index: number): void
  /**
   * 点击详情
   * @param record
   * @param index
   */
  onDetail?(record: T, index: number): void
  /**
   * 点击库存管理
   */
  onStock?(record: T, index: number): void
}

export function useService(props: IUseServiceProps) {
  const [columns] = useState(() => {
    return [
      { title: '商品编号', dataIndex: 'goodsNo' },
      { title: '商品名称', dataIndex: 'goodsName' },
      {
        title: '商品分类',
        dataIndex: 'classifys',
        valueType: 'cascader',
        request: async () => {
          const { data = [] } = await api['/admin/mall/classify/tree_GET']({ goodsType: 1 })
          return convertToTree(data, { title: 'name', value: 'id' })
        }
      },
      {
        title: '价格',
        dataIndex: 'salePrice',
        valueType: 'money',
        width: 80,
        hideInSearch: true,
        hideInTable: !config.systemConfig.config.enableIntegralGoodsPrice
      },
      { title: '兑换积分', dataIndex: 'exchangeIntegral', hideInSearch: true, width: 80 },
      { title: '实际销量', dataIndex: 'actualSales', hideInSearch: true, width: 80 },
      { title: '库存', dataIndex: 'stock', hideInSearch: true, width: 80 },
      { title: '排序值', dataIndex: 'sort', hideInSearch: true, width: 80 },
      {
        title: '商品状态',
        dataIndex: 'shelved',
        valueType: 'select',
        fieldProps: () => ({ options: OGoodStatus }),
        width: 80,
        render: (_value, record) => {
          return <StatusSwitchColumn checked={record.shelved} onSwitch={(checked) => handleToggleGoodStaus(checked, record.goodsNo!)} />
        }
      },

      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        width: 220,
        fixed: 'right',
        render: (_, record, index) => (
          <OperationsColumns
            operations={[
              {
                id: 'stock',
                text: <a onClick={() => props.onStock?.(record, index)}>库存管理</a>
              },
              {
                id: 'custom',
                text: <a onClick={() => props.onDetail?.(record, index)}>详情</a>
              },
              {
                id: 'del',
                onClick: async () => {
                  await api['/admin/goods/{no}_DELETE'](record.goodsNo!)
                  actionRef.current?.reload()
                }
              },
              {
                id: 'copy',
                text: <a onClick={() => props.onCopy?.(record, index)}>复制</a>
              },
              {
                id: 'edit',
                show: !record.shelved,
                onClick: () => props.onEdit?.(record, index)
              }
            ]}
          />
        )
      }
    ] as MMProColumns<IntegralGoodsVO>[]
  })

  async function handleToggleGoodStaus(status: boolean, no: string) {
    try {
      await api['/admin/goods/shelved_PUT']({ no, status })
      actionRef.current?.reload()
      message.success('切换成功')
    } catch (error) {}
  }

  const { request, actionRef } = useProTableRequest(async (params: any) => api['/admin/goods_GET'](params), {
    paramsFormat(params) {
      let { classifys, ...rest } = params
      //   处理商品分类
      if (classifys?.length) {
        const classify = getClassifyValues(classifys)
        rest = { ...rest, ...classify }
      }
      rest.goodsType = 1
      rest.selectSortType = 10
      return rest
    },
    dataFormat: (data) => {
      return data.map((it) => ({
        ...it,
        classifys: setClassifyValues(it)
      }))
    }
  })

  return {
    actionRef,

    /** 表格请求 */
    request,

    columns,

    handleToggleGoodStaus
  }
}
