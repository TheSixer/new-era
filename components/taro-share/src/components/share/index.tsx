/**
 * 分享组件
 * @name 分享组件
 * @returns
 */
import { FC, PropsWithChildren, memo, useMemo } from 'react'
import styles from './index.module.less'
import { EShareType, IShareProps } from './const'
import { View, ScrollView, Image, Button } from '@tarojs/components'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import posterImg from './images/poster.png'
import wechatImg from './images/wechat.png'
import linkImg from './images/link.png'

const imgStyle = { width: '48px', height: '48px' }

const imgTypeMap = {
  [EShareType.wechat]: wechatImg,
  [EShareType.wechat]: wechatImg,
  [EShareType.poster]: posterImg,
  [EShareType.link]: linkImg
}

const Component: FC<PropsWithChildren<IShareProps>> = (props) => {
  const { title = '分享', column = 4, scroll = false, cancel = true, options, ...popProps } = props

  const innerOptions = useMemo(() => {
    return (options || []).map((item) => {
      const { type, img = '' } = item
      const imgSrc = img || imgTypeMap[type as any] || ''
      return { ...item, img: imgSrc }
    })
  }, [options])

  const innerPopProps = cancel
    ? {
        footerStyle: { borderTop: '10px solid #f6f6f6' },
        footer: (
          <View className={styles.footerCancel} onClick={() => popProps.onClose?.()}>
            取消
          </View>
        )
      }
    : {}

  // 样式列
  const itemStyle = useMemo(() => {
    const ops = (options || []).length
    return {
      width: !ops ? `100%` : ops < column ? `${(100 / ops).toFixed(5)}%` : `${100 / column}%`
    }
  }, [column, options])

  /** 渲染文本内容 */
  const renderContent = () => {
    return (
      <View className={styles.shareContent} style={{ flexWrap: scroll ? 'nowrap' : 'wrap' }}>
        {innerOptions.map((item, index) => {
          const { img, key, type } = item
          return (
            <View key={key} className={styles.shareItem} style={itemStyle}>
              <View onClick={() => props.onClick?.(item, index)}>
                <View style={imgStyle} className={styles.shareImg}>
                  {img && <Image src={img} style={imgStyle} />}
                </View>

                <View className={styles.shareText}>{item.title}</View>

                {type === EShareType.wechat && <Button openType="share" className={styles.wechatShareButton} />}
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <MMPopup title={title} close={false} {...popProps} {...innerPopProps} noDivider={false}>
      {scroll ? (
        <ScrollView scrollX enhanced showScrollbar={false} style={{ width: '100%' }}>
          {renderContent()}
        </ScrollView>
      ) : (
        renderContent()
      )}
    </MMPopup>
  )
}

Component.displayName = 'MMShare'

const MMShare = memo(Component)
export default MMShare
