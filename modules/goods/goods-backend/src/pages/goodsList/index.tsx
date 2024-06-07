import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { OGoodStatus } from '@wmeimob-modules/goods-data/src/enums/EGoodStatus'
import { api } from '@wmeimob/backend-api/src/request'
import { GoodsVO } from '@wmeimob/backend-api/src/request/data-contracts'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import { Button, message, Modal, Typography } from 'antd'
import { MMProColumns } from 'MMProType'
import { FC, memo, useMemo, useState } from 'react'
import config from '../../config'
import useGood from '../../hooks/useGood'
import styles from './index.module.less'

interface IGoodsListProps {
  service: ReturnType<typeof useService>

  open: boolean
  good: GoodsVO
  /**
   * 页面根路径
   */
  rootUrl: string
  /**
   * 关闭
   */
  setOpen: any

  /**
   * 点击新增
   */
  onAdd(): void

}

const Component: FC<IGoodsListProps> = (props) => {
  const { service, open, good, setOpen, rootUrl } = props

  const links = useMemo(() => {
    return [
      {
        link: `/pages/goods/goodDetail/index?goodsNo=${good.goodsNo}&liveId=`,
        name: '小程序链接:'
      },
      {
        link: `${rootUrl}/#/pages/goods/goodDetail/index?goodsNo=${good.goodsNo}&liveId=`,
        name: 'H5链接:'
      }
    ]
  }, [good])
  return (
    <PageContainer className={styles.goodsListStyle}>
      <ProTable
        actionRef={service.actionRef}
        rowKey='id'
        columns={service.columns}
        request={service.request}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom,
            <Button type='primary' key='out' onClick={props.onAdd}>
              新增
            </Button>
          ]
        }}
        scroll={{ x: 1200 }}
      />
      <Modal
        visible={open}
        width={900}
        title='页面链接'
        onCancel={() => setOpen(false)}
        footer={[]}
      >
        {
          links.map((item, index) => (
            <Typography.Paragraph key={index}
                                  copyable={{ text: item.link }}>{item.name} {item.link}</Typography.Paragraph>
          ))
        }
      </Modal>
    </PageContainer>
  )
}

const MMGoodsListPage = memo(Component)
export default MMGoodsListPage

interface IUseServiceProps<T = GoodsVO> {
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

  /**
   * 复制链接
   */
  onCopyLink?(record: T, index: number): void
}

export function useService(props: IUseServiceProps) {
  const { request, column, actionRef } = useGood()

  const [columns] = useState(() => {
    return [
      { title: '商品编号', dataIndex: 'goodsNo' },
      { title: '商品名称', dataIndex: 'goodsName' },
      column.classifyColumn,
      { title: '价格', dataIndex: 'salePrice', hideInSearch: true, valueType: 'money', width: 80 },
      { title: '实际销量', dataIndex: 'actualSales', hideInSearch: true, width: 80 },
      { title: '库存', dataIndex: 'stock', hideInSearch: true, width: 80 },
      {
        title: '使用积分',
        dataIndex: 'useScore',
        width: 80,
        hideInSearch: true,
        hideInTable: !config.systemConfig.config.enableScore,
        render: (_value, record) => {
          return (
            <StatusSwitchColumn
              checked={record.useScore}
              onSwitch={async (status) => {
                try {
                  await api['/admin/goods/useScore_PUT']({ no: record.goodsNo!, status })
                  actionRef.current?.reload()
                  message.success('切换成功')
                } catch (error) {
                }
              }}
            />
          )
        }
      },
      {
        title: '商品状态',
        dataIndex: 'shelved',
        valueType: 'select',
        fieldProps: () => ({ options: OGoodStatus }),
        width: 80,
        render: (_, record) => {
          return <StatusSwitchColumn checked={record.shelved}
                                     onSwitch={(checked) => handleToggleGoodStatus(checked, record.goodsNo!)} />
        }
      },
      {
        title: '前台可见',
        dataIndex: 'frontShow',
        width: 80,
        hideInSearch: true,
        render: (_, record) => {
          return <StatusSwitchColumn checked={record.frontShow}
                                     onSwitch={(checked) => handleToggleFrontShow(checked, record.goodsNo!)} />
        }
      },
      { title: '排序值', dataIndex: 'sort', hideInSearch: true, width: 80 },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        width: 300,
        fixed: 'right',
        render: (_, record, index) => (
          <OperationsColumns
            operations={[
              {
                id: 'copyLink',
                text: <a onClick={() => props.onCopyLink?.(record, index)}>复制链接</a>
              },
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
    ] as MMProColumns<GoodsVO>[]
  })

  async function handleToggleGoodStatus(status: boolean, no: string) {
    try {
      await api['/admin/goods/shelved_PUT']({ no, status })
      actionRef.current?.reload()
      message.success('切换成功')
    } catch (error) {
    }
  }

  async function handleToggleFrontShow(status: boolean, no: string) {
    try {
      await api['/admin/activity/conflict/{goodsNo}_GET'](no)
      await api['/admin/goods/frontShow_PUT']({ no, status })
      actionRef.current?.reload()
      message.success('切换成功')
    } catch (error) {
    }
  }

  return {
    actionRef,
    columns,
    request,
    open
  }
}
