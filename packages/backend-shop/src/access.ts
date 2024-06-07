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
  'basicSetting-setting',
  'basicSetting-setting-agreementLogs',
  'basicSetting-setting-privacyLogs',
  'basicSetting-materialLibrary',
  'basicSetting-advertisingSpace',
  'basicSetting-advertisingSpace-add',
  'basicSetting-popupAds',
  'decorationSetting',
  'decorationSetting-decorationList',
  'decorationSetting-decorationList-detail',
  'mallManagement',
  'mallManagement-freight-list',
  'mallManagement-freight-list-detail',
  'mallManagement-customer',
  'mallManagement-customer-detail',
  'mallManagement-memberRights-list-create',
  'mallManagement-addressList',
  'goodsManagement',
  'goodsManagement-goodsClassify',
  'goodsManagement-goodSkuList',
  'goodsManagement-goodSkuList-goodSkuListChild',
  'goodsManagement-goodsList',
  'goodsManagement-goodsList-goodsCreate',
  'goodsManagement-goodsList-goodsDetail',
  'goodsManagement-goodsList-goodsStock',
  'goodsManagement-goodsComments',
  'goodsManagement-avatarManagement',
  'integralGoodsManagement',
  'integralGoodsManagement-goodsClassify',
  'integralGoodsManagement-goodsList',
  'integralGoodsManagement-goodsList-goodsCreate',
  'integralGoodsManagement-goodsList-goodsDetail',
  'integralGoodsManagement-goodsList-goodsStock',
  'orderManagement',
  'orderManagement-orderList',
  'orderManagement-orderList-orderDetail',
  'orderManagement-integralGoodsOrder',
  'orderManagement-integralGoodsOrder-detail',
  'orderManagement-aftersaleList',
  'orderManagement-aftersaleList-afterDetail',
  'couponManagement',
  'couponManagement-list',
  'couponManagement-list-add',
  'couponManagement-list-detail',
  'couponManagement-receiveList',
  'couponManagement-grant',
  'couponManagement-grant-detail',
  'couponManagement-code',
  'couponManagement-code-detail',
  'marketingActivity',
  'marketingActivity-taskCenter',
  'marketingActivity-activitys',
  'marketingActivity-activitys-create',
  'marketingActivity-timeBuy',
  'marketingActivity-timeBuy-create',
  'marketingActivity-preSale',
  'marketingActivity-preSale-create',
  'marketingActivity-freeShipping',
  'marketingActivity-freeShipping-create',
  'marketingActivity-hotKeyword',
  'liveBroadcastManagement',
  'liveBroadcastManagement-list',
  'sysSetting',
  'sysSetting-employeeManagement',
  'sysSetting-roleManagement',
  'sysSetting-operationLog'
  // CODE_END
] as const

export type TAccessCode = typeof codes[number]
