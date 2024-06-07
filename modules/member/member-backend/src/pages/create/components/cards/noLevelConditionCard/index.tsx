/* eslint-disable max-params */
import { ProFormSelect } from '@ant-design/pro-form'
import { OMemberLevelType } from '@wmeimob-modules/member-data/src/enums/EMemberLevelType'
import { Card } from 'antd'
import { FC, memo } from 'react'

interface IConditionCardProps {
  form: any
}

const Component: FC<IConditionCardProps> = (props) => {
  return (
    <Card title="会员条件设置">
      <ProFormSelect label="等级条件" name="levelType" options={OMemberLevelType} allowClear={false} />
    </Card>
  )
}

const NoLevelConditionCard = memo(Component)
export default NoLevelConditionCard
