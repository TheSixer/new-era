import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { PropsWithChildren, PureComponent } from 'react'
import MMDivider from '../divider'
import MMIconFont from '../icon-font'
import MMIconFontName from '../icon-font/const'
import MMModal from '../modal'
import { MMModalAnimationType, MMModalJustifyContent } from '../modal/const'
import shopVariable from '../styles/themes/shop.variable'
import { isNewIphone } from '../utils'
import { IMMPopupProps, IMMPopupState } from './const'
import styles from './index.module.less'
import { getGlobalData } from '@wmeimob/taro-global-data'

export default class MMPopup extends PureComponent<PropsWithChildren<IMMPopupProps>, IMMPopupState> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps: Partial<IMMPopupProps> = {
    visible: false,
    title: '',
    subTitle: '',
    contentStyle: {},
    close: true,
    footer: false,
    noPlace: false,
    noDivider: true
  }

  state = {}

  isWeapp= getGlobalData('isWeapp')
  maxContentHeight = this.isWeapp ? Taro.getSystemInfoSync().screenHeight * 0.7 : window.innerHeight * 0.7

  render() {
    const {
      visible,
      title,
      subTitle,
      footer,
      close,
      titleAlign = 'center',
      onClose,
      contentStyle,
      footerStyle,
      className,
      style,
      maskClosable,
      backgroundColor,
      noPlace,
      noDivider
    } = this.props

    const childrenStyle = {
      paddingTop: !!title && !!subTitle ? 15 : 0,
      backgroundColor,
      ...contentStyle
    }

    const divider = noDivider&& <MMDivider style={{ margin: `${shopVariable.spacingLarge / 2}px ${shopVariable.spacingLarge}px` }} />

    return (
      <MMModal
        visible={visible}
        justifyContent={MMModalJustifyContent.flexEnd}
        animationType={MMModalAnimationType.down}
        className={classNames(className)}
        style={style}
        onClose={onClose}
        maskClosable={maskClosable}
      >
        <View className={styles.modalContent} style={{ backgroundColor }}>
          {/* <Image src={getImage('visible_close-Sb5E2k01qN0z.png')} className={styles.icon_close} onClick={onClose} /> */}
          {close && (
            <View className={styles.icon_close} onClick={onClose}>
              <MMIconFont value={MMIconFontName.Close} size={14} color={styles.gray7} />
            </View>
          )}

          {!!title && (
            <View className={styles.title} style={{ textAlign: titleAlign }}>
              {title}
            </View>
          )}

          {divider}

          {!!subTitle && <View className={styles.subTitle}>{subTitle}</View>}

          <ScrollView scrollY className={styles.scrollVeiw} style={{ maxHeight: `${this.maxContentHeight}px` }}>
            <View className={styles.scrollVeiwContent} style={childrenStyle}>
              {this.props.children}
            </View>
          </ScrollView>
        </View>

        {footer && (
          <View className={styles.footer} style={{ backgroundColor, ...footerStyle }}>
            {footer}
          </View>
        )}

        {/* style={{ borderTop: footer ? `1px solid #E6E6E6` : undefined }} */}
        {!noPlace && isNewIphone && <View className="spacingIphone" style={{ backgroundColor: backgroundColor || '#ffffff' }} />}
      </MMModal>
    )
  }
}
