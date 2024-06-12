import { FC, memo, useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { ETabKey, IDetailProps, ITabItem, MTabKey } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProCard from '@ant-design/pro-card'
import useQuery from '~/hooks/useQuery'
import BasicInfo from './components/basicInfo'
import Order from './components/order'
import Score from './components/score'
import { MemberInfoPageVo, ScoreGetOutputDto } from '@wmeimob/backend-api'
import { api } from '~/request'
import { systemConfig } from '~/config'
import { Card } from 'antd'
import MemberInfo from './components/memberInfo'
const { config } = systemConfig

const Component: FC<IDetailProps> = (props) => {
  const { tab, setTab, detail, scoreInfo, getScoreInfo } = useBasicService()

  const tabList: ITabItem[] = useMemo(
    () =>
      [
        {
          key: ETabKey.BasicInfo,
          tab: MTabKey[ETabKey.BasicInfo],
          show: !!detail,
          content: <BasicInfo detail={detail!} scoreInfo={scoreInfo} onRefresh={getScoreInfo} />
        },
        {
          key: ETabKey.Order,
          tab: MTabKey[ETabKey.Order],
          show: !!detail,
          content: <Order detail={detail!} />
        },
        {
          key: ETabKey.Score,
          tab: MTabKey[ETabKey.Score],
          show: config.enableScore,
          content: <Score detail={detail!} scoreInfo={scoreInfo} onRefresh={getScoreInfo} />
        },
        {
          key: ETabKey.Member,
          tab: MTabKey[ETabKey.Member],
          show: !!detail,
          content: <MemberInfo userId={detail?.id} />
        }
      ].filter(({ show }) => show !== false),
    [detail, scoreInfo]
  )

  return (
    <PageContainer className={styles.detailStyle}>
      <ProCard tabs={{ activeKey: tab, size: 'large', onChange: (key) => setTab(key as ETabKey) }}>
        {tabList.map((item) => (
          <ProCard.TabPane key={item.key} tab={item.tab}>
            {tab === item.key && <Card bordered={false}>{item.content}</Card>}
          </ProCard.TabPane>
        ))}
      </ProCard>
    </PageContainer>
  )
}

Component.displayName = 'Detail'

const Detail = memo(Component)
export default Detail

function useBasicService() {
  const queryParams = useQuery()

  const [tab, setTab] = useState(ETabKey.BasicInfo)
  const [detail, setDetail] = useState<MemberInfoPageVo>()
  const [scoreInfo, setScoreInfo] = useState<ScoreGetOutputDto>()

  useEffect(() => {
    getDetail()
    getScoreInfo()
  }, [])

  async function getDetail() {
    const id = queryParams.get('id')
    if (!id) return

    const { data } = await api['/admin/api/member/query/{id}_GET'](Number(id))
    setDetail(data)
  }

  async function getScoreInfo() {
    const id = queryParams.get('id')
    if (!id) return

    const { data } = await api['/admin/mall/score/get/{userId}_GET'](Number(id))
    setScoreInfo(data)
  }

  return {
    tab,
    setTab,
    detail,
    scoreInfo,
    getDetail,
    getScoreInfo
  }
}
