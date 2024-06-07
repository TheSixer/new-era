import { memo, FC } from 'react'
import { Image, View } from '@tarojs/components'
import { IOverlayProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/components/navigation'
import MMCell from '~/components/cell'
import { H2 } from '~/components'
import MMSpace from '~/components/space'
import MMIconFont from '~/components/icon-font'
import MMIconFontName from '~/components/icon-font/const'
import pocket from './pocket.png'

/**
 * Overlay 遮罩层
 *
 * 创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。
 */
const Component: FC<any> = props => {
  return (
    <View className={styles.page}>
      <MMNavigation>单元格</MMNavigation>
      <MMCell title="单元格">内容</MMCell>
      <MMCell title="单元格" placeholder="placeholder" />
      <MMCell title="带边框" border />
      <MMCell title="带箭头" arrow />
      <MMCell title="icon" icon={<MMIconFont value={MMIconFontName.Admin} size={14} />} />
      <View className="spacing" />
      <H2>尺寸</H2>
      <MMSpace direction="column">
        <MMCell title="large" size="large" />
        <MMCell title="default" size="default" />
        <MMCell title="small" size="small" />
      </MMSpace>

      <View className="spacing" />
      <H2>内容对齐方式</H2>
      <MMSpace direction="column">
        <MMCell title="左对齐" valueAlign="left">
          left
        </MMCell>
        <MMCell title="居中" valueAlign="center">
          center
        </MMCell>
        <MMCell title="居右（默认）" valueAlign="right">
          right
        </MMCell>
      </MMSpace>

      <View className="spacing" />
      <H2>标题对齐方式</H2>
      <MMSpace direction="column">
        <MMCell title="上对齐" titleAlign="top">
          <View style={{ height: 50 }}>1111</View>
        </MMCell>
        <MMCell title="居中" titleAlign="center">
          <View style={{ height: 50 }}>1111</View>
        </MMCell>
        <MMCell title="居下" titleAlign="bottom">
          <View style={{ height: 50 }}>1111</View>
        </MMCell>
      </MMSpace>

      <View className="spacing" />
      <H2>高级</H2>
      <MMSpace direction="column">
        <MMCell
          icon={<Image src={pocket} style={{ width: 19, height: 16 }} />}
          title={
            <View>
              <View
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#666666'
                }}
              >
                我的钱包
              </View>
              <View
                style={{
                  fontSize: 14,
                  color: '#333333'
                }}
              >
                ¥50
              </View>
            </View>
          }
          placeholder="提现"
          arrow
        />
      </MMSpace>
    </View>
  )
}

const Overlay = memo(Component)
export default Overlay
