import { View, Image, Text } from '@tarojs/components'
import { MemCardDto } from '@wmeimob/taro-api'
import { FC, memo } from 'react'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import styles from './index.module.less'

interface IMemberCardProps {
  data: MemCardDto

  /** 点击查看权益按钮 */
  onShowClick(): void
}

const Component: FC<IMemberCardProps> = (props) => {
  const { data } = props

  const iconStyle = { width: 100, height: 100 }

  return (
    <View className={styles.memberCardStyle} style={{ backgroundImage: data.bgUrl ? `url(${data.bgUrl})` : undefined }}>
      <View className={styles.left}>
        <Text className={styles.head_name}>{data.name}</Text>

        <View onClick={props.onShowClick} className={styles.button}>
          查看权益
        </View>
      </View>

      {!!data.icon && <Image src={data.icon + getResizeUrl(iconStyle)} style={{ margin: '0 10px', ...iconStyle }} />}
    </View>
  )
}

const MemberCard = memo(Component)
export default MemberCard
