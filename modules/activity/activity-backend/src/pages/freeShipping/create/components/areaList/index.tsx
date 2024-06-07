import city from '@wmeimob/backend-pro/assets/json/district.json'
import { Card } from 'antd'
import { FC, memo, useMemo, useRef, useState } from 'react'
import SelectAreaModal from '../../../../../components/selectAreaModal'
import { ICityTree } from '../../../../../components/selectAreaModal/interface'
import { getCityTree, getUnlikeName } from '../../../../../components/selectAreaModal/utils'
import styles from './index.module.less'

export interface IAreaListValue {
  area: ICityTree[]
  text: string
}

interface IAreaListProps {
  disabled?: boolean
  value?: IAreaListValue
  onChange?(value: IAreaListValue): void
}

const Component: FC<IAreaListProps> = (props) => {
  const [cityTree] = useState(() => getCityTree(city) || [])
  const [visible, setVisible] = useState(false)

  const data = useMemo(() => (props.value?.text ? props.value.text.split(',') : []), [props.value])

  // 显示数据
  const visibleRowData = useRef<ICityTree[]>()

  function handleModalOpen() {
    visibleRowData.current = props.value?.area
    setVisible(true)
  }

  function handleModalOk(selectedTree: ICityTree[]) {
    const res: IAreaListValue = {
      area: selectedTree,
      text: getUnlikeName(cityTree, selectedTree).join(',')
    }

    props.onChange?.(res)
    setVisible(false)
  }

  return (
    <div className={styles.areaListStyle}>
      {!props.disabled && <a onClick={handleModalOpen}>编辑</a>}

      {!!data.length && (
        <Card size="small" bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}>
          {data.map((text, index) => (
            <div key={index} style={{ lineHeight: '32px' }}>
              {text}
            </div>
          ))}
        </Card>
      )}

      <SelectAreaModal
        dataSource={cityTree}
        visible={visible}
        defaultSelected={visibleRowData.current}
        onOk={handleModalOk}
        onCancel={() => setVisible(false)}
      />
    </div>
  )
}

const AreaList = memo(Component)
export default AreaList
