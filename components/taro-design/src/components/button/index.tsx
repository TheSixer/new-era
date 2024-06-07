/* eslint-disable no-nested-ternary */
import { View } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import { CSSProperties, PropsWithChildren, PureComponent } from 'react'
import { autobind, lock } from '@wmeimob/decorator'
import classnames from 'classnames'
import MMLoading from '../loading'
import { IButtonProps, MMButtonSize, MMButtonType } from './const'
import styles from './index.modules.less'

/**
 * @name 按钮
 */
@autobind
export default class MMButton extends PureComponent<PropsWithChildren<IButtonProps>> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps: Partial<IButtonProps> = {
    type: MMButtonType.primary,
    size: MMButtonSize.default,
    ghost: false,
    backGround: '',
    noBorder: false
  }

  state = {}

  /**
   * 按钮颜色
   * 参数优先级 color > type
   * ghost 参数会改变背景、字体和边框颜色
   *
   */
  get colorStyle() {
    const { color, ghost, type, backGround, noBorder } = this.props
    let { background, fontColor, borderColor } = {
      [MMButtonType.primary]: {
        background: styles.primaryColor,
        borderColor: styles.primaryColor,
        fontColor: '#ffffff'
      },
      [MMButtonType.warning]: {
        background: styles.yellow,
        borderColor: styles.yellow,
        fontColor: '#ffffff'
      },
      [MMButtonType.default]: {
        background: '#ffffff',
        borderColor: styles.gray4,
        fontColor: styles.gray6
      },
      [MMButtonType.failure]: {
        background: '#CECECE',
        borderColor: '',
        fontColor: '#ffffff'
      },
      [MMButtonType.h5Blue]: {
        background: styles.webButtonBlueGradient,
        borderColor: '',
        fontColor: '#ffffff'
      },
      [MMButtonType.h5Blue2]: {
        background: styles.webButtonBlueGradient2,
        borderColor: '',
        fontColor: '#ffffff'
      },
      [MMButtonType.h5Blue3]: {
        background: styles.webButtonBlueGradient3,
        borderColor: '',
        fontColor: '#ffffff'
      },
      [MMButtonType.h5Red]: {
        background: styles.webButtonRedGradient,
        borderColor: '',
        fontColor: '#ffffff'
      }
    }[type!]

    if (color) {
      background = color
      borderColor = color
    }

    if (backGround) {
      background = backGround
    }

    if (ghost) {
      fontColor = borderColor
      background = '#ffffff'
    }
    if (noBorder) {
      borderColor = ''
    }
    return {
      background,
      color: fontColor,
      borderColor
    }
  }

  get buttonStyle(): CSSProperties {
    const { radius, style, block } = this.props

    return {
      display: block ? 'block' : 'inline-block',
      borderRadius: typeof radius === 'number' ? radius : radius === false ? 0 : undefined,
      ...this.colorStyle,
      ...(style as any)
    }
  }

  render() {
    const { loading, text, disabled, size, className } = this.props
    const rootClass = classnames(styles.MMButton, styles[size!], disabled && styles.disabled, className)

    return (
      <View className={rootClass} style={this.buttonStyle} onClick={this.onClick}>
        <View className={styles.MMButton_content}>
          {loading && (
            <View className={styles.MMButton_loading}>
              <MMLoading gray size={styles.loadingSize} />
            </View>
          )}

          <View>{this.props.children || text}</View>
        </View>
      </View>
    )
  }

  @lock()
  private onClick(event: ITouchEvent) {
    if (this.props.disabled) {
      return
    }
    return this.props.onClick?.(event)
  }
}
