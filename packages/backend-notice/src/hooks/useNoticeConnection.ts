/* eslint-disable no-console */
import { useRef, useEffect } from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { api } from '../request'

interface IConnectionOption {
  /** socket 服务地址 */
  url: string

  /** 订阅地址 */
  subscribes: {
    subscribe: string
    callback?: (data: any, subscribe: string) => any
  }[]

  /**
   * ws连接成功事件
   */
  onConnectSuccess?(): void
}

/**
 * 消息通知ws连接
 *
 * @export
 * @return {*}
 */
export default function useNoticeConnection() {
  const socket = useRef<any>()

  const stompClient = useRef<any>()

  const retryTimes = useRef(10) // 断线重连次数

  /** 页面销毁时断开连接 */
  useEffect(() => {
    return () => {
      if (stompClient.current) {
        try {
          stompClient.current.disconnect()
          api['/notification/logout_POST']()
        } catch (error) {}
      }
    }
  }, [])

  /**
   * 创建socket连接以及订阅频道
   * @param url
   * @param subscribe
   */
  function createConnection(option: IConnectionOption) {
    const { url, subscribes = [] } = option

    socket.current = new SockJS(url) // 实例化
    stompClient.current = Stomp.over(socket.current) // 获取STOMP子协议的客户端对象
    // 定义客户端的认证信息,按需求配置
    const headers = {
      // login: 'mylogin', passcode: 'mypasscode', additional header, 'client-id': 'my-client-id'
    }

    // 向服务器发起websocket连接
    stompClient.current.connect(
      headers,
      (frame) => {
        retryTimes.current = 10
        option.onConnectSuccess?.()
        // 订阅服务端topic
        subscribes.forEach(({ subscribe, callback }) => {
          stompClient.current.subscribe(subscribe, (msg) => {
            try {
              const data = msg.body ? JSON.parse(msg.body) : {}
              callback?.(data, subscribe)
              // setNotices((pre) => pre.concat(data))
            } catch (error) {
              console.log(error)
              callback?.({}, subscribe)
            }
          })
        })
      },
      (err) => {
        // 连接发生错误时重新连接
        reConnection(option)
      }
    )
  }

  /**
   * 重连
   * @param url
   * @param subscribe
   */
  function reConnection(option: IConnectionOption) {
    if (retryTimes.current >= 0) {
      setTimeout(() => {
        console.log(`socket connection error, retry ${retryTimes.current}`)
        retryTimes.current--
        createConnection(option)
      }, 2000)
    }
  }

  return {
    /** 建立链接 */
    createConnection
  }
}
