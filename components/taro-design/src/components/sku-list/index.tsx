import { View } from '@tarojs/components'
import { PureComponent } from 'react'
import { autobind } from '@wmeimob/decorator'
import classname from 'classnames'
import styles from './index.module.less'
import H6 from '../head/h6'

type IMMSkuId = string | number
export interface IMMSkuList<ID extends IMMSkuId = string> {
  title: string
  items: IMMSkuItem<ID>[]
}

export interface IMMSkuItem<ID extends IMMSkuId = string> {
  id: ID
  text: string
}

export interface IMMSkuListProps<ID extends IMMSkuId = string> {
  /**
   * 选中
   */
  value?: number[]
  /**
   * 库存
   */
  sku?: number[][]
  /**
   * 列表
   */
  list?: IMMSkuList<ID>[]

  /**
   * 点击事件
   */
  onClick?: (value: ID[]) => void
}

/**
 * @name 规格列表
 */
@autobind
export default class MMSkuList<ID extends IMMSkuId = string> extends PureComponent<IMMSkuListProps<ID>> {
  static defaultProps = {
    sku: [],
    value: [],
    list: []
  }

  static options = {
    addGlobalClass: true
  }

  render() {
    const { list } = this.props
    return (
      <View className={styles.MMSkuList}>
        {list?.map((listValue, index) => (
          <View key={'list' + index}>
            <View className="spacingBig" />
            <H6>{listValue.title}</H6>
            <View className="spacingBig" />
            <View className={styles.content}>
              {listValue.items.map((item) => (
                <View key={item.id} className={this.getItemClassName(item, index)} onClick={() => this.onClick(item, index)}>
                  <View className={styles.item_text}>{item.text}</View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    )
  }

  private onClick(item: IMMSkuItem, index: number) {
    if (!this.skuInclude(item.id, index)) {
      return
    }
    const { value } = this.props
    if (!value) return
    if (value.includes(item.id)) {
      const values = [...this.props.value]
      delete values[index]
      this.props.onClick?.(values)
    } else {
      const values = [...this.props.value]
      values[index] = item.id
      this.props.onClick?.(values)
    }
  }

  private getItemClassName(item: IMMSkuItem, index: number) {
    const classNames = [styles.item]
    if (!this.skuInclude(item.id, index)) {
      classNames.push(styles.item__disabled)
    }
    if (!this.props.value) return ''
    if (this.props.value.includes(item.id)) {
      classNames.push(styles.item__selected)
    }
    return classname(...classNames)
  }

  private skuInclude(id: string, index: number) {
    const includeArray = [...this.props.value]
    includeArray[index] = id
    if (this.props?.sku) {
      return Boolean(this.props.sku.find((value) => this.arrayInclude(value, includeArray)))
    }
  }

  private arrayInclude(array: string[], includeArray: string[]) {
    if (includeArray.length > 0) {
      return includeArray.every((value) => (value === undefined ? true : array.includes(value)))
    }
    return true
  }
}
