import Taro from '@tarojs/taro'
import { Component } from 'react'
import { autobind } from '@wmeimob/decorator'
import { View } from '@tarojs/components'
import MMNavigation from '~/components/navigation'
import { MMFeild, MMImageList } from '~/components'
import MMCell from '~/components/cell'

const imgPath = 'https://wmm-mock.oss-cn-shanghai.aliyuncs.com/mock/good'

@autobind
export default class Index extends Component<any, any> {
  state = {
    list: Array.from({ length: 3 }).map((_a, index) => imgPath + (index + 1) + '.png'),
    list4: Array.from({ length: 4 }).map((_a, index) => imgPath + (index + 1) + '.png')
  }

  render() {
    const { list, list4 } = this.state
    return (
      <View>
        <MMNavigation title="图片列表" />
        <View className="container">
          <MMImageList data={list} />

          <MMImageList data={list4} />

          <MMCell title="退货凭据" noStyle>
            <View style={{ width: '80%' }}>
              <MMImageList data={list4} />
            </View>
          </MMCell>
        </View>
      </View>
    )
  }
}
