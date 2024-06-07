import { FC, useEffect, useMemo, useState } from 'react'
import { Card, Checkbox } from 'antd'
import { ICityTree } from '../interface'
import styles from './cityCard.module.less'
import { isEqualTree } from '../utils'
import classNames from 'classnames'

interface IProps {
  dataSource: ICityTree[]
  selectedData?: ICityTree[]
  onChange?: (newTree: ICityTree[]) => void
}

function hasChildren(value?: ICityTree) {
  return value && value.children && value.children.length > 0
}

const Component: FC<IProps> = (props) => {
  const { dataSource, selectedData } = props

  const [dataIndex, setDataIndex] = useState(-1)
  // 当前选择城市
  const currentCity = useMemo(() => {
    if (dataIndex >= 0 && dataIndex < dataSource.length) {
      return dataSource[dataIndex]
    }
  }, [dataSource, dataIndex])
  // 当前选择子城市
  const selectedChild = useMemo(() => {
    if (currentCity && Array.isArray(selectedData)) {
      const find = selectedData.find((item) => item.key === currentCity.key)
      return find && find.children
    }
  }, [currentCity, selectedData])

  // 更换选择后不保留上次index
  useEffect(() => {
    setDataIndex(-1)
  }, [dataSource])

  function onChecked(checked: boolean, value: ICityTree) {
    const selectedArr = Array.isArray(selectedData) ? selectedData : []
    if (checked) {
      const find = dataSource.find((item) => item.key === value.key)
      const newList = selectedArr.filter((item) => item.key !== value.key)
      newList.push({
        key: value.key,
        title: value.title,
        children: find?.children
      })
      props.onChange?.(newList)
    } else {
      props.onChange?.(selectedArr.filter((item) => item.key !== value.key))
    }
  }

  function onCheckedChildren(newChildren: ICityTree[]) {
    const selectedCopy = Array.isArray(selectedData) ? selectedData.slice(0) : []
    const findIndex = selectedCopy.findIndex((item) => item.key === currentCity!.key)
    const newItem = { key: currentCity!.key, title: currentCity!.title, children: newChildren }
    if (findIndex >= 0) {
      if (newChildren.length > 0) {
        selectedCopy.splice(findIndex, 1, newItem)
      } else {
        selectedCopy.splice(findIndex, 1)
      }
    } else {
      selectedCopy.push(newItem)
    }
    props.onChange?.(selectedCopy)
  }

  function onCheckedAll(checked: boolean) {
    props.onChange?.(checked ? dataSource : [])
  }

  return (
    <>
      <Card className={styles.scrollView} size="small">
        <div className={styles.checkItem}>
          <Checkbox checked={dataSource.length === selectedData?.length} onChange={(event) => onCheckedAll(event.target.checked)}>
            <b>全选</b>
          </Checkbox>
        </div>
        {dataSource?.map((item, index) => {
          const isActive = currentCity && currentCity.key === item.key
          const findSelected = selectedData?.find((data) => data.key === item.key)
          const checked = findSelected ? isEqualTree(findSelected, item) : false
          const indeterminate = !checked && !!findSelected && item.children?.length !== 0
          return (
            <div className={classNames(styles.checkItem, isActive ? styles.checkItemActive : null)} key={item.key}>
              <Checkbox checked={checked} indeterminate={indeterminate} onChange={(value) => onChecked(value.target.checked, item)} />
              <div className={styles.checkItemText} onClick={() => setDataIndex(index)}>
                {item.title}
              </div>
            </div>
          )
        })}
      </Card>
      {hasChildren(currentCity) && <Component dataSource={currentCity!.children!} selectedData={selectedChild} onChange={onCheckedChildren} />}
    </>
  )
}

export default Component
