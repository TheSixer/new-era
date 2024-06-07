import { PureComponent } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import dayjs, { UnitType } from 'dayjs'
import { MMDatePickerType } from './const'
import styles from './index.modules.less'
import MMPicker from '../picker'
import { autobind } from '@wmeimob/decorator'

export interface IMMDatePickerProps {
  /**
   * 默认时间
   *
   * @type {Date}
   * @memberof IMMDatePickerProps
   */
  defaultValue?: Date

  /**
   * 当前选中时间
   *
   * @type {Date}
   * @memberof IMMImagePickerProps
   */
  value?: Date

  /**
   * 类型
   *
   * @type {MMDatePickerType}
   * @memberof IMMDatePickerProps
   */
  type?: MMDatePickerType

  /**
   * 图片值
   *
   * @type {string[]}
   * @memberof IMMImagePickerProps
   */
  minDate?: Date

  /**
   * 图片值
   *
   * @type {string[]}
   * @memberof IMMImagePickerProps
   */
  maxDate?: Date

  /**
   * 是否显示
   *
   * @type {boolean}
   * @memberof IMMDatePickerProps
   */
  visible: boolean

  /**
   * 点击确定事件
   *
   * @memberof MMPickerProps
   */
  onOk: (value: Date) => void

  /**
   * 点击取消
   *
   * @memberof MMPickerProps
   */
  onCancel: () => void

  /**
   * 改变事件
   *
   * @memberof IMMDatePickerProps
   */
  onChange?: (value: Date) => void

  /**
   * 最小时间
   */
  minSelectHour?: number

  /**
   * 最大时间
   */
  maxSelectHour?: number

  /**
   * 标题
   */
  title?: string
}

/**
 * @name 日期选择
 */
