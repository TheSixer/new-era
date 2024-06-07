import { ReactNode } from "react";
import { Event } from 'clipboard'

export interface IClipboardProps {
  /** 复制的文本 */
  text: string;
  /** 复制成功 */
  onSuccess?(text: string, event: Event): void;
  /** 复制出错 */
  onError?(event: Event): void;

  children?: ReactNode
}
