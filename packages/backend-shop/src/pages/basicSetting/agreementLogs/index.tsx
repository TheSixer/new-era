import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { Card, Drawer, Tabs } from 'antd'
import { FC, memo, useState } from 'react'
import { api, UserAgreementRecordDto, UserAgreeRecordDto } from '@wmeimob/backend-api'
import styles from './index.module.less'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import { history } from 'umi'

interface IAgreementLogsProps {}

const Component: FC<IAgreementLogsProps> = (props) => {
  const agreementUpdateService = useAgreementUpdateService()

  const service2 = useUserAgreementLogsService()

  return (
    <PageContainer className={styles.agreementLogsStyle}>
      <Card>
        <Tabs>
          <Tabs.TabPane tab="更新记录" key="logs">
            <ProTable
              actionRef={agreementUpdateService.actionRef}
              rowKey="id"
              columns={agreementUpdateService.columns}
              request={agreementUpdateService.request}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="用户同意记录" key="logs2">
            <ProTable actionRef={service2.actionRef} rowKey="id" columns={service2.columns} request={service2.request} />
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <Drawer
        visible={agreementUpdateService.showDetail}
        onClose={() => {
          agreementUpdateService.setShowDetail(false)
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: agreementUpdateService.detail.richTextContent || '' }} />
      </Drawer>
    </PageContainer>
  )
}

const AgreementLogs = memo(Component)
export default AgreementLogs

function useAgreementUpdateService() {
  const { type }: any = history.location?.query || {}
  const [detail, setDetail] = useState<UserAgreementRecordDto>({})
  const [showDetail, setShowDetail] = useState(false)
  const [columns] = useState<ProColumns<UserAgreementRecordDto>[]>([
    { title: '协议编号', dataIndex: 'agreementNo' },
    { title: '更新时间', dataIndex: 'gmtCreated', valueType: 'dateRange', render: (_, { gmtCreated }) => gmtCreated },
    { title: '操作人名称', dataIndex: 'createUser' },
    { title: '联系电话', dataIndex: 'mobile' },
    {
      title: '操作',
      dataIndex: '详情',
      valueType: 'option',
      width: 80,
      render: (_, record) => {
        return (
          <OperationsColumns
            operations={[
              {
                id: 'detail',
                text: (
                  <a
                    onClick={() => {
                      setShowDetail(true)
                      getDetail(record.id)
                    }}
                  >
                    详情
                  </a>
                )
              }
            ]}
          />
        )
      }
    }
  ])

  const { request, actionRef } = useProTableRequest((params) => api['/admin/userAgreement/userAgreementRecord_GET'](params), {
    paramsFormat(params) {
      const { gmtCreated, ...rest } = params
      if (gmtCreated) {
        rest.beginTime = `${gmtCreated[0]} 00:00:00`
        rest.endTime = `${gmtCreated[1]} 23:59:59`
      }
      rest.type = type
      return rest
    }
  })

  async function getDetail(id) {
    const { data = {} } = await api['/admin/userAgreement/userAgreementRecord/{id}_GET'](id)
    setDetail(data)
  }

  return {
    request,
    actionRef,
    columns,
    showDetail,
    setShowDetail,
    detail
  }
}

function useUserAgreementLogsService() {
  const { type }: any = history.location?.query || {}
  const [columns] = useState<ProColumns<UserAgreeRecordDto>[]>([
    { title: '协议编号', dataIndex: 'agreementNo' },
    { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateRange', render: (_, { updateTime }) => updateTime },
    { title: '用户id', dataIndex: 'userId', fieldProps:{controls:false} },
    { title: '同意时间', dataIndex: 'agreeTime', valueType: 'dateRange', render: (_, { agreeTime }) => agreeTime }
  ])

  const { request, actionRef } = useProTableRequest((params) => api['/admin/userAgreement/userAgreeRecord_GET'](params), {
    paramsFormat(params) {
      const { updateTime, agreeTime, ...rest } = params
      if (updateTime) {
        rest.updateBeginTime = `${updateTime[0]} 00:00:00`
        rest.updateEndTime = `${updateTime[1]} 23:59:59`
      }
      if (agreeTime) {
        rest.agreeBeginTime = `${agreeTime[0]} 00:00:00`
        rest.agreeEndTime = `${agreeTime[1]} 23:59:59`
      }
      rest.type = type
      return rest
    }
  })

  return {
    request,
    actionRef,
    columns
  }
}
