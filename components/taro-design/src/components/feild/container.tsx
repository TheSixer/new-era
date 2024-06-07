import { CSSProperties, memo, ReactNode, useMemo, FC } from 'react'
import { View } from '@tarojs/components'
import { IFeildContainerProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import MMIconFont from '../icon-font'
import MMIconFontName from '../icon-font/const'
import FeildLabel from './label'
import shopVariable from '../styles/themes/shop.variable'

/**
 *
 * Field 输入框
 * 用户可以在文本框内输入或编辑文字。
 * @param props
 * @returns
 */
const Component: FC<IFeildContainerProps & { renderProps: ReactNode; errorMsg: string }> = (props) => {
  const { label = '', labelStyle = {}, size = 'default', noStyle = false, suffix = false, border = false, valueAlign = 'right' } = props

  const valueStyle = useMemo<CSSProperties>(
    () => ({
      justifyContent: { right: 'flex-end', center: 'center', left: 'flex-start' }[valueAlign],
      textAlign: valueAlign
    }),
    [valueAlign]
  )

  const renderSuffix = suffix === true || (!!suffix && typeof suffix !== 'boolean')

  return (
    <View className={classNames(styles.feildStyle, styles[size], noStyle && styles.noStyle, props.className)} style={props.style}>
      <View className={classNames(styles.feildStyle_content, border && styles.border)}>
        <View className={styles.feildStyle_mainContent}>
          {/* 标题 */}
          {!!label && <FeildLabel label={label} labelStyle={labelStyle} required={props.required} />}

          {/* 值区域 */}
          <View className={styles.feildStyle_value}>
            <View className={styles.feildStyle_value_wrapper} style={valueStyle}>
              {props.renderProps}
            </View>
            {/*
            <View className={styles.error} style={{ height: !props.errorMsg ? 0 : 30 }}>
              <View style={{ padding: '2px 0' }}>{props.errorMsg}</View>
            </View> */}
          </View>
          {/* 后缀 */}
          {renderSuffix && (
            <View style={{ paddingLeft: shopVariable.spacingSmall }}>
              {suffix === true && <MMIconFont style={{ marginLeft: shopVariable.spacingSmall }} value={MMIconFontName.Next} size={10} color={styles.gray4} />}
              {typeof suffix !== 'boolean' && suffix}
            </View>
          )}
        </View>

        {props.children && <View className={styles.children}>{props.children}</View>}
      </View>
    </View>
  )
}

const FeildContainer = memo(Component)
export default FeildContainer
