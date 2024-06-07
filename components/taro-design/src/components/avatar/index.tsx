import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.less'
import { EMMAvatarShape, EMMAvatarSize } from './const'
import MMIconFontName from '../icon-font/name'
import MMIconFont from '../icon-font'
import { Properties } from 'csstype'
import avatar from './avatar.png'

interface IMMAvatarProps {
  /**
   * 形状
   *
   * @default square
   */
  shape?: EMMAvatarShape | keyof typeof EMMAvatarShape

  /**
   * 大小
   */
  size?: EMMAvatarSize | keyof typeof EMMAvatarSize | number

  /**
   * icon 名称
   */
  icon?: MMIconFontName

  /**
   * 图片类头像的资源地址
   */
  src?: string

  /**
   * 头像内文本内容
   */
  text?: string

  /**
   * 额外样式。可以对color 和backgroundColor 进行设置
   */
  avatarStyle?: Properties<string | number>

  onClick?(): void
}

/**
 * @name  头像
 */
export default function MMAvatar(props: IMMAvatarProps) {
  const { shape = EMMAvatarShape.square, size = EMMAvatarSize.default, icon = MMIconFontName.Admin, src = '', text = '', avatarStyle = {} } = props

  let width = 32
  let iconSize = 18
  if (typeof size === 'number') {
    width = size
    iconSize = size
  } else if (size === EMMAvatarSize.large) {
    width = 40
    iconSize = 24
  } else if (size === EMMAvatarSize.small) {
    width = 24
    iconSize = 14
  }

  const viewStyle = {
    ...avatarStyle,
    borderRadius: shape === EMMAvatarShape.circle ? '50%' : '',
    width: `${width}px`,
    height: `${width}px`
    // padding: src ? '' : '5px'
  }

  const imgStyle = {
    backgroundImage: `url(${src})`
  }

  return (
    <View className={styles.MMavatar} style={viewStyle} onClick={props.onClick}>
      <View className={styles.content}>
        {src && <View style={imgStyle} className={styles.img} />}
        {!src && text && <Text>{text}</Text>}
        {!src && !text && <Image src={avatar} style={{width:`${iconSize}px`,height:`${iconSize}px`}}/> }
        {/*<MMIconFont value={icon} size={iconSize} />*/}
      </View>
    </View>
  )
}
