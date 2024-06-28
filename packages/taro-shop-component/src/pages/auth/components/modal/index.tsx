import { memo, FC } from 'react'
import { View, Button } from '@tarojs/components'
import { IModalCodeProps } from './const'
import styles from './index.module.less'
import MMOverlay from '@wmeimob/taro-design/src/components/overlay'
import classNames from 'classnames'

const Component: FC<IModalCodeProps> = (props) => {
  const { visible, title, content, onConfirm, onClose } = props

  return (
    <MMOverlay visible={!!visible} onClick={onClose}>
      <View className={styles.container}>
        <View className={styles.modal_body}>
          <View className={styles.header}>{title}</View>
          <View className={styles.content}>{content}</View>

          <View className={styles.footer}>
            <Button className={classNames(styles.btn, styles.cancel)} onClick={() => onClose?.()}>取消</Button>
            <Button className={classNames(styles.btn, styles.confirm)} onClick={() => onConfirm?.()}>确定</Button>
            </View>

        </View>
      </View>
    </MMOverlay>
  )
}

const PopupAds = memo(Component)
export default PopupAds
