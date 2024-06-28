import { getInitialState } from './app'
import { systemConfig } from '~/config'
const { config } = systemConfig

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

type ThenArg<T> = T extends Promise<infer U> ? U : T
type TInitialState = ThenArg<ReturnType<typeof getInitialState>>

export default function access(initialState: TInitialState) {
  const { authCodes = [] } = initialState || {}

  const authMap = authCodes.reduce((result, code) => {
    result[code] = true
    return result
  }, {} as Record<string, any>)

  const accessCodes = {
    ...codes.reduce((result, code) => {
      result[code] = false
      return result
    }, {} as Record<string, boolean>),
    ...authMap
  }

  if (accessCodes['marketingActivity-hotKeyword']) {
    accessCodes['marketingActivity-hotKeyword'] = config.enableHotKeyword
  }

  return accessCodes
}

/**
 * 所有权限code
 *
 * 如果没有在config/confg.ts中开启access.strictMode = true。 那就就需要将所有的权限code都声明为false。否则会认为有权限跳过
 *
 * 在【系统设置-资源管理】页面中可以复制所有权限code。粘贴在此处
 */

export const codes = [
  // CODE_START
  /**
   * 权限code
   * 以下内容均为access-code插件生成（CODE_START至CODE_END部分）
   * 所以请勿在此区域内写入内容。
   * 你可以通过运行 pnpm umi accessCode 自动生成
   */
  'basicSetting',
  'basicSetting-materialLibrary',
  'customerManagement',
  'customerManagement-list',
  'customerManagement-detail',
  'customerManagement-tags',
  'customerManagement-checkUser',
  'decorationSetting',
  'decorationSetting-decorationList',
  'decorationSetting-decorationList-detail',
  'decorationSetting-homePageSetting',
  'eventsManagement',
  'eventsManagement-eventTypes',
  'eventsManagement-events',
  'eventsManagement-events-create',
  'eventsManagement-activityOrders',
  'eventsManagement-seatSettings',
  'eventsManagement-whiteList',
  'sysSetting',
  'sysSetting-initScreen',
  'sysSetting-setting',
  'sysSetting-setting-agreementLogs',
  'sysSetting-setting-privacyLogs',
  'sysSetting-employeeManagement',
  'sysSetting-roleManagement',
  'sysSetting-operationLog'
  // CODE_END
] as const

export type TAccessCode = typeof codes[number]
