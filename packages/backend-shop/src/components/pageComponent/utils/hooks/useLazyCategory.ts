import { useEffect, useMemo, useState } from 'react'
import { CascaderProps, CascaderOptionType } from 'antd/es/cascader'
import { api } from '~/request'

/**
 * 获取远程分类数据
 */
export function useLazyCategory(): [CascaderOptionType[], CascaderProps] {
  const [options, setOptions] = useState<CascaderOptionType[]>([])

  const cascaderProps: CascaderProps = useMemo(() => {
    return {
      options,
      placeholder: '请选择分类',
      loadData: async (selectedOptions) => {
        const targetLevel = selectedOptions!.length
        const targetOption = selectedOptions![targetLevel - 1]
        const categoryNo = targetOption.value as string
        targetOption.loading = true
        // const { data } = await api['/admin/common/MallCombobox/getStoreCategoryComboboxByStore_GET']({ categoryNo, level: targetLevel + 1 })
        targetOption.loading = false
        targetOption.children =
          // Array.isArray(data) && data.length > 0
          //   ? data.map((item) => ({ label: item.value, value: item.key, isLeaf: targetLevel >= 2 }))
          //   : [{ label: '没有数据', value: Date.now(), isLeaf: true, disabled: true }]
        setOptions(options.slice(0))
      }
    }
  }, [options])

  useEffect(() => {
    // api['/admin/common/MallCombobox/getStoreCategoryComboboxByStore_GET']({ level: 1 }).then(({ data }) => {
    //   if (data) {
    //     setOptions(data.map((item) => ({ label: item.value, value: item.key, isLeaf: false })))
    //   }
    // })
  }, [])

  return [options, cascaderProps]
}
