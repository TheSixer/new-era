import { ProFormDependency, ProFormDigit, ProFormRadio } from '@ant-design/pro-form'
import { EMemberCardGetMethod, OMemberCardGetMethod } from '@wmeimob-modules/member-data/src/enums/EMemberCardGetMethod'
import { EMemberCardType, OMemberCardType } from '@wmeimob-modules/member-data/src/enums/EMemberCardType'
import { Card, FormInstance, RadioChangeEvent } from 'antd'
import { FC, memo } from 'react'

interface ISettingCardProps {
  form: FormInstance<any>
}

const Component: FC<ISettingCardProps> = (props) => {
  function handleCardTypeChange(event: RadioChangeEvent) {
    const type: EMemberCardType = event.target.value
    props.form.setFieldValue('acquisitionType', type === EMemberCardType.NeedPay ? EMemberCardGetMethod.Pay : OMemberCardGetMethod[0].value)
  }

  return (
    <Card title="会员卡设置">
      <ProFormRadio.Group label="卡类型" name="type" required options={OMemberCardType} fieldProps={{ onChange: handleCardTypeChange }} />

      {/* 目前只做自动发放 */}
      <ProFormDependency name={['type']}>
        {({ type }) => {
          const options =
            type === EMemberCardType.NeedPay
              ? [OMemberCardGetMethod.find(({ value }) => value === EMemberCardGetMethod.Pay)!]
              : OMemberCardGetMethod.filter(({ value }) => value !== EMemberCardGetMethod.Pay)

          return <ProFormRadio.Group label="领卡方式" name="acquisitionType" required options={options} hidden />
        }}
      </ProFormDependency>

      <ProFormDependency name={['type']}>
        {({ type }) => {
          return (
            type === EMemberCardType.NeedPay && (
              <ProFormDigit label="会员卡费" name="price" rules={[{ required: true }]} fieldProps={{ min: 0.01, max: 99999, precision: 2, addonAfter: '元' }} />
            )
          )
        }}
      </ProFormDependency>
    </Card>
  )
}

const SettingCard = memo(Component)
export default SettingCard
