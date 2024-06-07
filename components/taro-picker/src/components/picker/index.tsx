import { View } from '@tarojs/components'
import MMButton from '@wmeimob/taro-design/src/components/button'
import MMPopup from '@wmeimob/taro-design/src/components/popup'
import classNames from 'classnames'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { IMMPickerRef, IMMPopPickerProps, PickerValueType } from './const'
import styles from './index.module.less'
import MPicker from './picker'

const Component: FC<IMMPopPickerProps> = (props) => {
  const { visible, onVisibleChange, onChange, title = '选择', okText = '确定', cancelText = true, onCancel, onOk, value, data, ...pickerProps } = props

  const [innerData, setInnerData] = useState<PickerValueType[]>()

  const pickerRef = useRef<IMMPickerRef>(null)

  const showCancelText = cancelText !== false

  useEffect(() => {
    if (!visible) {
      setInnerData(undefined)
      return
    }

    setInnerData(value.length ? value : [])
  }, [visible, value])

  function handleCancel() {
    onVisibleChange?.(false)
    onCancel?.()
  }

  function handleOk() {
    const result = pickerRef.current!.getDataByKeys(innerData!)

    onVisibleChange?.(false)
    onChange?.(innerData!, result)
    onOk?.(innerData!, result)
  }

  return (
    <MMPopup
      visible={visible}
      close={false}
      noPlace
      contentStyle={{ padding: 0 }}
      scrollView={false}
      footer={
        <View className={styles.pickerFooter}>
          {showCancelText && (
            <>
              <MMButton className={classNames(styles.pickerFooter_button, styles.pickerFooter_button__cancel)} ghost onClick={handleCancel}>
                {cancelText === true ? '取消' : cancelText}
              </MMButton>
              <View style={{ width: 15, flexShrink: 0 }} />
            </>
          )}
          <MMButton className={styles.pickerFooter_button} onClick={handleOk}>
            {okText}
          </MMButton>
        </View>
      }
      onClose={handleCancel}
    >
      <View className={styles.popup_container}>
        {/*
        fix: 保留 undefined 的状态作为标记
        因为 useEffect visible 的时候 MPicker 已经开始渲染并跑动画，此时 innerData 还是上一次的
        然后 props.value 变化时导致 h5 的动画跑着一半，值就对不上了，导致显示出错
       */}
        {visible && !!data.length && innerData !== undefined && (
          <MPicker
            {...pickerProps}
            ref={pickerRef}
            data={data}
            value={innerData!}
            onChange={(data) => {
              setInnerData(data)
            }}
          />
        )}
      </View>
    </MMPopup>
  )
}

const MMPicker = memo(Component)
export default MMPicker
