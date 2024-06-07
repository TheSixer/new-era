import { Text, View } from '@tarojs/components'
import { FC, memo, useEffect } from 'react'
import classNames from 'classnames'
import styles from './index.modules.less'
import { IMMActionSheetProps } from './const'
import MMPopup from '../popup'
import MMCell from '../cell'
import { isNewIphone } from '../utils'

/**
 * @name 动作面板
 */
const Component: FC<IMMActionSheetProps> = props => {
  const { title = '', actions = [], footer, visible, onOpened, onClosed, onSelect } = props

  const contentClassName = () => {
    const classNameArray = [styles.MMActionSheet]
    if (!visible) {
      classNameArray.push(styles.content__hide)
    }
    return classNames(...classNameArray)
  }

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        onOpened?.()
      }, 200)
    }
  }, [visible])

  return (
    <MMPopup
      title={title}
      visible={visible}
      close={false}
      contentStyle={{ padding: 0 }}
      onClose={onClosed}
      footerStyle={{ padding: 0, borderTop: 'none' }}
      footer={
        footer !== false && (
          <View>
            <View onClick={onClosed}>
              {footer || (
                <MMCell valueAlign="center" size="large">
                  取消
                </MMCell>
              )}
            </View>
          </View>
        )
      }
    >
      <View className={contentClassName()}>
        {actions.map((value, index) => (
          <MMCell valueAlign="center" noStyle onClick={() => onSelect?.(value, index)} key={value.id + index} size="large" border={index < actions.length - 1}>
            <Text style={{ fontSize: 15, lineHeight: '30px' }}>{value.text}</Text>
          </MMCell>
        ))}
      </View>
      {isNewIphone && <View className={styles.gap} />}
    </MMPopup>
  )
}

const MMActionSheet = memo(Component)
export default MMActionSheet
