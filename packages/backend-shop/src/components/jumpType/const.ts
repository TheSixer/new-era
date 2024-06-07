import { EJumpType } from './enums/EJumpType'

export interface JumpTypeProps {
  /** 值 */
  value?: JumpTypeValue
  /** 是否可被清空 */
  clearable?: boolean
  /** 控制显示tab */
  include?: EJumpType[]
  /** 变化事件 */
  onChange?(val: JumpTypeValue): void
}

/** 跳转信息 */
export type JumpTypeValue =
  /** 无 */
  | {
      type: EJumpType.None
      content: Record<string, any>
    }
  /** 系统页面 */
  | {
      type: EJumpType.SystemPage
      content: SystemContent
    }
  /** 自定义链接 */
  | {
      type: EJumpType.CustomLink
      content: CustomLinkValue
    }
  /** 装修 */
  | {
      type: EJumpType.DecorationPage
      content: {
        /** 装修页面id */
        id: number
      }
    }
  /** 分类 */
  | {
      type: EJumpType.GoodCate
      content: GoodCatesContent
    }
  /** 商品详情 */
  | {
      type: EJumpType.GoodDetail
      content: {
        /** 商品id */
        id: number
        /** 商品编号 */
        goodsNo: string
      }
    }

export interface GoodCatesContent {
  /** 分类id */
  categoryNo: string
  /** 分类名称 */
  categoryName: string
  /** 类目层级 */
  level: number
}

export interface CustomLinkValue {
  /** h5链接 */
  h5?: string
  /** appid */
  appId?: string
  /** app页面路径 */
  path?: string
}

export interface SystemContent {
  /** 页面路径 */
  path: string
}
