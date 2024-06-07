import { FC, memo } from 'react'
import { IMmCategorysProps } from './const'
// import ThirdLevels from './thirdLevels'
import TwoLevels from './twoLevels'

/**
 * 分类筛选组件
 * 这个组件是用于给分类选择。 一般是分类管理。或者商品详情页会显示
 *
 * 根据需求如果需要三级。将上面的三级类目打开即可
 * 分类组件支持两级分类与三级分类。默认提供的是二级分类菜单表现形式
 * 二级菜单
 * 左侧是一级。右侧内容区域是一级分类一集对应的二级分类。右侧内容与左侧会形成滚动联动
 *
 * 三级菜单
 * 左侧是一级。右侧内容区域是二级与三级。右侧内容与左侧没有联动
 * @param props
 * @returns
 */
const Component: FC<IMmCategorysProps> = (props) => {
  return <TwoLevels {...props} />
}

const ShopClassify = memo(Component)
export default ShopClassify
