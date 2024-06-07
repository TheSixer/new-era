import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'
import { Button, Drawer, DrawerProps } from 'antd'
import ProTable from '@ant-design/pro-table'
import { MMProColumns } from 'MMProType'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'

interface ILivePlayerChooseModalProps extends Omit<DrawerProps, 'onOk'> {
  data: any[]

  onOk(data: any[]): void
}

const Component: FC<ILivePlayerChooseModalProps> = (props) => {
  const { onOk } = props
  const [value, setValue] = useState<any[]>([])
  const selectedRowKeys = useMemo(() => value.map((item) => item.id!), [value])

  useEffect(() => {
    if (props.visible) {
      setValue(props.data)
    }
  }, [props])

  const [columns] = useState<MMProColumns<any>[]>([{ title: '直播间组名', dataIndex: 'scheduleGroupName' }])
  const dataSourceRef = useRef<any[]>([])
  const { request, actionRef } = useProTableRequest(
    () =>
      Promise.resolve({
        code: 0,
        msg: 'OK',
        data: {
          pageNum: 1,
          total: 2,
          pages: 1,
          list: [
            { id: 38, scheduleGroupNo: 'LSSG432250079674469891', scheduleGroupName: '111', viewNum: 0, pageNum: 0, pageSize: 15 },
            { id: 37, scheduleGroupNo: 'LSSG2241829531530010', scheduleGroupName: '成都市直播组111', viewNum: 0, pageNum: 0, pageSize: 15 }
          ]
        }
      }),
    {
      dataFormat: (data) => {
        dataSourceRef.current = data
        return data
      }
    }
  )

  return (
    <Drawer title="选择直播间组" {...props} width={768} className={styles.livePlayerChooseModalStyle}>
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
            <Button type="primary" key="export" onClick={() => onOk?.(value)}>
              确定
            </Button>
          ]
        }}
        rowSelection={{
          selectedRowKeys,
          onChange(_ks, rows: any[]) {
            const currentRowIds = dataSourceRef.current.map((item) => item.id!)
            const otherKeys = selectedRowKeys.filter((key) => currentRowIds.indexOf(key) === -1)
            const otherValues = value.filter((item) => otherKeys.indexOf(item.id!) !== -1)

            const cValues = otherValues.concat(rows)
            setValue(cValues)
          }
        }}
        size="small"
        toolBarRender={false}
      />
    </Drawer>
  )
}

Component.displayName = 'LivePlayerChooseModal'

const LivePlayerChooseModal = memo(Component)
export default LivePlayerChooseModal
