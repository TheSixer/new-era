import { View } from '@tarojs/components'
import { FC, memo, useMemo } from 'react'
import styles from './index.modules.less'
import { ELoadingType, MMLoadingProps } from './const'
import classNames from 'classnames'

/**
 * @name 加载中
 *
 * @description 可以左右滑动来展示操作按钮的单元格组件。
 * @param {*} props
 * @return {*}
 */
const Component: FC<MMLoadingProps> = props => {
  const { size = 25, type = ELoadingType.fadeDot, color, gray = false } = props

  /**
   * loading的样式
   * color属性优先级最高
   * 如果是jelly类型 设置在background-color上
   * 如果是其他类型 设置在color属性上
   */
  const loadingColorStyle = useMemo(() => {
    const loadingColor = color || gray ? styles.gray2 : undefined

    const styleKey =
      {
        [ELoadingType.jelly]: 'backgroundColor',
        [ELoadingType.fadeDot]: 'backgroundColor',
        [ELoadingType.ball]: 'backgroundColor',
        [ELoadingType.rotate]: 'borderTopColor'
      }[type] || 'color'

    return {
      [styleKey]: loadingColor
    }
  }, [color, type, gray])

  const rootStyle = { width: size + 'px', height: size + 'px' }

  if (type === ELoadingType.ball) {
    return (
      <View className={styles.balls} style={rootStyle}>
        {[...Array(3)].map((item, index) => (
          <View key={item + index} className={classNames(styles.ballItem, styles[`ballItem_${index + 1}`])} style={loadingColorStyle} />
        ))}
      </View>
    )
  }

  if (type === ELoadingType.rotate) {
    return <View className={styles.rotate} style={{ ...rootStyle, ...loadingColorStyle }} />
  }

  if (type === ELoadingType.fadeDot) {
    return (
      <View className={styles.fadeDot} style={rootStyle}>
        {[...Array(3)].map((item, index) => (
          <View key={item + index} className={classNames(styles.dot, styles[`dot_${index + 1}`])} style={loadingColorStyle} />
        ))}
      </View>
    )
  }

  if (type === ELoadingType.spinner) {
    return (
      <View className={styles.spinner} style={{ ...rootStyle, ...loadingColorStyle }}>
        {[...Array(12)].map((item, index) => (
          <View key={item + index} className={styles[`spinnerItemIndex_${index + 1}`]} />
        ))}
      </View>
    )
  }

  return (
    <View className={styles.loading} style={rootStyle}>
      <View className={styles.content} style={loadingColorStyle} />
      <View className={styles.shadow} />
    </View>
  )
}

const MMLoading = memo(Component)
export default MMLoading
