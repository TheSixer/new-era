import { useEffect } from 'react'
import useNoticeConnection from './useNoticeConnection'
import Request from '@wmeimob/request/src/index'
import { setInstance } from '../request/instance'
import { useUnRead } from '../store'

interface INoticeSocketCofig {
  baseUrl: string

  onSubscribe?(data: any, subscribe: string): void
}

/**
 * 消息通知socket
 */
export default function useNoticeSocket(config: INoticeSocketCofig) {
  const { createConnection } = useNoticeConnection()

  const { getUnReadList, setUnRead, setNotices } = useUnRead()

  useEffect(() => {
    if (!config.baseUrl) {
      return
    }
    // 设置request请求
    const instance = Request.create(config)
    instance.responseInterceptors.use((res) => res.data)

    setInstance(instance)
    // 创建链接
    createConnection({
      url: `${config.baseUrl}/notification/connect`,
      subscribes: [
        {
          subscribe: '/subscribe/payOrder',
          callback: (data, subscribe) => {
            // 接收到消息之后更新数据
            if (data) {
              setNotices((pre) => [data].concat(pre))
              setUnRead((pre) => pre + 1)
            }
            config.onSubscribe?.(data, subscribe)
          }
        }
      ],
      onConnectSuccess: () => {
        getUnReadList()
      }
    })
  }, [])
}
