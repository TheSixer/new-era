import { IComponentStyle } from '@wmeimob-modules/decoration-data'
import { CSSProperties, useMemo } from 'react'

/**
 * 样式设置hook.用于处理样式
 *
 * @export
 * @param {IComponentStyle} data
 * @return {*}
 */
export default function useComponentStyle(data: IComponentStyle) {
  const style = useMemo(() => {
    const { paddingBottom, paddingTop, pagePadding, ...rest } = data
    return {
      paddingBottom,
      paddingTop,
      paddingLeft: `${pagePadding}px`,
      paddingRight: `${pagePadding}px`,
      ...rest
    } as CSSProperties
  }, [data])

  return { style }
}
