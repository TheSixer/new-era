/* eslint-disable max-nested-callbacks */
import { api } from '@wmeimob/backend-api'
import { GoodsVO, GoodsSaveDTO, GoodsSkuDTO } from '@wmeimob/backend-api/src/request/data-contracts'
import { message } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { setClassifyValues, getClassifyValues } from '../../goodsClassify/const'
import { TGoodData, IStepTwoFormDTO } from '../const'
import { useGoodStepForm, useSkuService } from '../store'

interface IProps {
  /** 页面查询参数 */
  query?: Record<string, string>

  api: {
    getClassify?: typeof api['/admin/mall/classify/tree_GET']

    query(no: string): Promise<{ data?: any }>

    save(data: any): Promise<{}>
  }
}

/**
 * 商品处理hook
 */
export function useGoodsCreateService(props: IProps) {
  const goodsNo = props.query?.goodsNo || '' // 商品编号
  const isCopy = props.query?.type === 'copy' // 是否是复制

  const [loading, setLoading] = useState(false)
  const [goodDetail, setGoodDetail] = useState<GoodsVO>({}) // 商品详情
  // 商品默认数据
  const [goodData] = useState<TGoodData>({
    goodsNo: '',
    goodsName: '',
    coverImg: '',
    bannerImgs: [],
    expressTemplateId: undefined,
    classifyIds: [],
    sort: 1,
    useScore: 0,

    specList: [],
    specIdList: [],
    goodsSkuList: [],
    goodContet: ''
  })

  const { stepOneForm, stepTwoForm, stepThreeForm } = useGoodStepForm()

  const { flatSkuList, skuListMap, setSkuListMap, getSKu } = useSkuService()
  const goodsSkuListMap = useRef<Record<string, any>>({})

  // 初始化
  useEffect(() => {
    async function initData() {
      setLoading(true)
      const list = await getSKu()
      setSkuListMap({ 0: list })

      if (goodsNo) {
        const { data = {} } = await props.api.query(goodsNo)
        // 保存商品详情。如果是复制的。不保存id
        const { id, ...rest } = data
        setGoodDetail(isCopy ? rest : data)
        // 回写表单一
        stepOneForm.setFieldsValue({
          ...data,
          useScore: data.useScore ? 1 : 0,
          goodsNo: isCopy ? '' : data.goodsNo,
          classifyIds: setClassifyValues(data),
          bannerImgs: data.bannerImgPaths?.split(',')
        })

        // 回写规格
        const { goodsSpecRelationList = [], goodsSkuDetailList = [] } = data
        const specList: string[] = [] // 父id数组
        const specIdListSets: Set<string>[] = [] // 用set对象来保证选中的规格id顺序并去重

        const goodsSkuList = goodsSkuDetailList.map((skuDetail, index) => {
          const { specIds = '' } = skuDetail
          const specNames = specIds
            .split(',')
            .map((id, idx) => {
              const { specPid, specName } = goodsSpecRelationList.find((it) => `${it.specId}` === id) || {}
              // 塞入父id信息
              if (index === 0) {
                specList.push(`${specPid}`)
              }
              // 设置选中的规格id信息
              if (id) {
                if (!specIdListSets[idx]) {
                  specIdListSets[idx] = new Set<string>([id])
                } else {
                  specIdListSets[idx].add(id)
                }
              }

              return specName
            })
            .join(',')

          const { goodsId, id, uniform, ...restSkuDetail } = skuDetail
          return {
            ...restSkuDetail,
            id: isCopy ? undefined : skuDetail.id,
            skuNo: isCopy ? undefined : skuDetail.skuNo,
            specIds,
            specNames,
            enabled: !!skuDetail.enabled
          }
        })

        const specIdList = specIdListSets.map((set) => [...set])

        // 缓存skulist数据
        goodsSkuListMap.current = goodsSkuList.reduce((total, sku) => {
          total[sku.specIds!] = { ...sku }
          return total
        }, goodsSkuListMap.current)

        stepTwoForm.setFieldsValue({ specList, specIdList, goodsSkuList })

        setGoodContent(data.richId)
      }
      setLoading(false)
    }
    // 获取商品详情
    initData()
  }, [])

  // 保存
  async function saveGood(data: TGoodData) {
    const { classifyIds, useScore, specIdList, goodsSkuList: skuList, specList: sList, bannerImgs, goodContet, goodsNo, ...rest } = data
    const classify = getClassifyValues(classifyIds) // 解开分类id
    // 处理商品skulist
    const specList = new Set<string>(sList.map((it) => `${it}`))
    const goodsSkuList: any = skuList.map((item) => {
      item.specIds!.split(',').forEach((id) => {
        specList.add(id)
      })

      return { ...item, enabled: item.enabled ? 1 : 0 }
    })

    let goodValues: GoodsSaveDTO = {
      ...rest,
      ...classify,
      useScore: useScore === 1,
      bannerImgPaths: bannerImgs.join(','),
      specList: [...specList] as any[],
      goodsSkuList,
      richId: goodDetail.richId
    }

    try {
      setLoading(true)
      if (!goodDetail.id) {
        // 保存富文本
        const { data: richId } = await api['/admin/richtext_POST']({ dataId: 0, content: goodContet })
        goodValues.richId = richId
      } else {
        await api['/admin/richtext/{id}_PUT'](goodValues.richId!, { dataId: goodValues.richId!, content: goodContet })
        goodValues = { ...goodValues, id: goodDetail.id, goodsNo: goodDetail.goodsNo }
      }

      await props.api.save(goodValues)
      message.success('保存成功')
      window.history.go(-1)

      return true
    } catch (error) {}

    setLoading(false)
    return false
  }

  /**
   * 回写商品富文本
   * @param richId 富文本id
   */
  async function setGoodContent(richId?: number) {
    if (richId !== undefined) {
      const { data: goodContet = '' } = await api['/admin/richtext_GET']({ id: richId })
      stepThreeForm.setFieldsValue({ goodContet })
    }
  }

  // 规格表单实践处理
  const handleStepTwoFormChange = (changedValues: Partial<IStepTwoFormDTO>, values: IStepTwoFormDTO) => {
    let { specIdList = [] } = values
    ;(values.goodsSkuList || []).forEach((it) => {
      goodsSkuListMap.current![it.specIds!] = { ...it }
    })

    specIdList = specIdList.map((it) => it || [])
    if (Object.keys(changedValues).some((key) => ['specList', 'specIdList'].indexOf(key) !== -1)) {
      // 父级规格变化
      if (changedValues.specList !== undefined) {
        // skuListMap
        const allChildIds = changedValues.specList.map((it) => (skuListMap[it] || []).map((lm) => lm.value)).flat()
        specIdList = specIdList.map((sis) => sis.filter((si) => allChildIds.includes(si))).filter((it) => it.length)
      }

      const result = cartesian(specIdList)
      const goodsSkuList = result.map((it) => {
        const specParentIds: string[] = []
        const skuNames: string[] = []
        const specNames: string[] = []

        it.forEach((id, index) => {
          const sku: any = flatSkuList.find((item) => item.value === id) || {}
          const { pid, label = '' } = sku
          const parent: any = flatSkuList.find((item) => item.id === pid) || {}

          skuNames.push(`${parent.label}:${label}`)
          specParentIds.push(pid)
          specNames.push(label)
        })

        const specIds = it.join(',')

        return {
          enabled: true,
          customStartSales: 0,
          ...goodsSkuListMap.current![specIds],
          specIds,
          specNames: specNames.join(','),
          specParentIds: specParentIds.join(','),
          skuName: skuNames.join(' ')
        } as GoodsSkuDTO
      })
      stepTwoForm.setFieldsValue({ specIdList, goodsSkuList })
    }
  }

  return {
    loading,
    goodData,
    stepOneForm,
    stepTwoForm,
    stepThreeForm,

    flatSkuList,
    goodsSkuListMap,

    handleStepTwoFormChange,
    saveGood
  }
}

/**
 * 笛卡尔积
 */
function cartesian(arr: string[][]) {
  if (arr.length < 2) {
    return (arr[0] || []).map((it) => [it])
  }
  return arr.reduce((col, set) => {
    const res: any[] = []
    col.forEach((cc) => {
      set.forEach((ss) => {
        const tt: any = ([] as any).concat(Array.isArray(cc) ? cc : [cc])
        tt.push(ss)
        res.push(tt)
      })
    })
    return res
  }) as unknown as string[][]
}
