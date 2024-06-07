import { View } from '@tarojs/components';
import { useMemo, useEffect, useState, useCallback, memo } from 'react'
import IconFontName from '../icon-font/const';
import cns from './index.module.less';
import classNames from 'classnames';
import { MMPopoverType } from './const';
import MMIconFont from '../icon-font';
import { selectRect } from '../utils';
import Taro, { getCurrentInstance } from '@tarojs/taro';

interface IProps {
  /**
   * 是否显示
   *
   * @type {boolean}
   * @memberof IModalProps
   */
  visible?: boolean;

  /**
   * 数据
   *
   * @type {{ value: string, iconfont: IconFontName }[]}
   * @memberof IMMPopoverProps
   */
  data?: { value: string, iconfont: IconFontName }[]

  /**
   * 点击事件
   *
   * @memberof IMMPopoverProps
   */
  onClick?: (value: { value: string, iconfont: IconFontName }, index: number) => void

  /**
   * 类型
   *
   * @type {MMPopoverType}
   * @memberof IMMPopoverProps
   */
  type?: MMPopoverType
}

/**
 * @name 气泡
 */
export default memo(({
  visible,
  data,
  onClick,
  type,
}: IProps) => {

  const [isRight, setIsRight] = useState(false)

  const initPosition = useCallback(async () => {
    const topViewRes = await selectRect('#MMPopover', getCurrentInstance().page);
    const { screenWidth } = Taro.getSystemInfoSync();
    if (screenWidth - topViewRes.right < 10) setIsRight(true)
  }, [])

  useEffect(() => {
    initPosition()
  }, [initPosition])

  const className = useMemo(() => classNames(
    cns.MMPopover,
    isRight && cns.MMPopoverRight,
    type === MMPopoverType.black && cns.MMPopoverBlack,
    visible && cns.visible
  ), [type, visible, isRight])

  return <View
    className={className}>
    <View id="MMPopover" className={cns.queryView} />
    {data?.map((value, index) => <View className={cns.item}
      onClick={() => onClick?.(value, index)}
      key={value.value}>
      <View className={cns.iconfontView}>
        <MMIconFont value={value.iconfont} size={22} />
      </View>
      <View>
        {value.value}
      </View>
    </View>)}
    <View className={cns.arrow} />
  </View>;
})

