import { FC } from 'react'
import { View } from '@tarojs/components'
import MMNavigation from '~/components/navigation'
import H2 from '~/components/head/h2'
import MMAvatar from '~/components/avatar'
import MMIconFontName from '~/components/icon-font/name'

const MMPAvatar: FC<any> = () => {
  return (
    <View>
      <MMNavigation title="按钮" />
      <View className="container">
        <View className="spacing" />
        <H2>头像有三种尺寸，两种形状可选</H2>
        <View className="spacingSmall" />
        <View className="flexJS">
          <MMAvatar size={64} />
          <MMAvatar size="large" />
          <MMAvatar />
          <MMAvatar size="small" />
        </View>
        <View className="spacingSmall" />
        <View className="flexJS">
          <MMAvatar size={64} shape="circle" />
          <MMAvatar size="large" shape="circle" />
          <MMAvatar shape="circle" />
          <MMAvatar size="small" shape="circle" />
        </View>
        <H2>支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色</H2>
        <View className="spacingSmall" />
        <View className="flexJS">
          <MMAvatar />
          <MMAvatar text="头像" size={40} />
          <MMAvatar src="https://wmm-mock.oss-cn-shanghai.aliyuncs.com/mock/head0.png" />
          <MMAvatar text="U" avatarStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }} />
          <MMAvatar icon={MMIconFontName.Index} avatarStyle={{ backgroundColor: '#87d068' }} />
        </View>
      </View>
    </View>
  )
}

MMPAvatar.config = {
  navigationBarTitleText: '',
  navigationStyle: 'custom'
}

export default MMPAvatar
