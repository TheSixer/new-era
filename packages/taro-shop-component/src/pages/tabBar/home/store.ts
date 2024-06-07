import { atom } from 'jotai'

/** 弹窗广告是否显示过 */
export const isPopupAdsShowedAtom = atom(false)

/**
 * 首页是否已经执行初始化
 * 获取用户信息 协议弹窗、领券弹窗、签到信息弹窗、广告位弹窗等
 */
// 废弃了
export const isHomeInitedAtom = atom(false)
