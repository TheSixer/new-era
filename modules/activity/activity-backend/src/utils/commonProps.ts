import { ProFormFieldItemProps } from '@ant-design/pro-form/lib/interface'
import { OActivityCompletedGoods } from '@wmeimob-modules/activity-data/src/enums/EActivityCompletedGoods'
import { IProFormMaterialProps } from '@wmeimob/backend-pages/src/components/form/proFormMaterial/const'
import { IProFormLimitInputProps } from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { IProFormRichTextProps } from '@wmeimob/backend-pro/src/components/form/proFormRichText/const'
import mmFormRule from '@wmeimob/form-rules'
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker'
import moment, { Moment } from 'moment'
import { validateActivityTimeRange } from './validator'

/**
 * 活动创建页面公用配置项
 */

const disabledHours = () => {
  const hours: number[] = []
  for (let index = 0; index < moment().hour(); index++) {
    hours.push(index)
  }
  return hours
}

const disabledMinutes = (currentDate) => {
  const currentMinute = moment().minute()
  const currentHour = moment(currentDate).hour()
  const minutes: number[] = []
  if (currentHour === moment().hour()) {
    for (let index = 0; index < currentMinute; index++) {
      minutes.push(index)
    }
  }
  return minutes
}

const disableActivityTime = {
  disabledDate: (current) => current.isBefore(moment(), 'day'),
  disabledTime: (dateTime) => {
    const mTime = moment(dateTime)
    const cTime = moment()
    let rdata: any = {}
    if (mTime.isAfter(cTime, 'day')) {
      rdata = undefined
    } else if (mTime.isBefore(cTime, 'day')) {
      rdata = {
        disabledHours: () => Array.from({ length: 23 }).map((_, id) => id + 1),
        disabledMinutes: () => Array.from({ length: 59 }).map((_, id) => id + 1),
        disabledSeconds: () => Array.from({ length: 59 }).map((_, id) => id + 1)
      }
    } else {
      rdata = {
        disabledHours: () => disabledHours(),
        disabledMinutes: () => disabledMinutes(dateTime)
      }
    }
    return rdata
  }
}

/** 活动名称 */
const activityName: IProFormLimitInputProps = {
  label: '活动名称',
  name: 'activityName',
  maxLength: 32,
  rules: mmFormRule.required,
  fieldProps: { placeholder: '最长输入32个字' }
}

/** 活动描述 */
const description: IProFormLimitInputProps = {
  label: '活动描述',
  name: 'description',
  maxLength: 50,
  rules: mmFormRule.required,
  fieldProps: { placeholder: '最长输入50个字' }
}

/** 活动时间 */
const activityTime: ProFormFieldItemProps<RangePickerProps<Moment>, any> = {
  label: '活动时间',
  name: 'activityTime',
  width: 'md',
  allowClear: false,
  fieldProps: {
    format: 'YYYY-MM-DD HH:mm',
    showTime: { format: 'HH:mm' },
    ...disableActivityTime
  },
  rules: [...mmFormRule.required, { validator: (_, value) => validateActivityTimeRange(value) }],
  transform: ([startTime, endTime]: [string, string]) => ({
    startTime: `${startTime}:00`,
    endTime: `${endTime}:59`
  })
}

/** 活动结束后商品 */
const completed = {
  label: '活动结束后商品',
  name: 'completed',
  options: OActivityCompletedGoods,
  rules: mmFormRule.required,
  extra: '设置活动结束或活动库存售罄后商品状态'
}

/** 活动封面图 */
const coverImg: IProFormMaterialProps = {
  label: '活动封面',
  name: 'coverImg',
  fieldProps: { measure: [173, 173] },
  rules: mmFormRule.required
}

/** 活动说明 */
const content: IProFormRichTextProps = {
  label: '活动说明',
  name: 'content',
  rules: mmFormRule.required,
  wrapperCol: { span: 21 },
  fieldProps: { plain: 'minimalism' }
}

const commonProps = {
  activityName,
  description,
  activityTime,
  completed,
  coverImg,
  content
}

export default commonProps
