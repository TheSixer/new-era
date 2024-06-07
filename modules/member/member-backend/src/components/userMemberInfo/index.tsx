import { EMemberCardType, MMemberCardType } from '@wmeimob-modules/member-data/src/enums/EMemberCardType'
import { MMemberLevelType } from '@wmeimob-modules/member-data/src/enums/EMemberLevelType'
import { EMemberRangeType } from '@wmeimob-modules/member-data/src/enums/EMemberRangeType'
import { MMemberRightsType } from '@wmeimob-modules/member-data/src/enums/EMemberRightsType'
import { api, MemCardDto, MemCardLevelDto } from '@wmeimob/backend-api'
import { mmTimes } from '@wmeimob/utils/src/mmCurrency'
import { Descriptions, Empty, Space } from 'antd'
import { FC, memo, useEffect, useState } from 'react'

interface IUserMemberInfoProps {
  service: ReturnType<typeof useService>
}

const Component: FC<IUserMemberInfoProps> = (props) => {
  const { singleLevelDetail, multipleLevelDetail } = props.service

  const renderBasic = (detail: MemCardDto) => (
    <>
      <Descriptions.Item label="会员卡名称">{detail.name}</Descriptions.Item>
      <Descriptions.Item label="使用状态">{detail.enabled ? '开启' : '关闭'}</Descriptions.Item>
      <Descriptions.Item label="卡类型">{MMemberCardType[detail.type!]}</Descriptions.Item>
      <Descriptions.Item label="会员卡费">{detail.type === EMemberCardType.NeedPay ? `${detail.price}元` : '-'}</Descriptions.Item>
    </>
  )

  const renderMultipleLevel = () => {
    const currentLevel = multipleLevelDetail!.levelList?.[0] || {}

    return (
      <>
        <Descriptions.Item label="等级级别">{currentLevel.level}</Descriptions.Item>
        <Descriptions.Item label="等级条件">
          <Space>
            <span>{currentLevel.valueStart}</span>
            <span>{`<= ${MMemberLevelType[multipleLevelDetail!.levelType!]} <`}</span>
            <span>{currentLevel.valueEnd}</span>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="等级名称" span={2}>
          {currentLevel.levelName}
        </Descriptions.Item>
        {renderRights(currentLevel, true)}
      </>
    )
  }

  /** 会员权益 */
  const renderRights = (level: MemCardLevelDto, isMultipleLevel = false) => (
    <Descriptions.Item label="会员权益">
      {level.rightsList?.map((rights, index) => (
        <Space key={index}>
          <span>{MMemberRightsType[rights.rightsType!]}，</span>
          {isMultipleLevel && <span>等级{level?.level}，</span>}
          <span>{mmTimes(rights.discount, 10, { precision: 3 })}折，</span>
          <span>
            {
              {
                [EMemberRangeType.AllGoods]: '适用全部商品',
                [EMemberRangeType.PartGoods]: '适用指定商品'
              }[rights.rangeType!]
            }
          </span>
        </Space>
      ))}
    </Descriptions.Item>
  )

  if (!multipleLevelDetail && !singleLevelDetail) {
    return <Empty />
  }

  return (
    <Space direction="vertical" size={20}>
      {/* 多等级 */}
      {multipleLevelDetail && (
        <>
          <Descriptions title="多等级会员" column={4} bordered>
            {renderBasic(multipleLevelDetail)}
            {renderMultipleLevel()}
          </Descriptions>

          <Descriptions title="等级描述" column={1}>
            <Descriptions.Item>
              <div dangerouslySetInnerHTML={{ __html: multipleLevelDetail!.levelList?.[0]?.richTextContent || '' }} />
            </Descriptions.Item>
          </Descriptions>
        </>
      )}

      {/* 单等级 */}
      {singleLevelDetail && (
        <Descriptions title="单等级会员" column={4} bordered>
          {renderBasic(singleLevelDetail)}
          {renderRights(singleLevelDetail.levelList?.[0] || {})}
        </Descriptions>
      )}
    </Space>
  )
}

const UserMemberInfo = memo(Component)
export default UserMemberInfo

interface IUSerServiceOptions {
  userId: number
}

export function useService(options: IUSerServiceOptions) {
  const [singleLevelDetail, setSingleLevelDetail] = useState<MemCardDto>()
  const [multipleLevelDetail, setMultipleLevelDetail] = useState<MemCardDto>()

  useEffect(() => {
    getMemberCards()
  }, [])

  const getMemberCards = async () => {
    const { data } = await api['/admin/mall/memberCard/member/{userId}_GET']({ userId: options.userId })

    data?.list?.forEach((item) => {
      item.upgrade ? setMultipleLevelDetail(item) : setSingleLevelDetail(item)
    })
  }

  return {
    singleLevelDetail,
    multipleLevelDetail
  }
}
