import { MMemberLevelType } from '@wmeimob-modules/member-data/src/enums/EMemberLevelType'
import { MemCardDto } from '@wmeimob/backend-api'
import { EMemberCardType, MMemberCardType } from '@wmeimob-modules/member-data/src/enums/EMemberCardType'
import { Card, Descriptions, Divider, Image, Space } from 'antd'
import { EMemberRangeType } from '@wmeimob-modules/member-data/src/enums/EMemberRangeType'
import AssignGoods from '@wmeimob/backend-pages-shop/src/components/goods/assignGoods'
import { FC, memo } from 'react'
import { rangeTypeOptions } from '../../const'
import styles from './index.module.less'

interface IMutiLevelDetailProps {
  data: MemCardDto
}

const { Item } = Descriptions

const Component: FC<IMutiLevelDetailProps> = (props) => {
  const { data = {} } = props

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="基本信息设置">
        <Descriptions column={1} labelStyle={{ width: 120 }} contentStyle={{ maxWidth: '550px' }}>
          <Item label="会员卡名称">{data.name}</Item>
          <Item label="会员卡图标">{!!data.icon && <Image width={100} src={data.icon} />}</Item>
          <Item label="会员卡背景图">{!!data.bgUrl && <Image width={100} src={data.bgUrl} />}</Item>
          <Item label="使用状态">{!data.enabled ? '关闭' : '开启'}</Item>
        </Descriptions>
      </Card>

      <Card title="会员卡设置">
        <Descriptions column={1} labelStyle={{ width: 120 }} contentStyle={{ maxWidth: '550px' }}>
          {/* 目前只做自动发放 */}
          {/* <Item label="领卡方式">{MMemberCardType[data.acquisitionType!]}</Item> */}
          <Item label="卡类型">{MMemberCardType[data.type!]}</Item>

          {data.type === EMemberCardType.NeedPay && <Item label="会员卡费">{data.price}元</Item>}
        </Descriptions>
      </Card>

      <Card title="会员条件设置">
        <Descriptions column={1} labelStyle={{ width: 120 }} contentStyle={{ maxWidth: '400px' }}>
          {/* <Item label="等级条件">{MMemberLevelType[data.levelType!]}</Item> */}
          <Item label="等级条件">
            <Space direction="vertical" style={{ width: '100%' }}>
              {data.levelList?.map((level, index) => {
                return (
                  <Space key={level.level} size={15}>
                    <span>等级{index + 1}</span>

                    <div style={{ minWidth: 60 }}>{level.valueStart}</div>

                    <span>{`<= ${MMemberLevelType[data.levelType!]} <`}</span>

                    <div style={{ minWidth: 60 }}>{level.valueEnd}</div>
                  </Space>
                )
              })}
            </Space>
          </Item>
        </Descriptions>

        <Divider />

        <Descriptions column={1} labelStyle={{ width: 120 }} contentStyle={{ maxWidth: '400px' }}>
          {/* <Item label="等级条件">{MMemberLevelType[data.levelType!]}</Item> */}
          <Item label=" ">
            <Space direction="vertical" style={{ width: '100%' }}>
              {data.levelList?.map((level, index) => {
                return (
                  <Descriptions key={level.level} column={2} labelStyle={{ width: 120 }} contentStyle={{ maxWidth: '400px' }}>
                    <Item span={2} label="等级级别">
                      {index + 1}
                    </Item>
                    <Item span={2} label="等级名称">
                      {level.levelName}
                    </Item>
                    <Item span={2} label="等级描述">
                      <div className={styles.richTextContent} dangerouslySetInnerHTML={{ __html: level.richTextContent || '' }} />
                    </Item>

                    <Item span={1} label="等级图标">
                      {!!level.icon && <Image width={100} src={level.icon} />}
                    </Item>
                    <Item span={1} label="等级背景图">
                      {!!level.bgUrl && <Image width={100} src={level.bgUrl} />}
                    </Item>
                  </Descriptions>
                )
              })}
            </Space>
          </Item>
        </Descriptions>
      </Card>

      <Card title="会员权益设置">
        <Descriptions column={1} labelStyle={{ width: 120 }}>
          <Item label="商品折扣">
            <Space direction="vertical" size={25} style={{ width: '100%' }}>
              {data.levelList
                ?.map((level) => {
                  return level.rightsList?.[0] ?? {}
                })
                .map((right, index) => {
                  return (
                    <Space key={index} direction="vertical" style={{ width: '100%' }}>
                      <Space size={50}>
                        <span>等级{index + 1}</span>
                        <span>{right.discount}折</span>

                        <span>{rangeTypeOptions.find((it) => it.value === right.rangeType)?.label}</span>
                      </Space>
                      {right.rangeType === EMemberRangeType.PartGoods && <AssignGoods value={right.rightsGoodsList?.map((item) => item.goodsNo!)} disabled />}
                    </Space>
                  )
                })}
            </Space>
          </Item>
        </Descriptions>
      </Card>

      <Card title="会员类型说明">
        <div dangerouslySetInnerHTML={{ __html: data.richTextContent || '' }} />
      </Card>
    </Space>
  )
}

const MutiLevelDetail = memo(Component)
export default MutiLevelDetail
