import { memo, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { IETagfoProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'

const Component: FC<IETagfoProps> = (props) => {
    const { type, text, classname } = props

  return (
    <View className={classNames(styles.event_tag, classname, {[styles.event_tag_before]: type === 0}, {[styles.event_tag_after]: type === 2})}>
        <Text>{text}</Text>
    </View>
  )
}

const EventInfo = memo(Component)
export default EventInfo
