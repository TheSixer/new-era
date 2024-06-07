import { FC, memo, useState, useRef, useMemo } from 'react'
import { Button, Space, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import SelectAreaModal from '../selectAreaModal'
import { ICityTree, IFormItemAreaValues } from '../interface'
import { intgerProps, amountProps } from '../rules'
import { getUnlikeName } from '../utils'
import styles from './index.module.less'
import { ProFormDigit } from '@ant-design/pro-form'
import mmFormRule from '@wmeimob/form-rules'
import config from '../../../../../../config'
import { EValuationType } from '../../../../../../enums/freight/EValuationType'

const { goodConfig } = config.systemConfig

const valuationFirstName = {
  [EValuationType.AsQty]: '首件（个）',
  [EValuationType.AsWeight]: `首重(${goodConfig.weightUnit})`,
  [EValuationType.AsVolume]: `首体积(${goodConfig.volumeUnit})`
}

const valuationSecondName = {
  [EValuationType.AsQty]: '续件（个）',
  [EValuationType.AsWeight]: `续重(${goodConfig.weightUnit})`,
  [EValuationType.AsVolume]: `续体积(${goodConfig.volumeUnit})`
}

export interface IFormTableProps {
  value?: IFormItemAreaValues[]
  onChange?: (value?: IFormItemAreaValues[]) => void
  /** 类型 */
  valuationType: EValuationType
  /** 城市树形数据 */
  cityTree: ICityTree[]

  isAllArea: boolean
}

function bindTableKey(item: IFormItemAreaValues, index: number): IFormItemAreaValues & { __key__?: string } {
  return { ...item, __key__: item.id ? `id_${item.id}` : `key_${index}` }
}

/**
 * 区域邮费模板
 */
const Component: FC<IFormTableProps> = (props) => {
  const { onChange, valuationType, cityTree, isAllArea } = props
  // 选择地区弹窗显示
  const [visible, setVisible] = useState(false)
  // 显示数据
  const visibleRowData = useRef({ selected: [] as ICityTree[], index: -1 })

  const dataSource = useMemo(() => props.value?.map(bindTableKey), [props.value])

  const columns: ColumnsType<IFormItemAreaValues> = useMemo(() => {
    const columnsData = [
      {
        title: <span className={styles.required}>可配送区域</span>,
        dataIndex: 'text',
        width: '40%'
      },
      {
        title: <span className={styles.required}>{valuationFirstName[valuationType] || '-'}</span>,
        dataIndex: 'first',
        render(_va, _re, index: number) {
          return <ProFormDigit name={['expressTemplateAreas', index, 'first']} rules={mmFormRule.required} fieldProps={intgerProps as any} />
        }
      },
      {
        title: <span className={styles.required}>首费</span>,
        dataIndex: 'firstPrice',
        render(_va, _re, index: number) {
          return <ProFormDigit name={['expressTemplateAreas', index, 'firstPrice']} rules={mmFormRule.required} fieldProps={amountProps as any} />
        }
      },
      {
        title: <span className={styles.required}>{valuationSecondName[valuationType] || '-'}</span>,
        dataIndex: 'plus',
        render(_va, _re, index: number) {
          return <ProFormDigit name={['expressTemplateAreas', index, 'plus']} rules={mmFormRule.required} fieldProps={intgerProps as any} />
        }
      },
      {
        title: <span className={styles.required}>续费</span>,
        dataIndex: 'plusPrice',
        render(_va, _re, index: number) {
          return <ProFormDigit name={['expressTemplateAreas', index, 'plusPrice']} rules={mmFormRule.required} fieldProps={amountProps as any} />
        }
      }
    ]

    if (!isAllArea) {
      columnsData.push({
        title: <span className={styles.required}>操作</span>,
        dataIndex: '_oper',
        render(_va, record, index: number) {
          return (
            <Space>
              <Button size="small" type="link" onClick={() => handleModalOpen(record.area, index)}>
                编辑
              </Button>
              <Button size="small" type="link" onClick={() => onChange?.(dataSource?.filter((v, i) => i !== index))}>
                删除
              </Button>
            </Space>
          )
        }
      })
    }

    return columnsData
  }, [isAllArea, valuationType, dataSource])

  function handleModalOpen(selected: ICityTree[] = [], index = -1) {
    visibleRowData.current = { selected, index }
    setVisible(true)
  }

  function handleModalOk(selectedTree: ICityTree[]) {
    const value = dataSource ? dataSource.slice(0) : []
    const rowData = {
      area: selectedTree,
      text: getUnlikeName(cityTree, selectedTree).join(',')
    }
    const { index } = visibleRowData.current
    if (index >= 0) {
      value.splice(index, 1, { ...value[index], ...rowData })
    } else {
      value.push(rowData)
    }
    onChange?.(value)
    setVisible(false)
  }

  const summary = () =>
    !isAllArea && (
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} colSpan={6}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleModalOpen()}>
            新增区域及运费
          </Button>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    )

  return (
    <div className={styles.areaTable}>
      <Table dataSource={dataSource} locale={{ emptyText: '未配置配送区域及运费' }} columns={columns} summary={summary} rowKey="__key__" pagination={false} />

      <SelectAreaModal
        visible={visible}
        dataSource={cityTree}
        defaultSelected={visibleRowData.current.selected}
        onOk={handleModalOk}
        onCancel={() => setVisible(false)}
      />
    </div>
  )
}

const AreaTable = memo(Component)
export default AreaTable
