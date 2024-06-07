import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { useToast } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'

/**
 * 装修页面获取装修配置
 *
 * @export
 * @param {string} id
 * @return {*}
 */
export default function useDecoration(id?: string) {
  const [pageTitle, setPageTitle] = useState('')
  const [modules, setModules] = useState<any[]>([])
  const [toast] = useToast()

  /**
   * WARNNING: 请务必保证使用此hook的页面使用PageContainer进行了包裹
   * 否则toast永远为undefined
   */
  useEffect(() => {
    async function getData() {
      if (id) {
        toast?.loading()
        try {
          const { data = {} } = await api['/wechat/mall/page/get/{id}_GET'](Number(id))
          const { content = '', title = '' } = data
          setPageTitle(title)
          // 如果是阿里云存储地址。再去阿里云获取详细文本配置
          if (/^http(s)?:/.test(content)) {
            Taro.request({ url: content }).then(({ data: text }) => {
              setModules(text)
            })
          } else {
            !!content && setModules(JSON.parse(content))
          }
        } catch (error) {}
        toast?.hideLoading()
      } else {
        toast?.fail('没有页面id')
      }
    }

    if (toast) {
      getData()
    }
  }, [toast])

  return {
    modules,
    title: pageTitle
  }
}
