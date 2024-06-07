import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { autobind } from '@wmeimob/decorator'
import MMIconFont, { IMMIconfontProps } from '../icon-font'
import themes from '../styles/themes/default.modules.less'
import IconFontName from '~/components/icon-font/const'

@autobind
export default class MMItemLeftIconfont extends PureComponent<Partial<IMMIconfontProps>> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    color: themes.gray5,
    value: IconFontName.Admin
  }

  state = {}

  render() {
    return <MMIconFont {...(this.props as IMMIconfontProps)} />
  }
}
