import { FC, memo, useEffect, useMemo, useState } from 'react'
import citysJson from './citys'
import { ICity, MMCitysPickerProps, MMCityType } from './const'
import MMPicker from '../picker'
import { findCity } from './utils'

const Component: FC<MMCitysPickerProps> = (props) => {
  const { visible, value, type = MMCityType.Area } = props

  const [pickerValue, setPickerValue] = useState<string[]>([])
  const [pickerData, setPickerData] = useState<ICity[][]>([])

  const finalData = useMemo(() => pickerData.slice(0, type), [type, pickerData])

  useEffect(() => {
    if (visible) {
      initPickerData()
    }
  }, [visible])

  function initPickerData() {
    let pickerValue: string[] = []
    const pickerData: ICity[][] = [citysJson as any]

    if (value.length > 0) {
      pickerValue = value.map(({ id }) => id)
      pickerData[1] = pickerValue[0] ? findCity(pickerValue[0]).children || [] : []
      pickerData[2] = pickerValue[1] ? findCity(pickerValue[1], pickerData[1]).children || [] : []
    } else {
      pickerValue[0] = citysJson[0].id

      pickerData[1] = citysJson[0].children as any
      pickerValue[1] = pickerData[1][0].id

      pickerData[2] = pickerData[1][0].children
      pickerValue[2] = pickerData[1][0].children[0].id
    }

    setPickerData(pickerData)
    setPickerValue(pickerValue)
  }

  function onChangePicker(value: string[]) {
    const pValue = [...pickerValue]
    const pData = [...pickerData]
    const pickerIndex = pValue.findIndex((val, index) => val !== value[index])
    pValue[pickerIndex] = value[pickerIndex]

    for (let index = pickerIndex + 1; index < 3; index++) {
      const data = pData[index - 1].find((pickerVal) => pickerVal.id === pValue[index - 1])
      const { children } = data || {}

      if (children?.length) {
        pValue[index] = children[0].id
        pData[index] = children
      } else {
        delete pValue[index]
        pData[index] = []
      }
    }

    setPickerData(pData)
    setPickerValue(pValue)
  }

  function onOkPicker() {
    const newValue = pickerValue
      .filter((it) => !!it)
      .map((value) => {
        const { id, text } = findCity(value)
        return { id, text }
      })

    props.onOk(newValue)
  }

  return (
    <MMPicker onOk={onOkPicker} onCancel={props.onCancel} value={pickerValue} visible={visible} title="选择地址" data={finalData} onChange={onChangePicker} />
  )
}

const MMCitysPicker = memo(Component)
export default MMCitysPicker
