import React, { useState, useRef, useCallback, useMemo } from 'react'
import { BasicModuleSignEnum } from '@wmeimob-modules/decoration-data'
import { DrayData, getDefaultModuleData } from '../components/const'

/**
 * 处理拖拽
 * @param data
 * @returns
 */
export function useDragData(data: DrayData[] = []) {
  const [moduleData, setModuleData] = useState<DrayData[]>(data)
  const [dragIndex, setDragIndex] = useState(-1) // 当前被拖拽的索引
  const [editIndex, setEditIndex] = useState(-1) // 当前处于编辑的组件索引

  const editData = useMemo<DrayData | undefined>(() => moduleData[editIndex], [moduleData, editIndex])

  const defaultTipBlockData = useRef<DrayData>(getDefaultModuleData(BasicModuleSignEnum.DefaultTipBlock)) // 默认占位数据
  const defaultModuleData = useRef<DrayData>()
  const lastenter = useRef<any>(null)
  const mouseY = useRef(0)

  const resetEdit = useCallback(() => {
    setEditIndex(-1)
  }, [])

  const handleDelete = useCallback(
    (index: number) => {
      setModuleData((moduleData) => moduleData.filter((_v, ind) => ind !== index))
      if (editIndex === index) {
        resetEdit()
      }
    },
    [editIndex, resetEdit]
  )

  const handleClickModuleItem = useCallback(
    (index: number, moduleItem: DrayData) => {
      if (index === editIndex) {
        return
      }

      setEditIndex(index)
    },
    [editIndex]
  )

  const handleDocumentDragOver = useMemo(
    () => (ev: DragEvent) => {
      mouseY.current = ev.clientY
    },
    []
  )

  /** ***** 处理组件选项卡拖动 ******** */
  const handleModuleDragStart = useCallback((type: BasicModuleSignEnum) => {
    setDragIndex(-1)
    defaultModuleData.current = getDefaultModuleData(type)
    document.addEventListener('dragover', handleDocumentDragOver)
  }, [])

  const handleModuleDragEnd = useCallback(() => {
    document.removeEventListener('dragover', handleDocumentDragOver)
    defaultModuleData.current = undefined
  }, [])

  /** **** 处理拖动放置框事件 **** */
  const handleBodyDragEnter = useCallback(
    (ev: React.DragEvent<HTMLDivElement>) => {
      ev.preventDefault()
      resetEdit()
      if (dragIndex === -1) {
        lastenter.current = ev.target
      }
    },
    [dragIndex]
  )

  const handleBodyDragOver = useCallback(
    (ev: React.DragEvent<HTMLDivElement>) => {
      ev.preventDefault()
      // 如果不是新增的忽略
      if (dragIndex !== -1 || ev.currentTarget !== ev.target) {
        return
      }

      if (moduleData.length) {
        const mData = moduleData.filter((va) => va.type !== BasicModuleSignEnum.DefaultTipBlock)
        mData.push({ ...defaultTipBlockData.current! })
        setModuleData(mData)
      } else {
        setModuleData([{ ...defaultTipBlockData.current! }])
      }
    },
    [dragIndex, moduleData]
  )

  const handleBodyDragLeave = useCallback(
    (ev: React.DragEvent<HTMLDivElement>) => {
      if (dragIndex === -1) {
        // 移除占位符合
        if (lastenter.current === ev.target) {
          setModuleData(moduleData.filter((va) => va.type !== BasicModuleSignEnum.DefaultTipBlock))
        }
      }
    },
    [dragIndex, moduleData]
  )

  const handleBodyDrop = useCallback(
    (ev: React.DragEvent<HTMLDivElement>) => {
      ev.preventDefault()
      if (dragIndex === -1) {
        // 替换占位块
        const newData = moduleData.map((va) => {
          if (va.type === BasicModuleSignEnum.DefaultTipBlock) {
            return { ...defaultModuleData.current! }
          }
          return va
        })
        setModuleData(newData)
      }
    },
    [dragIndex, moduleData]
  )

  /** ***** 以下是当模块拖动事件处理  *******/

  // 处理开始
  const handleModuleItemDragStart = useCallback(
    (index: number) => {
      resetEdit()
      setDragIndex(index)
      defaultModuleData.current = { ...moduleData[index] }
      document.addEventListener('dragover', handleDocumentDragOver)
    },
    [moduleData]
  )

  // 处理over
  const handleModuleItemDragOver = useCallback(
    (ev: React.DragEvent<HTMLDivElement>, moduleItem: DrayData, index: number) => {
      ev.preventDefault()
      if (moduleItem.pushpin === true) {
        return
      }
      const target: any = ev.currentTarget
      const moveData = dragIndex === -1 ? defaultTipBlockData.current : defaultModuleData.current!
      const { id: moveId } = moveData

      // 悬浮在自己身上忽略
      if (moduleItem.id === moveId) {
        return
      }

      const newData = moduleData.filter((va) => va.id !== moveId)
      let moveIndex = newData.findIndex((va) => va.id === moduleItem.id)

      if (mouseY.current - target.getBoundingClientRect().y > target.offsetHeight / 2) {
        if (moduleItem.pushpin === 'bottom') {
          return
        }
        moveIndex += 1
      }

      // 位置不变则不需要更新
      if (moveIndex === moduleData.length || moduleData[moveIndex].id !== moveId) {
        if (moduleItem.pushpin === 'top') {
          return
        }
        newData.splice(moveIndex, 0, { ...moveData })
        setModuleData(newData)
      }
    },
    [moduleData, dragIndex]
  )

  // 处理end
  const handleModuleItemDragEnd = useCallback(() => {
    setDragIndex(-1)
    document.removeEventListener('dragover', handleDocumentDragOver)
    defaultModuleData.current = undefined
  }, [])

  return {
    editIndex,
    editData,
    moduleData,
    setModuleData,
    handleDelete,
    handleClickModuleItem,
    handleModuleDragStart,
    handleModuleDragEnd,
    handleBodyDragEnter,
    handleBodyDragOver,
    handleBodyDragLeave,
    handleBodyDrop,
    handleModuleItemDragStart,
    handleModuleItemDragOver,
    handleModuleItemDragEnd
  }
}
