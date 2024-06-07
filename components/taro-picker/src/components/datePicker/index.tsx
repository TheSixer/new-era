import { memo, FC, useEffect, useState } from 'react'
import { IPopDatePickerProps } from './const'
import styles from './index.module.less'
import MDatePicker from './datePicker'
import dayjs from 'dayjs'
import PopTitle from '../popTitle'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import MMButton from '@wmeimob/taro-design/src/components/button'

const Component: FC<IPopDatePickerProps> = (props) => {
  const { visible, onVisibleChange, onChange, title = '日期', okText = '确定', cancelText = true, onCancel, onOk, value, type, ...pickerProps } = props

  const [innerDate, setInnerDate] = useState<Date>()
  const showCancelText = cancelText !== false

  useEffect(() => {
    if (visible) {
      setInnerDate(dayjs(value).toDate())
    } else {
      setInnerDate(undefined)
    }
  }, [visible, value, type])

  function handleCancel() {
    onVisibleChange?.(false)
    onCancel?.()
  }

  function handleOk() {
    onVisibleChange?.(false)
    onChange?.(innerDate!)
    onOk?.()
  }

  return (
    <MMPopup
      visible={visible}
      // title={<PopTitle title={title} okText={okText} cancelText={cancelText} onCancel={handleCancel} onOk={handleOk} />}
      close={false}
      noPlace
      scrollView={false}
      contentStyle={{ padding: 0 }}
      title={<PopTitle title={title} okText="确定" cancelText="取消" onCancel={handleCancel} onOk={handleOk} />}
      onClose={handleCancel}
    >
      <View className={styles.popup_container}>
        {/*
        fix: 保留 undefined 的状态作为标记
        因为 useEffect visible 的时候 MPicker 已经开始渲染并跑动画，此时 innerData 还是上一次的
        然后 props.value 变化时导致 h5 的动画跑着一半，值就对不上了，导致显示出错
       */}
        {visible && innerDate !== undefined && (
          <MDatePicker
            {...pickerProps}
            type={type}
            value={innerDate}
            onChange={(ev: any) => {
              // console.log('dateChange', dayjs(ev).format('YYYY-MM-DD'))
              setInnerDate(ev)
            }}
          />
        )}
      </View>
    </MMPopup>
  )
}

const MMDatePicker = memo(Component)
export default MMDatePicker
