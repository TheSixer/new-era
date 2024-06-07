import { cloneElement, FC, memo, useContext, useEffect } from 'react'
import ProProvider from '@ant-design/pro-provider'
import { IMyProProviderProps } from './const'
import city from '../valueTypes/city'
import { useModel, history } from 'umi'
import { message } from 'antd'
import useNoticeSocket from '@wmeimob/backend-notice/src/hooks/useNoticeSocket'
import { systemConfig } from '~/config'

/**
 * 扩展antdPro valueType
 *
 * @description 除非你需要关联处理表单搜索。否则不推荐这里去扩展。因为类型无法正确的推导。更推荐使用原始render方式去处理。去看看proTableColumns吧
 * @param {*} props
 * @return {*}
 */
const Component: FC<IMyProProviderProps> = (props) => {
  const { children, routes } = props as any
  const value = useContext(ProProvider)

  useVisibilityState()

  useNoticeSocket({ baseUrl: systemConfig.config.enableNotice ? 'http://notification.t4.wmeimob.cn' : '' })

  return (
    <ProProvider.Provider
      value={{
        ...value,
        valueTypeMap: {
          city
        }
      }}
    >
      {/* 解决umi下 rootContainer导致菜单权限失效的bug */}
      {cloneElement(children, { ...children.props, routes })}
    </ProProvider.Provider>
  )
}

Component.displayName = 'MyProProvider'

const MyProProvider = memo(Component)
export default MyProProvider

/**
 * 监听处理浏览器标签页切换
 */
function useVisibilityState() {
  const { initialState = {} } = useModel('@@initialState')

  useEffect(() => {
    const listener = async function () {
      //浏览器tab切换监听事件
      if (document.visibilityState === 'hidden' || document.hidden) {
        // console.log('隐藏了')
      } else if (document.visibilityState === 'visible' || document.hidden === false) {
        const { email } = initialState.currentUser || {}
        if (email) {
          const userInfo = await initialState?.fetchUserInfo?.()
          if (userInfo?.currentUser?.email !== email) {
            message.info('登录账户发生变化。即将刷新页面')
            setTimeout(() => {
              history.replace('/')
              setTimeout(() => {
                window.location.reload()
              })
            }, 2000)
          }
        }
      }
    }
    document.addEventListener('visibilitychange', listener)

    return () => {
      document.removeEventListener('visibilitychange', listener)
    }
  }, [])
}
