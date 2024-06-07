import { memo, FC, ReactNode, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import classNames from 'classnames'

export interface IIndexBarBriefsProps {
  /** 当前激活的索引 */
  index?: string

  /** 描述项 */
  data: { brief?: ReactNode; index: string }[]

  /**
   * 点击描述项
   * @param index
   */
  onClick(index: string): void
}

/**
 * name 索引栏
 */
const Component: FC<PropsWithChildren<IIndexBarBriefsProps>> = (props) => {
  const { data } = props

  return (
    <View
      className={styles.indexBarBriefsStyle}
      onClick={(ev) => {
        ev.stopPropagation()
      }}
    >
      {data.map((item) => {
        return (
          <View
            key={item.index}
            onClick={() => {
              props.onClick(item.index)
            }}
            className={classNames(styles.brief_item, item.index === props.index && styles.acitve)}
          >
            {item.brief || item.index}

            {item.index === props.index && (
              <View className={styles.brief_pin_wrapper}>
                <View className={styles.brief_pin} />
                <View className={styles.brief_pin_content}>{item.brief || item.index}</View>
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

const MMIndexBarBriefs = memo(Component)
MMIndexBarBriefs.displayName = 'MMIndexBarBriefs'
export default MMIndexBarBriefs
