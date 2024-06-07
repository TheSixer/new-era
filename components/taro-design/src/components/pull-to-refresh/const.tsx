import { ReactNode } from 'react'
import { IComponentProps } from '../types'

export interface IMMPullToRefreshProps extends IComponentProps {
  /**
   * 状态
   *
   * @type {MMPullToRefreshState}
   * @memberof IMMPullToRefreshProps
   */
  state: MMPullToRefreshState

  /**
   * 没有更多
   *
   * @type {boolean}
   * @memberof IMMPullToRefreshProps
   */
  noMore: boolean

  /**
   * 没有更多的文案
   */
  noMoreText?: ReactNode

  /**
   * 没有更多的文案延迟显示时间
   *
   * 毫秒
   *
   * @description 用于配合瀑布流组件内部100毫秒的渲染延迟
   */
  noMoreTextDelay?: number

  empty?: ReactNode

  /**
   * 渲染底部 低于无更多
   *
   * @memberof IMMPullToRefreshProps
   */
  renderFooter?: ReactNode

  /**
   * 容器高度
   *
   * @description 下拉刷新必须指定一个高度。
   * 大部分情况下组件内会自动根据距离顶部距离计算出容器剩余高度作为组件高度。
   * 但是有些特定情况。造成两个滚动条的时候。你可能需要手动指定容器高度
   */
  height?: number

  /** 是否计算底部距离 */
  bottom?: boolean

  /**
   * 是否启用下拉刷新
   * @default true
   */
  enablePull?: boolean

  /**
   * 是否显示滚动条
   * @default true
   */
  showScrollbar?: boolean

  /**
   * 刷新事件回调
   *
   * @memberof IMMPullToRefreshProps
   */
  onRefresh: () => void | Promise<void>

  /**
   * 滚动到地步回调
   *
   * @memberof IMMPullToRefreshProps
   */
  onScrollToLower: () => void
}

export interface IMMPullToRefreshState {
  pulling: boolean
  top: number
  scrollViewHeight: number

  showNoMoreText: boolean
  height1: number
}

export enum MMPullToRefreshState {
  /**
   * 普通状态
   */
  none,
  /**
   * 刷新中
   */
  refreshing,
  /**
   * 添加中
   */
  pushing
}

export interface IMMPullRefreshHookRefreshParams {
  /**
   * 刷新时是否清空旧数组
   *
   * @default false
   */
  clearList?: boolean
}

export interface IMMPullRefreshHookReturn extends Omit<IMMPullToRefreshProps, 'onRefresh'> {
  onRefresh: (params?: IMMPullRefreshHookRefreshParams) => void
}
