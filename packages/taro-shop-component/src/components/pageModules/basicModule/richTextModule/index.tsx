import { memo, FC } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IBasicModuleRichText } from '@wmeimob-modules/decoration-data'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import MMRichText from '../../../richText'

interface IRichTextModuleProps extends IBasicModuleRichText {}

const Component: FC<IRichTextModuleProps> = (props) => {
  const { data, componentStyle } = props

  const { style } = useComponentStyle(componentStyle)

  return (
    <View className={styles.richTextModuleStyle} style={style}>
      <MMRichText html={data} />
    </View>
  )
}

const RichTextModule = memo(Component)
export default RichTextModule
