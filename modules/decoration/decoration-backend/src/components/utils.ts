import { IComponentStyle, ImageLinkDataDTO } from '@wmeimob-modules/decoration-data'
import { EJumpLinkMode } from '@wmeimob-modules/decoration-data/src/enums/EJumpLinkMode'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { guid } from '@wmeimob/utils/src/guid'
import { merge } from 'lodash-es'
import { CSSProperties } from 'react'

export function getDefaultImageLink(data: Partial<ImageLinkDataDTO> = {}): ImageLinkDataDTO {
  return merge(
    {
      key: guid(),
      name: '',
      url: '',
      jumpMode: EJumpLinkMode.Link,
      link: {
        type: EJumpType.None,
        content: ''
      }
    },
    data
  )
}

/** 获取样式设置-组件样式默认值 */
export function getDefaultComponetStyle<T extends CSSProperties>(data: Partial<IComponentStyle> = {}, extra?: T): IComponentStyle & T {
  return {
    pagePadding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    ...data,
    ...(extra as any)
  }
}
