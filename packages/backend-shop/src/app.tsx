/* eslint-disable react/jsx-key */
// import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { SettingDrawer } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import './styles/global.less'
import type { RunTimeLayoutConfig } from 'umi'
import { history, Link } from 'umi'
import RightContent from '~/components/RightContent'
import Footer from '~/components/Footer'
import { BookOutlined, LinkOutlined } from '@ant-design/icons'
import defaultSettings from '../config/defaultSettings'
import { isDev, loginPath, publicPath } from './config'
import { fetchUserInfo, ICurrentUser } from './app.service'
import MyProProvider from './components/proComponents/myProProvider'
import { createElement } from 'react'
import { ConfigProvider } from 'antd'
import instance from '~/request/instance'
import { setGlobalData } from '@wmeimob/backend-store'
import { upload } from './components/aliyun'

setGlobalData({ upload, instance })

type LayoutSettings = typeof defaultSettings

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />
}

const { logo = '', smLogo = '', ...rest } = defaultSettings
const newSettings = {
  ...rest,
  logo: /^http(s)?:\/\//.test(logo) ? logo : publicPath + logo.slice(1),
  smLog: /^http(s)?:\/\//.test(logo) ? smLogo : publicPath + smLogo.slice(1)
}

const inputConfig = { autoComplete: 'off' }

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: ICurrentUser
  loading?: boolean
  authCodes?: string[]
  fetchUserInfo?: typeof fetchUserInfo
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const { currentUser, authCodes } = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      authCodes,
      settings: newSettings
    }
  }
  return {
    fetchUserInfo,
    authCodes: [],
    settings: newSettings
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath)
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <ConfigProvider input={inputConfig}>
          {children}
          {isDev && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings
                }))
              }}
            />
          )}
        </ConfigProvider>
      )
    },
    ...initialState?.settings
  }
}

export function rootContainer(container) {
  return createElement(MyProProvider, null, container)
}
