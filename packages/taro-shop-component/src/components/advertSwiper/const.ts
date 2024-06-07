import { EAdvertisingPosition } from '@wmeimob/shop-data/src/enums/EAdvertisingPosition'

export interface IAdvertSwiperProps {
  type: EAdvertisingPosition | keyof typeof EAdvertisingPosition

  style?: any

  className?: any
}
