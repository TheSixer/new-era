import { View } from '@tarojs/components'
import { Dialog, MMRichText } from '@wmeimob/taro-design'
import { IComponentProps } from '@wmeimob/taro-design/src/components/types'
import classNames from 'classnames'
import { FC, memo, useState } from 'react'
import styles from './index.module.less'

interface IActivityExplainDialogProps extends IComponentProps {
  explain?: string
}

const Component: FC<IActivityExplainDialogProps> = (props) => {
  const { explain = '' } = props

  const [visible, setVisible] = useState(false)

  return (
    <>
      <View className={classNames(styles.explain, props.className)} style={props.style} onClick={() => setVisible(true)}>
        活动说明
      </View>

      <Dialog title="活动说明" visible={visible} closeable footer={false} onCancel={() => setVisible(false)}>
        <View className={styles.explain_detail}>{visible && <MMRichText html={explain} />}</View>
      </Dialog>
    </>
  )
}

const ActivityExplainDialog = memo(Component)

export default ActivityExplainDialog
