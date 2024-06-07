import { View, Text, Image } from '@tarojs/components'
import { getDefaultModuleTitleProps, IBasicModuleTitleProps } from './const'
import styles from './index.module.less'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import { getResizeUrl } from '@wmeimob/aliyun'
import { navByLink } from '../../utils'
import IconFontName from '@wmeimob/taro-design/src/components/icon-font/name'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import { PageContext } from '../../const'
import { useContext, FC } from 'react'

const Component: FC<IBasicModuleTitleProps> = (props) => {
  const { name, left, right, link, contentStyle, componentStyle } = props

  const { backgroundColor, fontSize, ...restStyle } = contentStyle || {}
  const { content: rightContent, showArrow } = right || {}

  const size = 20
  const sizePx = `${size}px`

  const { style } = useComponentStyle(componentStyle)
  const { pageType, pageParams } = useContext(PageContext)

  function handleClick() {
    navByLink(link.type, link.content, { pageType, ...pageParams })
  }

  return (
    <View className={styles.basicModuleTitleStyle} style={style}>
      <View className={styles.content} style={{ backgroundColor }}>
        {left && left.show && (
          <View className={styles.left}>
            {left.image ? (
              <Image src={left.image + getResizeUrl({ width: size, height: size })} style={{ width: sizePx, height: sizePx }} />
            ) : (
              <MMIconFont value={left.icon} size={size} color={restStyle.color} />
            )}
          </View>
        )}

        <View className={styles.text} style={{ ...restStyle, fontSize: `${fontSize}px` }}>
          {name}
        </View>

        <View className={styles.right} onClick={handleClick}>
          {!!rightContent && <Text className={styles.rightContent}>{rightContent}</Text>}
          {showArrow && <MMIconFont value={IconFontName.Next} size={12} color="#cccccc" />}
        </View>
      </View>
    </View>
  )
}

Component.options = {
  addGlobalClass: true
}
Component.defaultProps = getDefaultModuleTitleProps()

const BasicModuleTitle = Component
export default BasicModuleTitle
