import { api } from '@wmeimob/backend-api'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { Form, message } from 'antd'
import { useContext, useEffect } from 'react'
import { SettingContext } from '../store'
import { ETypeEnum } from '../components/userAgreement/const'

const {
  auto_comment,
  score_auto_reset,
  user_agreement,
  takeout_range_amount,
  takeout_distribution_time_range,
  takeout_self_picked_time_range,
  recharge_amount_list,
  privacy_agreement
} = ESettingKey

const { useForm } = Form

interface IUseSettingServiceOptions {
  /** 设置key */
  key: string[]
}

const needParse: string[] = [
  auto_comment,
  score_auto_reset,
  takeout_range_amount,
  takeout_distribution_time_range,
  takeout_self_picked_time_range,
  recharge_amount_list
]
const needRemote: string[] = [user_agreement,privacy_agreement]

export default function useSettingService(options: IUseSettingServiceOptions) {
  const ctx = useContext(SettingContext)
  const [form] = useForm()

  useEffect(() => {
    queryData()
  }, [])

  /**
   * 保存设置
   */
  const [onFinish, saveLoading] = useSuperLock(async () => {
    const data = await form.validateFields()
    const saveData = await setFieldsValue(data)
    await api['/admin/mall/config/insertAndUpdate_POST'](saveData)
    message.success('保存成功')
  })

  // 查询数据
  async function queryData() {
    const key = (options.key ?? []).join(',')
    const { data = {} } = await api['/admin/mall/config/queryByMultipleKey_GET']({ key })
    const store = await transferFieldsValue(data)
    form.setFieldsValue(store)
  }

  // 指定某些配置项字段值进行 JSON.parse 转换，因后端吐出的字段值清一色变成了字符串
  async function transferFieldsValue(data: Record<string, any>) {
    return Object.keys(data)
      .map((fieldKey) => ({ fieldKey, fieldValue: data[fieldKey] }))
      .reduce(async (fn, { fieldKey = '', fieldValue }) => {
        let value = fieldValue
        if (needParse.indexOf(fieldKey) !== -1) {
          value = JSON.parse(fieldValue as string)
        } else if (needRemote.indexOf(fieldKey) !== -1 && /^http(s)?/.test(value)) {
          const data = await fetch(value!).then((res) => res.text())
          value = data
        }

        return fn.then((obj) => ({
          ...obj,
          [fieldKey]: value
        }))
      }, Promise.resolve<Record<string, any>>({}))
  }

  async function setFieldsValue(data: Record<string, any>) {
    return Object.keys(data)
      .map((fieldKey) => ({ fieldKey, fieldValue: data[fieldKey] }))
      .reduce(async (fn, { fieldKey = '', fieldValue }) => {
        let value = fieldValue
        if (needRemote.indexOf(fieldKey) !== -1 && !!value) {
          if (ctx?.upload) {
            const file = new File([value], '.txt', { type: 'application/text' })
            const [result] = await ctx.upload([file])
            value = result
          } else {
            // eslint-disable-next-line no-console
            console.warn(`SettingContext中没有设置上传方法`)
          }
        }

        return fn.then((obj) => ({
          ...obj,
          [fieldKey]: value
        }))
      }, Promise.resolve<Record<string, any>>({}))
  }

  return {
    form,
    onFinish,
    loading: saveLoading
  }
}
