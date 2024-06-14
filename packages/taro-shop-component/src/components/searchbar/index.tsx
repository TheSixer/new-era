import { Input, View, Image } from '@tarojs/components'
import { BaseEventOrig } from '@tarojs/components/types/common'
import { PureComponent } from 'react'
import { autobind } from '@wmeimob/decorator'
import classNames from 'classnames'
import { MMInputSearchType } from './const'
import SearchIcon from './images/search.svg'
import styles from './index.modules.less'

interface EventValue {
  /** 输入值 */
  value: string
  /** 光标位置 */
  cursor: number
  /** 键值 */
  keyCode: number
}

interface IMMInputSearchProps {
  /**
   * 类型
   *
   * @type {MMInputSearchType}
   * @memberof IMMInputSearchProps
   */
  type?: MMInputSearchType

  /**
   * 站位词
   *
   * @type {string}
   * @memberof IMMInputSearchProps
   */
  placeholder?: string
  /**
   * 搜索文字
   *
   * @type {string}
   * @memberof IMMInputSearchProps
   */
  searchText?: string
  /**
   * 点击搜索
   *
   * @memberof IMMInputSearchProps
   */
  onSearch: (value: string) => void

  /**
   * 输入事件
   *
   * @memberof IMMInputSearchProps
   */
  onInput?: (event: BaseEventOrig<EventValue>) => void
}

/**
 * @name 搜索栏
 */
@autobind
export default class MMInputSearch extends PureComponent<IMMInputSearchProps> {
  static defaultProps = {
    placeholder: '请输入关键字',
    searchText: '搜索'
  }

  static options = {
    addGlobalClass: true
  }

  state = {
    focus: false,
    value: ''
  }

  get className() {
    const classnames = [styles.MMInputSearch]

    if (this.state.focus) {
      classnames.push(styles.MMInputSearch__focus)
    }

    if (this.props.type === MMInputSearchType.primary) {
      classnames.push(styles.MMInputSearch__primary)
    }

    return classnames
  }

  render() {
    return (
      <View className={classNames(...this.className)}>
        <View className={styles.content}>
            <Image src={SearchIcon} className={styles.icon} />
          <View className={styles.placeholder}>{this.props.placeholder}</View>
          <View className={classNames(styles.input_box, styles.input_box__focus)}>
            <Input maxlength={30} value={this.state.value} onFocus={this.onFocus} onInput={this.onInput} onBlur={this.onBlur} onConfirm={this.onSearch}   />
          </View>
        </View>
        <View className={styles.text} onClick={this.onSearch}>
          <View>{this.props.searchText}</View>
        </View>
      </View>
    )
  }

  private onFocus() {
    this.setState({ focus: true })
  }

  private onBlur() {
    if (this.state.value === '') {
      this.setState({ focus: false })
    }
  }

  private onSearch() {
    this.props.onSearch(this.state.value.trim())
  }

  private onInput(
    event: BaseEventOrig<{
      /** 输入值 */
      value: string
      /** 光标位置 */
      cursor: number
      /** 键值 */
      keyCode: number
    }>
  ) {
    this.props.onInput?.(event)
    this.setState({
      value: event.detail.value
    })
  }
}
