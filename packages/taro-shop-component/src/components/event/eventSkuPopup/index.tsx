import { memo, FC, useState } from 'react'
import { Button, View } from '@tarojs/components'
import { IEventSkuPopupProps } from './const'
import styles from './index.module.less'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import EventSkuList from './components/eventSkuList'
import classNames from 'classnames'
import { useToast } from '@wmeimob/taro-design'

/**
 * 活动sku弹窗
 * @param props
 * @returns
 */
const Component: FC<IEventSkuPopupProps> = (props) => {
  const { info, ...popProps } = props
  const [unifyId, setUnifyId] = useState(0)
  const [toast] = useToast()

  const handleSelected = (unifyDate, unifyTime) => {
    const selected = info?.unifyOutputDtos?.find((item) => item.unifyDate === unifyDate && item.unifyTime === unifyTime)
    if (selected) {
      setUnifyId(selected?.id || 0)
    }
  }

  const handleConfirm = () => {
    if (!info?.unify && !unifyId) {
      toast?.message('请选择场次')
      return
    }
    popProps?.onConfirm?.(unifyId)
  }

  return (
    <MMPopup {...popProps} noDivider={false}>
      {popProps.visible && (
        <>
          {/* 商品头部 */}
          <View className={styles.header}>选择场次</View>

          <EventSkuList data={info?.unifyOutputDtos} unify={info?.unify} onSelected={handleSelected} />

          <View className={styles.footer}>
            <Button className={classNames(styles.btn, styles.cancel)} onClick={() => popProps?.onClose?.()}>取消</Button>
            <Button className={classNames(styles.btn, styles.confirm)} onClick={handleConfirm}>确定</Button>
          </View>
        </>
      )}
    </MMPopup>
  )
}

const EventSkuPopup = memo(Component)
export default EventSkuPopup
