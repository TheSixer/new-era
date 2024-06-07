import ProForm, { ProFormDependency, ProFormDigit, ProFormField, ProFormInstance, ProFormRadio } from '@ant-design/pro-form'
import mmFormRule from '@wmeimob/form-rules'
import { FC, memo, MutableRefObject } from 'react'
import styles from './index.module.less'
import { EActivityConditionType, OActivityConditionType } from '@wmeimob-modules/activity-data/src/enums/EActivityConditionType'
import { Card } from 'antd'
import { ProFormDigitProps } from '@ant-design/pro-form/lib/components/Digit'
import AreaList, { IAreaListValue } from '../areaList'
import { mergeAllArea } from '../../../../../components/selectAreaModal/utils'

interface IActivitySettingProps {
  formRef: MutableRefObject<ProFormInstance<any> | undefined>
  disabled: boolean
}

const Component: FC<IActivitySettingProps> = (props) => {
  const { formRef, disabled } = props

  return (
    <Card>
      <ProFormRadio.Group
        label="活动条件"
        name={['promotionParam', 'promotionConditionType']}
        options={OActivityConditionType}
        rules={mmFormRule.required}
        disabled={disabled}
        fieldProps={{
          onChange: () => formRef.current?.resetFields([['promotionParam', 'promotionConditionList', 0, 'con']])
        }}
      />

      <ProForm.Item label="计算方式" wrapperCol={{ span: 20 }}>
        <ProFormDependency name={[['promotionParam', 'promotionConditionType']]}>
          {({ promotionParam: { promotionConditionType } }) => {
            const other: ProFormDigitProps =
              promotionConditionType === EActivityConditionType.Packages
                ? {
                    extra: '*请输入≥0的整数',
                    fieldProps: { min: 0, precision: 0, addonAfter: '件' }
                  }
                : {
                    extra: '*请输入≥0的两位小数',
                    fieldProps: { min: 0, precision: 2, addonAfter: '元' }
                  }

            return (
              <ProFormDigit
                label="活动条件"
                name={['promotionParam', 'promotionConditionList', 0, 'con']}
                width="sm"
                disabled={disabled}
                rules={mmFormRule.required}
                {...other}
              />
            )
          }}
        </ProFormDependency>

        <ProForm.Item
          label="选择地区"
          name={['promotionParam', 'area']}
          rules={mmFormRule.required}
          transform={(data: IAreaListValue) => ({
            promotionParam: { area: mergeAllArea(data.area), text: data.text }
          })}
        >
          <AreaList disabled={disabled} />
        </ProForm.Item>
      </ProForm.Item>
    </Card>
  )
}

const ActivitySetting = memo(Component)
export default ActivitySetting
