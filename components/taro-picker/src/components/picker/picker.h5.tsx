import { memo, useRef, useEffect, forwardRef } from 'react'
import { View, ScrollView, PickerViewProps, BaseEventOrig } from '@tarojs/components'
import { IMMPickerData, IMMPickerProps, PICKER_ITEM_HEIGHT, PICKER_ITEM_HALF_HEIGHT, indicatorStyle, IMMPickerRef } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import { usePicker } from './usePicker'
import { times, plus } from 'number-precision'
import Taro from '@tarojs/taro'
import { isIphone } from '@wmeimob/taro-design/src/components/utils'

const PADDING = `${times(PICKER_ITEM_HEIGHT, 2)}px 0`

/**
 * H5 兼容实现
 * @param props
 * @returns
 */
const Component = forwardRef<IMMPickerRef, IMMPickerProps>((props, ref) => {
  const fieldKey = { label: 'label', value: 'value', children: 'children', ...props.fieldKey }

  const { innerList, innerIndex, handleChange } = usePicker(props, fieldKey, ref)

  return (
    <View className={classNames(styles.pickerStyle, styles.h5, props.className)} style={props.style}>
      <View className={styles.mmPickerView} style={{ height: PICKER_ITEM_HEIGHT * 5 }}>
        <View className={styles.maskContainer}>
          <View className={styles.maskContainer_top} />
          <View className={styles.maskContainer_indicator} style={indicatorStyle} />
          <View className={styles.maskContainer_bottom} />
        </View>

        {innerList.map((item, index) => (
          <PickerViewColumn
            key={item.id}
            fieldKey={fieldKey}
            data={item}
            value={innerIndex[index]}
            onChange={(value) => {
              const event = new Event('onChangeEventDetail') as unknown as BaseEventOrig<PickerViewProps.onChangeEventDetail>
              event.detail = { value: innerIndex.map((it, innerIndex) => (index === innerIndex ? value : it)) }
              handleChange(event)
            }}
          />
        ))}
      </View>
    </View>
  )
})

const MMPicker = memo(Component)
export default MMPicker

interface IPickerViewColumnProps extends Required<Pick<IMMPickerProps, 'fieldKey'>> {
  value: number

  data: { id: string; data: any[] }

  onChange?(index: number, item: IMMPickerData): void
}

const PickerViewColumn = memo((props: IPickerViewColumnProps) => {
  const { value, data, fieldKey, onChange } = props
  const nodeRef = useRef<HTMLElement>()
  const pageInfo = useRef<any>({
    scrollTop: 0,
    timeoutListener: null
  })

  useEffect(() => {
    nodeRef.current = document.getElementById(data.id)!

    // 设置滚动
    if (value !== undefined) {
      const stop = times(value, PICKER_ITEM_HEIGHT)
      scrollSmoothTo(stop, nodeRef.current!)
    }
  }, [value, data])

  /**
   * 监听惯性滚动核心事件
   */
  function listenSlidingCore() {
    pageInfo.current.scrollTop = nodeRef.current!.scrollTop
    clearTimeoutListener()
    pageInfo.current.timeoutListener = setTimeout(() => {
      if (pageInfo.current.scrollTop === nodeRef.current!.scrollTop) {
        try {
          handleScrlollEnd()
        } catch (event) {
          // eslint-disable-next-line no-console
          console.log('出错了:' + event)
        }
      } else {
        listenSlidingCore()
      }
    }, 100)
  }

  // 清空定时任务
  function clearTimeoutListener() {
    !!pageInfo.current.timeoutListener && clearTimeout(pageInfo.current.timeoutListener)
  }

  function handleScrlollEnd() {
    // console.log('handleScrlollEnd')
    const { scrollTop } = nodeRef.current!
    let index = Math.floor(scrollTop / PICKER_ITEM_HEIGHT)
    index = plus(index, scrollTop % PICKER_ITEM_HEIGHT > PICKER_ITEM_HALF_HEIGHT ? 1 : 0)
    const sctop = times(index, PICKER_ITEM_HEIGHT)

    // nodeRef.current!.scrollTop = stop
    scrollSmoothTo(sctop, nodeRef.current!).then(() => {
      if (index !== value) {
        onChange?.(index, data.data[index])
      }
    })
    // console.log(index, stop)
  }

  // 平滑滚动
  const scrollSmoothTo = async (position: number, documentElement: HTMLElement) => {
    let resolveHandler
    const promise = new Promise((resolve) => {
      resolveHandler = resolve
    })
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        return setTimeout(callback, 17)
      } as any
    }
    // 当前滚动高度
    let scrollTop = documentElement.scrollTop
    // 滚动step方法
    const step = async function () {
      // 距离目标滚动距离
      const distance = position - scrollTop
      // 目标滚动位置
      scrollTop = scrollTop + distance / 5
      if (Math.abs(distance) < 1) {
        documentElement.scrollTo(0, position)
        resolveHandler()
      } else {
        documentElement.scrollTo(0, scrollTop)
        requestAnimationFrame(step)
      }
    }
    step()

    return promise
  }

  return (
    <ScrollView
      id={data.id}
      scrollY
      scrollWithAnimation
      showScrollbar={false}
      className={styles.pickerViewColumn}
      style={{ padding: PADDING, overscrollBehaviorY: isIphone ? 'contain' : undefined }}
      onTouchStart={() => {
        clearTimeoutListener()
      }}
      onTouchEnd={() => {
        listenSlidingCore()
      }}
    >
      {data.data.map((it, itemIndex) => (
        <View
          key={it[fieldKey.value!]}
          className={classNames(styles.mmPickerView_view, itemIndex === value && styles.mmPickerView_view_active)}
          style={indicatorStyle}
          data-index={itemIndex}
        >
          <View className={styles.mmPickerView_view_label}>{it[fieldKey.label!]}</View>
        </View>
      ))}
    </ScrollView>
  )
})
