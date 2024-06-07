import { getIsNewIphone } from './getIsNewIphone'

/**
 * 获取底部安全距离。
 * 有安全区的返回34,其余返回0
 * @export
 * @returns
 */
export function getBottomHeight() {
  return getIsNewIphone() ? 34 : 0
}
