import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { IScoreProps } from './const'
import { Button, Col, Row, Statistic } from 'antd'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { api } from '~/request'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { guid } from '@wmeimob/utils/src/guid'
import { ScoreFlowDto } from '@wmeimob/backend-api'
import { apiUrl } from '~/config'

const Component: FC<IScoreProps> = (props) => {
  const { detail, scoreInfo, onRefresh } = props

  const tooltip = (
    <p>
      <p>积分获取类型：</p>
      <p>下单赠送积分：订单完成后，根据积分奖励商品设置增加积分</p>
      <p>订单补偿：售后单中填写的返还积分</p>
      <p>下单抵扣：下单时使用积分抵扣的积分数量，扣减可用积分</p>
      <p>系统调整：后台管理系统调整增加/减少的积分数量</p>
    </p>
  )
  const [columns] = useState<ProColumns<ScoreFlowDto>[]>([
    { title: '积分来源', dataIndex: 'sourceText', tooltip },
    {
      title: '单据编号',
      dataIndex: 'relNo',
      render: (__, record) => {
        const res = (record.relNo === 'firstPurchase' ? '-' : record.relNo) || '-'
        return res
      }
    },
    // { title: '用户昵称', dataIndex: 'nickName' },
    // { title: '用户编号', dataIndex: 'memberNo' },
    { title: '变更时间', dataIndex: 'gmtCreated', valueType: 'dateTime' },
    { title: '操作人', dataIndex: 'createUser' },
    // { title: '备注', dataIndex: 'remark' },
    {
      title: '积分变化',
      dataIndex: 'score',
      render: (__, record) => {
        const res = record.score || 0
        return record.plusType !== undefined ? `+${res}` : `-${res}`
      }
    }
  ])

  const { request, exportLoading, exportTable } = useProTableRequest(
    (params) =>
      api['/admin/mall/score/query/{userId}_GET']({
        ...params,
        userId: detail.id
      }),
    {
      dataFormat: (list) => list.map((item) => ({ ...item, id: guid() })),
      exportUrl: `${apiUrl}/admin/mall/score/export/${detail.id}`
    }
  )

  return (
    <div className={styles.scoreStyle}>
      <Row style={{ maxWidth: 700 }}>
        <Col span={8}>
          <Statistic title='当前积分' value={scoreInfo?.availableScore || 0} />
        </Col>
        {/* <Col span={8}>
          <Statistic title="冻结积分" value={scoreInfo?.frozenScore || 0} />
        </Col> */}
        <Col span={8}>
          <Statistic title='累计积分' value={scoreInfo?.totalScore || 0} />
        </Col>
      </Row>

      <ProTable
        rowKey='id'
        columns={columns}
        cardProps={{ bodyStyle: { padding: 0 } }}
        request={request}
        search={false}
        toolbar={{
          actions: [
            <Button key='export' type='primary' loading={exportLoading} onClick={() => exportTable()}>
              导出明细
            </Button>
          ]
        }}
        onLoadingChange={(isLoading) => isLoading && onRefresh()}
      />
    </div>
  )
}

Component.displayName = 'Score'

const Score = memo(Component)
export default Score
