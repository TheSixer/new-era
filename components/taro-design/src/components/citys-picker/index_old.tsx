import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import citysJson from './citys'
import { ICity, MMCitysPickerProps, MMCitysPickerState, MMCityType } from './const'
import { autobind } from '@wmeimob/decorator'
import MMPicker from '../picker'
import { findCity } from './utils'

/**
 * @name 城市选择
 *
 * @deprecate 老版本 下个周期删除
 */
@autobind
export default class MMCitysPicker extends PureComponent<MMCitysPickerProps, MMCitysPickerState> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    type: MMCityType.Area
  }

  state: MMCitysPickerState = {
    pickerValue: [],
    pickerData: []
  }

  render() {
    const { pickerValue, pickerData } = this.state
    const { visible, type } = this.props
    const finalData = pickerData.slice(0, type)
    return (
      <MMPicker
        onOk={this.onOkPicker}
        onCancel={this.onCancel}
        value={pickerValue}
        visible={visible}
        title="选择地址"
        data={finalData}
        onChange={this.onChangePicker}
      />
    )
  }

  componentDidMount() {
    this.initPickerData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && !prevProps.visible) {
      this.initPickerData()
    }
  }

  private initPickerData() {
    const { value } = this.props
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

    this.setState({
      pickerData,
      pickerValue
    })
  }

  private onChangePicker(value: string[]) {
    const pickerValue = [...this.state.pickerValue]
    const pickerData = [...this.state.pickerData]
    const pickerIndex = pickerValue.findIndex((val, index) => val !== value[index])
    pickerValue[pickerIndex] = value[pickerIndex]

    for (let index = pickerIndex + 1; index < 3; index++) {
      const data = pickerData[index - 1].find((pickerVal) => pickerVal.id === pickerValue[index - 1])
      const { children } = data || {}

      if (children && children.length) {
        pickerValue[index] = children[0].id
        pickerData[index] = children
      } else {
        delete pickerValue[index]
        pickerData[index] = []
      }
    }

    this.setState({ pickerValue, pickerData })
  }

  private onCancel() {
    this.props.onCancel()
  }

  private onOkPicker() {
    const newValue = this.state.pickerValue
      .filter((it) => !!it)
      .map((value) => {
        const { id, text } = findCity(value)
        return { id, text }
      })

    this.props.onOk(newValue)
  }
}