@autobind
export default class MMDatePicker extends PureComponent<IMMDatePickerProps> {
  static typeKeyObject: { [key: string]: UnitType[] } = {
    [MMDatePickerType.date]: ['year', 'month', 'date'],
    [MMDatePickerType.time]: ['hour', 'minute'],
    [MMDatePickerType.dateTime]: ['year', 'month', 'date', 'hour', 'minute'],
    [MMDatePickerType.year]: ['year'],
    [MMDatePickerType.month]: ['month'],
    [MMDatePickerType.hourTime]: ['month', 'date', 'hour']
  }

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    type: MMDatePickerType.hourTime,
    minDate: new Date(),
    maxDate: dayjs().add(10, 'year').toDate()
  }

  state = {
    value: this.props.defaultValue || this.props.minDate,
    data: this.getDate()
  }

  private get dateValue(): Date {
    if (this.props.value) {
      return this.props.value
    }

    return this.state.value as Date
  }

  private get pickerValue() {
    return this.dateToPickerValue(this.dateValue)
  }

  render() {
    const { visible, onCancel, title } = this.props
    const { data } = this.state
    return (
      <View className={styles.MMDatePicker}>
        <MMPicker
          visible={visible}
          data={data}
          value={this.pickerValue}
          title={title}
          onChange={this.onAllChange.bind(this)}
          onOk={this.onOk}
          onCancel={onCancel}
        />
      </View>
    )
  }

  private dateToPickerValue(value: Date) {
    const day = dayjs(value)
    return MMDatePicker.typeKeyObject[this.props.type as MMDatePickerType].map((value) => day[value]().toString())
  }

  componentWillUpdate(newProps) {
    if (newProps.visible && !this.props.visible) {
      setTimeout(() => {
        this.setState({ data: this.getDate(newProps.value) })
      }, 0)
    }
  }

  componentDidMount() {
    // const data = this.correct(new Date('2000-09-09 09:09:09'));
    // console.log(dayjs(data).format());
  }

  getyearString() {
    const { maxDate, minDate } = this.props

    const minDateDay = dayjs(minDate as Date)
    const maxDateDay = dayjs(maxDate as Date)
    const yearArray: {
      id: string
      text: string
    }[] = []

    for (let index = minDateDay.year(); index <= maxDateDay.year(); index++) {
      yearArray.push({
        id: index.toString(),
        text: index.toString()
      })
    }

    return yearArray
  }

  getmonthString(dataValue = this.dateValue) {
    const dateArray: {
      id: string
      text: string
    }[] = []

    const { maxDate, minDate } = this.props
    const min = dayjs(minDate as Date)
    const max = dayjs(maxDate as Date)
    const day = dayjs(dataValue)

    let minMonth = 0
    let maxMonth = 11

    if (day.year() === min.year()) {
      minMonth = min.month()
    }

    if (day.year() === max.year()) {
      maxMonth = max.month()
    }

    for (let index = minMonth; index <= maxMonth; index++) {
      dateArray.push({
        id: index.toString(),
        text: (index + 1).toString() + '月'
      })
    }

    return dateArray
  }

  getdateString(dataValue = this.dateValue) {
    const dateArray: {
      id: string
      text: string
    }[] = []

    const { maxDate, minDate } = this.props
    const min = dayjs(minDate as Date)
    const max = dayjs(maxDate as Date)
    const day = dayjs(dataValue)

    let minDay = 1
    let maxDay = day.endOf('month').date()

    if (day.year() === min.year() && day.month() === min.month()) {
      minDay = min.date()
    }

    if (day.year() === max.year() && day.month() === max.month()) {
      maxDay = max.date()
    }

    for (let index = minDay; index <= maxDay; index++) {
      dateArray.push({
        id: index.toString(),
        text: index.toString() + '日'
      })
    }

    return dateArray
  }

  gethourString(dataValue = this.dateValue) {
    const dateArray: {
      id: string
      text: string
    }[] = []

    const { maxDate, minDate, minSelectHour, maxSelectHour } = this.props
    const min = dayjs(minDate as Date)
    const max = dayjs(maxDate as Date)
    const day = dayjs(dataValue)

    let minHour = minSelectHour ? minSelectHour : 0
    let maxHour = maxSelectHour ? maxSelectHour : 23

    if (day.year() === min.year() && day.month() === min.month() && day.date() === min.date()) {
      minHour = min.hour()
    }

    if (day.year() === max.year() && day.month() === max.month() && day.date() === max.date()) {
      maxHour = max.hour()
    }

    for (let index = minHour; index <= maxHour; index++) {
      dateArray.push({
        id: index.toString(),
        text: index.toString() + '时'
      })
    }

    return dateArray
  }

  getminuteString(dataValue = this.dateValue) {
    const dateArray: {
      id: string
      text: string
    }[] = []

    const { maxDate, minDate } = this.props
    const min = dayjs(minDate as Date)
    const max = dayjs(maxDate as Date)
    const day = dayjs(dataValue)

    let minMinute = 0
    let maxMinute = 59

    if (day.year() === min.year() && day.month() === min.month() && day.date() === min.date() && day.hour() === min.hour()) {
      minMinute = min.minute()
    }

    if (day.year() === max.year() && day.month() === max.month() && day.date() === max.date() && day.hour() === min.hour()) {
      maxMinute = max.minute()
    }

    for (let index = minMinute; index <= maxMinute; index++) {
      dateArray.push({
        id: index.toString(),
        text: index.toString() + '分'
      })
    }

    return dateArray
  }

  private onAllChange(newValue: string[], pickerIndex: number) {
    let newValueCache = newValue
    let newTime = this.pickerValueToDate(newValue)
    let pickerValue = this.dateToPickerValue(newTime)
    let newData = this.getDate(newTime)

    let isChange = false
    newValueCache = newValue.map((value, index) => {
      if (!newData[index].find((i) => i.id === value)) {
        isChange = true
        return newData[index][0] && newData[index][0].id
      }
      return value
    })

    if (isChange) {
      newTime = this.pickerValueToDate(newValueCache)
      pickerValue = this.dateToPickerValue(newTime)
      newData = this.getDate(newTime)
    }

    this.setState({
      data: this.state.data.map((value, ind) => {
        if (ind > pickerIndex) {
          const dataList = this.getDateByIndex(this.getLegitimateValue(newTime), ind)
          return dataList
        }
        return value
      })
    })

    this.props.onChange && this.props.onChange(newTime)
  }

  private pickerValueToDate(value: string[]) {
    let day = dayjs(this.dateValue)
    const valueDay = dayjs(this.props.value)
    const keyList: UnitType[] = MMDatePicker.typeKeyObject[this.props.type as MMDatePickerType]

    value.forEach((value, index) => {
      if (this.props.value === undefined || valueDay.get(keyList[index]) !== Number(value)) {
        day = day.set(keyList[index], Number(value))
      }
    })
    return day.toDate()
  }

  private onOk() {
    if (this.props.value) {
      this.props.onOk(this.props.value)
    } else {
      this.props.onOk(this.props.minDate as any)
    }
  }

  private getLegitimateValue(value: Date) {
    const { maxDate, minDate } = this.props
    if (value.getTime() > maxDate!.getTime()) {
      return maxDate!
    }
    if (value.getTime() < minDate!.getTime()) {
      return minDate!
    }
    return value
  }

  private getDateByIndex(data: Date, index: number) {
    const keyList: UnitType[] = MMDatePicker.typeKeyObject[this.props.type as MMDatePickerType] || []
    return this[`get${keyList[index]}String`](data)
  }

  private getDate(dataValue = this.dateValue) {
    const keyList: UnitType[] = MMDatePicker.typeKeyObject[this.props.type as MMDatePickerType] || []
    return keyList.map((value) => this[`get${value}String`](dataValue))
  }
}
