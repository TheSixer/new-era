import { FC } from 'react'
import GoodsPrice, { IGoodsPriceProps } from '@wmeimob-modules/goods-taro/src/components/goodsPrice'

const Component: FC<IGoodsPriceProps> = (props) => {
  return <GoodsPrice {...props}></GoodsPrice>
}

export default Component
