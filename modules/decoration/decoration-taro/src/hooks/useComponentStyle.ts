import { IComponentStyle } from '@wmeimob-modules/decoration-data'
import { CSSProperties } from 'react'

interface IuseComponentStyle {
  style: CSSProperties
  css: Pick<CSSProperties, 'paddingTop' | 'paddingLeft' | 'paddingRight' | 'paddingBottom'>
}

/**
 * 样式设置hook.用于处理样式
 *
 * @export
 * @param {IComponentStyle} data
 * @return {*}
 */
export default function useComponentStyle(data: IComponentStyle): IuseComponentStyle {
  const { paddingBottom: pb, paddingTop: pt, pagePadding: pp, ...rest } = data

  const paddingTop = `${data.paddingTop}px`
  const paddingRight = `${data.pagePadding}px`
  const paddingBottom = `${data.paddingBottom}px`
  const paddingLeft = `${data.pagePadding}px`

  return {
    style: {
      paddingTop,
      paddingRight,
      paddingLeft,
      paddingBottom,
      ...rest
    },
    css: {
      paddingTop,
      paddingRight,
      paddingLeft,
      paddingBottom
    }
  }
}
