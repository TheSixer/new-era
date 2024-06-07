import { View } from '@tarojs/components'
import { FC, memo } from 'react'
import { IHotZoneValue } from '@wmeimob-modules/decoration-data'
import { EJumpLinkMode } from '@wmeimob-modules/decoration-data/src/enums/EJumpLinkMode'
import styles from './index.module.less'

export interface IHotZoneProps {
  data?: IHotZoneValue[]
  /** 跳转类型 */
  mode?: EJumpLinkMode
  /** 点击热区 */
  onClick(data: IHotZoneValue): void
}

/**
 * 热区组件
 * @param props
 * @returns
 */
const Component: FC<IHotZoneProps> = (props) => {
  const { data, mode = EJumpLinkMode.HotZone } = props

  return mode === EJumpLinkMode.HotZone && !!data?.length ? (
    <View className={styles.hotZoneStyle}>
      {data.map((item) => (
        <View
          key={item.id}
          className={styles.item}
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            width: `${item.width}%`,
            height: `${item.height}%`
          }}
          onClick={(ev) => {
            ev.stopPropagation()
            props.onClick(item)
          }}
        />
      ))}
    </View>
  ) : null
}

const HotZone = memo(Component)
export default HotZone
