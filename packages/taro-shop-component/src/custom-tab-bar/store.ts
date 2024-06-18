import { atom, useAtom } from 'jotai'
import { routeNames } from '../routes'
import categoryIcon from './images/tabbar_logo.png'
import categoryActiveIcon from './images/tabbar_home_logo.png'
import homeIcon from './images/home.svg'
import homeAcitveIcon from './images/home_active.svg'
import myIcon from './images/mine.svg'
import myActiveIcon from './images/mine_active.svg'

export interface IMMTabBarData {
  /** 图标 */
  image: any

  /** 选中时候的样式 */
  imageSelected: any

  /** 文字 */
  text: string

  /** 跳转连接 */
  url: string

  /** 红点 */
  redHot?: boolean

  /** 未读数 */
  count?: number
}

export const defaultTabbarData = [
  {
    image: homeIcon,
    imageSelected: homeAcitveIcon,
    url: 'hide',
    text: '积分'
  },
  {
    image: categoryIcon,
    imageSelected: categoryActiveIcon,
    url: routeNames.tabBarHome,
    text: ''
  },
  {
    image: myIcon,
    imageSelected: myActiveIcon,
    url: routeNames.tabBarMine,
    text: '我的'
  }
]

export const tabbarData = atom<IMMTabBarData[]>(defaultTabbarData)
export const tabbarIndex = atom<number>(0)

export default function useTabbar() {
  const [data, setData] = useAtom(tabbarData)
  const [current, setCurrent] = useAtom(tabbarIndex)

  function setCount(index: number, count: number) {
    setData(
      data.map((value, dataIndex) => {
        if (index === dataIndex) {
          value.count = count
        }
        return value
      })
    )
  }

  function setRedDot(index: number, redHot: boolean) {
    setData(
      data.map((value, dataIndex) => {
        if (index === dataIndex) {
          value.redHot = redHot
        }
        return value
      })
    )
  }

  // useDidShow(() => {
  //   const route = Taro.getCurrentPages()[0].route;
  //   route && setCurrent(defaultTabbarData.findIndex(value => value.url === "/" + route) ?? current);
  // })

  return {
    data,
    current,
    setData,
    setRedDot,
    setCount,
    setCurrentValue: setCurrent
  }
}
