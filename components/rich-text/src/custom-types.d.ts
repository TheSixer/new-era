import { SlateDescendant, SlateElement, SlateText } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
  // 扩展 Element
  interface SlateElementAudio {
    type?: 'audio'
    src?: 'string'
    children: SlateDescendant[]
  }
}
