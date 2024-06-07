import ProForm from '@ant-design/pro-form'
import { EMemberLevelType } from '@wmeimob-modules/member-data/src/enums/EMemberLevelType'
import { EMemberRangeType } from '@wmeimob-modules/member-data/src/enums/EMemberRangeType'
import { EMemberRightsType } from '@wmeimob-modules/member-data/src/enums/EMemberRightsType'
import { MemCardLevelDto } from '@wmeimob/backend-api'
import { Space } from 'antd'
import { FC, memo } from 'react'
import BasicInfoCard from '../cards/basicInfoCard'
import ConditionCard from '../cards/conditionCard'
import MemberDescriptionCard from '../cards/memberDescriptionCard'
import MemberRightsCard from '../cards/memberRightsCard'
import SettingCard from '../cards/settingCard'

interface IMutiLevelCardFormProps {
  upload: any
  form: any
}

const Component: FC<IMutiLevelCardFormProps> = (props) => {
  const { form, upload } = props

  return (
    <ProForm
      form={form}
      layout="horizontal"
      labelCol={{ style: { width: 120 } }}
      wrapperCol={{ style: { maxWidth: '550px' } }}
      initialValues={{
        level: 1,
        levelType: EMemberLevelType.Monetary,
        price: 0,
        levelList: [{ level: 1, valueStart: 0, valueEnd: 99999999 }],
        rightsList: [
          {
            rightsType: EMemberRightsType.GoodsDiscount,
            rangeType: EMemberRangeType.AllGoods
          }
        ]
      }}
      onValuesChange={(ev, values) => {
        // console.log(ev, values)

        // 修改等级 重新生成条件设置
        if (ev.levelList !== undefined) {
          const isValueChagne = ev.levelList.some((it) => Object.keys(it).some((key) => ['valueStart', 'valueEnd'].includes(key)))
          if (!isValueChagne) {
            return
          }
          const fieldsValue = form.getFieldsValue() || {}
          const levelList = fieldsValue.levelList.map((item: MemCardLevelDto, index) => {
            if (index === 0) {
              return item
            }
            return { ...item, valueStart: fieldsValue.levelList[index - 1].valueEnd }
          })

          setTimeout(() => {
            form.setFieldsValue({ levelList })
          })
        }
      }}
      submitter={false}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* 基础信息设置 */}
        <BasicInfoCard />
        {/* 会员卡设置 */}
        <SettingCard form={form} />
        {/* 会员卡条件设置 */}
        <ConditionCard form={form} />
        {/* 会员权益设置 */}
        <MemberRightsCard form={form} />
        {/* 会员说明 */}
        <MemberDescriptionCard upload={upload} />
      </Space>
    </ProForm>
  )
}

const MutiLevelCardForm = memo(Component)
export default MutiLevelCardForm
