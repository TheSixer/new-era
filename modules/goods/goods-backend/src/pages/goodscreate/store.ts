import { FormInstance } from 'antd/es/form'
import { DefaultOptionType } from 'antd/es/select'
import { useForm } from 'antd/lib/form/Form'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { api } from '@wmeimob/backend-api'
import { IStepOneFormDTO, IStepTwoFormDTO, IStepThreeFormDTO } from './const'

export const skuListMapAtom = atom<Record<string, DefaultOptionType[]>>({})

// 顶级规格
export const topSkuListAtom = atom((get) => get(skuListMapAtom)[0] || [])

// 平铺所有的规格信息
export const flatSkuListAtom = atom((get) => {
  const sl = get(skuListMapAtom)
  return Object.keys(sl).reduce((total, key) => {
    return total.concat(sl[key])
  }, [] as DefaultOptionType[])
})

export function useSkuService() {
  const [skuListMap, setSkuListMap] = useAtom(skuListMapAtom)
  const topSkuList = useAtomValue(topSkuListAtom)
  const flatSkuList = useAtomValue(flatSkuListAtom)

  /** 获取sku数据 */
  const getSKu = useCallback(async (pid?: number | string) => {
    const { data = {} } = await api['/admin/mall/spec/query_GET']({ pid: pid as any, pageSize: 1000 })
    // 只有父规格有childrenNum字段，需过滤无子规格的
    const res = pid ? (data.list || []) : (data.list || []).filter((item) => item.childrenNum)
    const list = res.map((it) => ({ ...it, label: it.specName, value: `${it.id}` }))
    return list
  }, [])

  return {
    skuListMap,
    setSkuListMap,
    topSkuList,
    flatSkuList,
    getSKu
  }
}

/**
 * 商品表单实例
 */
export const goodStepFormMapAtom = atom<{
  stepOneForm?: FormInstance<IStepOneFormDTO>
  stepTwoForm?: FormInstance<IStepTwoFormDTO>
  stepThreeForm?: FormInstance<IStepThreeFormDTO>
}>({})

/**
 * 创建表单实例并将其存储至atom中
 * @returns
 */
export function useGoodStepForm() {
  const [stepOneForm] = useForm<IStepOneFormDTO>()
  const [stepTwoForm] = useForm<IStepTwoFormDTO>()
  const [stepThreeForm] = useForm<IStepThreeFormDTO>()
  const [, setGoodStepFormMap] = useAtom(goodStepFormMapAtom)

  useEffect(() => {
    setGoodStepFormMap({ stepOneForm, stepTwoForm, stepThreeForm })
  }, [stepOneForm, stepTwoForm, stepThreeForm])

  return { stepOneForm, stepTwoForm, stepThreeForm }
}
