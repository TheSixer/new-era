import { Image, Text, View } from '@tarojs/components'
import { useAtomValue } from 'jotai'
import { FC, memo } from 'react'
import { isAlreadySignAtom, isEnableSignTaskAtom } from '../../store'
import icon_sign from './images/icon_sign.png'
import styles from './index.module.less'

interface ISignButtonProps {}

const Component: FC<ISignButtonProps> = (props) => {
  const isEnableSignTask = useAtomValue(isEnableSignTaskAtom)
  const isAlreadySign = useAtomValue(isAlreadySignAtom)
  if (!isEnableSignTask) {
    return null
  }

  if (isAlreadySign) {
    return (
      <View className={styles.signFinishButton}>
        <Text>已签到</Text>
      </View>
    )
  }

  return (
    <View className={styles.signButton}>
      <Image src={icon_sign} className={styles.icon_sign} />
      <Text>签到</Text>
    </View>
  )
}

const SignButton = memo(Component)
export default SignButton
