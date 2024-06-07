import { DeleteOutlined, DragOutlined, RestOutlined } from '@ant-design/icons'
import { IHotZoneValue } from '@wmeimob-modules/decoration-data'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { guid } from '@wmeimob/utils/src/guid'
import { Popconfirm } from 'antd'
import classnames from 'classnames'
import { throttle } from 'lodash-es'
import React, { CSSProperties, memo, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'

interface IProps {
  styles?: CSSProperties
  value: IHotZoneValue[]
  img: string
  deleteable?: boolean
  onClick?: (value: IHotZoneValue) => void
  onChange: (value: IHotZoneValue[]) => void
}

const Component: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const { deleteable = true, img = '' } = props

  const [imgLoaded, setImgLoaded] = useState(false)
  function getValue() {
    return state.value
  }

  const [refresh, setRefresh] = useState(true)
  const imgRef = useRef<HTMLImageElement>(null)

  function setValue(value: IHotZoneValue[]) {
    state.value = value
    setRefresh(!refresh)
  }

  function onChange(value: IHotZoneValue[]) {
    props.onChange(value.map((value) => TValue(value)))
  }

  function TValue(value: IHotZoneValue) {
    // const { width, height } = boxRef.current!.getBoundingClientRect()
    const { offsetHeight: height, offsetWidth: width } = imgRef.current!
    return {
      ...value,
      left: (value.left / width) * 100,
      top: (value.top / height) * 100,
      width: (value.width / width) * 100,
      height: (value.height / height) * 100
    }
  }

  useEffect(() => {
    function TValueToPX(value: IHotZoneValue) {
      const { offsetHeight: height, offsetWidth: width } = imgRef.current!

      return {
        ...value,
        left: (width / 100) * value.left,
        top: (height / 100) * value.top,
        width: (width / 100) * value.width,
        height: (height / 100) * value.height
      }
    }

    function handLoad() {
      setValue(props.value.map((value) => TValueToPX(value)))
      setImgLoaded(true)
    }

    if (imgLoaded) {
      setValue(props.value.map((value) => TValueToPX(value)))
    } else {
      imgRef.current?.addEventListener('load', handLoad)
    }
    return () => {
      imgRef.current?.removeEventListener('load', handLoad)
    }
  }, [props.value, imgLoaded])

  const minWidth = 20

  const boxRef = useRef<HTMLDivElement>(null)

  const stateRef = useRef<{
    value: IHotZoneValue[]
    // 点击开始时候元素中点的top
    startTop?: number
    // 点击开始时候元素中点的left
    startLeft?: number
    startClientX?: number
    startClientY?: number
    isScale?: boolean
    currentValue?: IHotZoneValue
    currentTarget?: HTMLDivElement
  }>({ value: [] })
  const state = stateRef.current

  const handleMouseup = useMemo(
    () => () => {
      if (state.currentTarget || state.currentValue) {
        state.currentTarget = undefined
        state.currentValue = undefined
        state.isScale = undefined
        onChange(getValue())
      }
    },
    []
  )

  const handleBodyMouseDown = useMemo(
    () => (event: MouseEvent) => {
      state.startClientX = event.clientX
      state.startClientY = event.clientY
    },
    []
  )

  const handelMouseMove = throttle(
    useMemo(
      () => (event: MouseEvent) => {
        const { isScale, currentValue, startLeft, startClientX, startTop, startClientY } = state
        event.stopPropagation()

        if (isScale && currentValue) {
          const { left, top } = getMousePositon(event as any)

          currentValue.width = (left - state.startLeft!) * 2
          currentValue.height = (top - state.startTop!) * 2

          if (currentValue.width < minWidth) {
            currentValue.width = minWidth
          }

          if (currentValue.height < minWidth) {
            currentValue.height = minWidth
          }

          currentValue.left = state.startLeft! - currentValue.width / 2
          currentValue.top = state.startTop! - currentValue.height / 2

          setCurrentTargetStyle()
          return
        }

        if (currentValue) {
          currentValue.left = startLeft! - currentValue.width / 2 + (event.clientX - startClientX!)
          currentValue.top = startTop! - currentValue.height / 2 + (event.clientY - startClientY!)
          setCurrentTargetStyle()
        }
      },
      []
    ),
    1000 / 60
  )

  function setCurrentTargetStyle() {
    const { currentValue, currentTarget } = state
    currentTarget!.style.width = currentValue!.width + 'px'
    currentTarget!.style.height = currentValue!.height + 'px'
    currentTarget!.style.left = currentValue!.left + 'px'
    currentTarget!.style.top = currentValue!.top + 'px'
  }

  function handelScaleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: IHotZoneValue) {
    state.isScale = true
  }

  function handelMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: IHotZoneValue) {
    state.currentValue = value
    state.startLeft = value.left + value.width / 2
    state.startTop = value.top + value.height / 2
    state.currentTarget = event.currentTarget
  }

  function handleDelete(deValue: IHotZoneValue) {
    onChange(getValue().filter((value) => value.id !== deValue.id))
  }

  function getBoxClient() {
    const { left, top } = boxRef.current!.getBoundingClientRect()

    return {
      clientX: document.body.scrollLeft + left,
      clientY: document.body.scrollTop + top
    }
  }

  function getMousePositon(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { clientX, clientY } = getBoxClient()

    return {
      left: event.clientX - clientX,
      top: event.clientY - clientY
    }
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { left, top } = getMousePositon(event)
    const boxWidth = 100

    onChange([
      ...getValue(),
      {
        id: guid(),
        left: left - boxWidth / 2,
        top: top - boxWidth / 2,
        width: boxWidth,
        height: boxWidth,
        link: {
          type: EJumpType.None,
          content: ''
        }
      }
    ])
  }

  function handelConfirm() {
    onChange([])
  }

  useEffect(() => {
    document.body.addEventListener('mouseup', handleMouseup)
    document.body.addEventListener('mousemove', handelMouseMove)
    document.body.addEventListener('mousedown', handleBodyMouseDown)
    return () => {
      document.body.removeEventListener('mouseup', handleMouseup)
      document.body.removeEventListener('mousemove', handelMouseMove)
      document.body.removeEventListener('mousedown', handelMouseMove)
    }
  }, [])

  const renderHotComponent = (value: IHotZoneValue, index: number) => {
    const { width, height, top, left, id } = value
    return (
      <div
        draggable={false}
        onClick={() => props.onClick?.(TValue(value))}
        onMouseDown={(event) => handelMouseDown(event, value)}
        key={id}
        className={styles.item}
        style={{ width: width + 'px', height: height + 'px', top: top + 'px', left: left + 'px' }}
      >
        <div className={styles.number}>{index + 1}</div>

        {deleteable && (
          <div className={styles.deleteIcon} onClick={() => handleDelete(value)}>
            <DeleteOutlined />
          </div>
        )}

        <div onMouseDown={(event) => handelScaleMouseDown(event, value)} className={classnames(styles.deleteIcon, styles.scaleIcon)}>
          <DragOutlined />
        </div>
      </div>
    )
  }

  return (
    <div draggable={false} ref={boxRef} style={props.styles} className={styles.hotZone} onDoubleClick={handleDoubleClick}>
      <img ref={imgRef} src={img} className={styles.img} />
      {getValue().map((value, index) => renderHotComponent(value, index))}
      {getValue().length > 0 && (
        <div className={styles.clear}>
          <Popconfirm placement="leftTop" title={`确定删除全部${getValue().length}个`} onConfirm={handelConfirm}>
            <RestOutlined />
          </Popconfirm>
        </div>
      )}
    </div>
  )
}

Component.defaultProps = {}

const HotZone = memo(Component)
export default HotZone
