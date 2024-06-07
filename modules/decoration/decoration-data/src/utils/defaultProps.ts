import { CSSProperties } from 'react'
import { EArrangeType } from '../enums/EArrangeType'
import { EModuleSearcType } from '../enums/EModuleSearcType'
import { IComponentStyle } from '../interfaces/IComponentStyle'
import { BasicModuleImageDTO, IBasicModuleSearch } from '../modules'

/**
 * 获取样式设置-组件样式默认值
 */
export function getDefaultComponetStyle<T extends CSSProperties>(data: Partial<IComponentStyle> = {}, extra?: T): IComponentStyle & T {
  return {
    pagePadding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    ...data,
    ...(extra as any)
  }
}

/**
 * 生成默认搜索模块props
 * @returns
 */
export function getDefaultSearchModuleProps(): IBasicModuleSearch {
  return {
    type: EModuleSearcType.Fixed,
    placeholder: '输入关键词搜索',
    keywords: [],
    componentStyle: getDefaultComponetStyle()
  }
}

/**
 * 获取图片模块默认props
 * @returns
 */
export function getModuleImageDefaultProps(): BasicModuleImageDTO {
  return {
    arrangeType: EArrangeType.Vertical,
    data: [],
    contentStyle: {
      borderRadius: 0,
      imageMargin: 0
    },
    componentStyle: getDefaultComponetStyle()
  }
}
