import { CSSProperties, memo, PropsWithChildren, useMemo, FC } from 'react'
import { View, Image } from '@tarojs/components'
import { ICellProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import arrowIcon from './images/arrow.png'

/**
 * Cell 单元格
 *
 * 单元格为列表中的单个展示项。
 * @param props
 * @returns
 */
const Component: FC<PropsWithChildren<ICellProps>> = (props) => {
  const { title = '', titleAlign = 'center', valueAlign = 'right', noStyle, className, style, arrow = false, placeholder = '', icon, onClick } = props

  const alignItems = { top: 'flex-start', center: 'center', baseline: 'baseline', bottom: 'flex-end' }[titleAlign]

  const valueStyle = useMemo<CSSProperties>(
    () => ({
      justifyContent: { right: 'flex-end', center: 'center', left: 'flex-start' }[valueAlign],
      textAlign: valueAlign
    }),
    [valueAlign]
  )

  return (
    <View className={classNames(styles.cellStyle, noStyle && styles.noStyle, styles[props.size || ''], className)} style={style} onClick={onClick}>
      <View className={classNames(styles.warpper, props.border && styles.border)} style={{ alignItems }}>
        {icon?icon:''}

        {title && (
          <View className={styles.title} style={{ marginLeft: icon ? 10 : 0 }}>
            {title}
          </View>
        )}

        <View className={styles.value} style={valueStyle}>
          {props.children !== undefined ? props.children : <View className={styles.placeholder}>{placeholder}</View>}
        </View>

        {arrow && <Image className={styles.arrow} src={arrowIcon} style={{ marginLeft: 12, ...props.arrowStyle }} />}
      </View>
    </View>
  )
}

const MMCell = memo(Component)
MMCell.displayName = 'MMCell'
export default MMCell
