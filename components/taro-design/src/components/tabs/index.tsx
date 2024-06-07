import { ScrollView, View } from '@tarojs/components'
import { PureComponent } from 'react'
import { autobind } from '@wmeimob/decorator'
import styles from './index.module.less'
import classNames from 'classnames'
import { MMTabsType } from './const'

interface IMMTabBarProps {
  /**
   * 标签页
   *
   * @type {string[]}
   * @memberof IMMTabBarProps
   */
  data?: string[]

  /**
   * 选中
   *
   * @type {number}
   * @memberof IMMTabBarProps
   */
  selectedIndex?: number

  /**
   * 改变事件 如果selectedIndex 未改变不触发
   *
   * @memberof IMMTabBarProps
   */
  onChange?: (index: number) => void

  /**
   * 点击事件
   *
   * @memberof IMMTabBarProps
   */
  onClick?: (index: number) => void

  /**
   * 导航类型
   *
   * @type {MMTabsType}
   * @memberof IMMTabBarProps
   */
  type?: MMTabsType
}

export interface IMMTabState {
  /**
   * 滚动的item ID
   */
  toView: string
}

/**
 * @name 标签页
 */
@autobind
export default class MMTabs extends PureComponent<IMMTabBarProps, IMMTabState> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps: Partial<IMMTabBarProps> = {
    data: []
  }

  state: IMMTabState = {
    toView: `tab${this.props.selectedIndex}`
  }

  get className() {
    const classnames = [styles.MMTabs]

    switch (this.props.type) {
      case MMTabsType.Circle:
        classnames.push(styles.MMTabs__circle)
        break
      case MMTabsType.Button:
        classnames.push(styles.MMTabs__button)
        break
      case MMTabsType.Scroll:
        classnames.push(styles.MMTabs__scroll)
        break
    }

    return classNames(...classnames)
  }

  render() {
    const { data = [], selectedIndex = 0, type } = this.props
    const { toView } = this.state
    return (
      <View className={this.className}>
        {type !== MMTabsType.Scroll && (
          <View className={styles.content}>
            {data?.map((value, index) => (
              <View key={value + index} className={classNames(styles.item, selectedIndex === index ? styles.selected : {})} onClick={() => this.onClick(index)}>
                {value}
              </View>
            ))}
            {!type && (
              <View
                className={styles.line}
                style={{
                  left: (100 / data.length) * (0.5 + selectedIndex) + '%'
                }}
              />
            )}
          </View>
        )}
        {type === MMTabsType.Scroll && (
          <ScrollView scrollX={true} scrollIntoView={toView} scrollWithAnimation={true}>
            <View className={styles.content}>
              {data?.map((value, index) => (
                <View
                  key={value + index}
                  id={'tab' + index}
                  className={classNames(styles.item, selectedIndex === index ? styles.selected : {})}
                  onClick={() => this.onClick(index)}
                >
                  {value}
                  <View className={styles.line} />
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    )
  }

  private onClick(index) {
    const { selectedIndex, onChange, onClick } = this.props
    if (selectedIndex !== index) {
      onChange?.(index)
    }

    onClick?.(index)

    this.setState({
      toView: `tab${index}`
    })
  }
}
