import { Image } from '@tarojs/components';
import ArrowDown from './svgs/arrow-down.svg';
import BlackArrowDown from './svgs/arrow-down-black.svg';
import Position from './svgs/position.svg';
import ArrowRight from './svgs/arrow-right.svg'
import SelectArrow from './svgs/select-arrow.svg'
import Edit from './svgs/edit.svg'
import Arrow from './svgs/arrow.svg'
import Special from './svgs/special.svg'
import { IconProps } from './const';

export const ArrowDownFilled = ({ width = '30rpx', height = '30rpx', className, style }: IconProps) => (
  <Image src={ArrowDown} className={className} style={{...(style || {}), width, height}} mode="aspectFit" />
);

export const BlackArrowDownFilled = ({ width = '30rpx', height = '30rpx', className }: IconProps) => (
  <Image src={BlackArrowDown} className={className} style={{width, height}} mode="aspectFit" />
);

export const PositionFilled = ({ width = '30rpx', height = '30rpx', className }: IconProps) => (
  <Image src={Position} className={className} style={{width, height}} mode="aspectFit" />
);

export const ArrowRightFilled = ({ width = '24rpx', height = '24rpx', className }: IconProps) => (
  <Image src={ArrowRight} className={className} style={{width, height}} mode="aspectFit" />
);

export const SelectArrowFilled = ({ width = '24rpx', height = '24rpx', className }: IconProps) => (
  <Image src={SelectArrow} className={className} style={{width, height}} mode="aspectFit" />
);

export const EditFilled = ({ width = '24rpx', height = '24rpx', className }: IconProps) => (
  <Image src={Edit} className={className} style={{width, height}} mode="aspectFit" />
);

export const ArrowFilled = ({ width = '24rpx', height = '24rpx', className }: IconProps) => (
  <Image src={Arrow} className={className} style={{width, height}} mode="aspectFit" />
);

export const SpecialFilled = ({ width = '24rpx', height = '24rpx', className }: IconProps) => (
  <Image src={Special} className={className} style={{width, height}} mode="aspectFit" />
);
