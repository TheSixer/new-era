import { FC, memo } from 'react'
import { Image, Text, View } from '@tarojs/components'
import { ISignToastProps } from './const'
import styles from './index.module.less'
import MMOverlay from '@wmeimob/taro-design/src/components/overlay'
import sign_bg from '../../images/sign_bg.png'
import MMButton from '@wmeimob/taro-design/src/components/button'

const Component: FC<ISignToastProps> = (props) => {
  const { visible, setVisible } = props

  return (
    <MMOverlay visible={visible}>
      <View className={styles.dialogStyle}>
        <View className={styles.dialogStyle_wrapper}>
          <View className={styles.dialogStyle_content_wrapper}>
            <Image src={sign_bg} className={styles.dialog_image} />
            <Text className={styles.sign_text}>今日签到成功</Text>
            <MMButton
              noBorder
              className={styles.dialog_button}
              block
              onClick={() => {
                setVisible(false)
              }}
            >
              确定
            </MMButton>
          </View>
        </View>
      </View>
    </MMOverlay>
  )
}

const SignToast = memo(Component)
export default SignToast
