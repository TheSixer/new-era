import { View } from '@tarojs/components'
import Navigation from '~/components/navigation/index'
import MMRadio from '../../components/radio'
import PageDemoBlock from '~/components/pageComponents/pageDemoBlock'
import { useState } from 'react'

export default () => {
  const [checked, setChecked] = useState(false)

  const [value, setValue] = useState(1)

  return (
    <View>
      <Navigation title="单选框" />

      <View className="container">
        <PageDemoBlock title="单个使用">
          <MMRadio checked={checked} onChange={setChecked}>
            单选
          </MMRadio>
        </PageDemoBlock>

        <PageDemoBlock title="搭配Group使用">
          <MMRadio.Group value={value} onChange={setValue}>
            <MMRadio value={1}>单选1</MMRadio>
            <MMRadio value={2}>单选2</MMRadio>
            <MMRadio value={3}>单选3</MMRadio>
          </MMRadio.Group>
        </PageDemoBlock>

        <PageDemoBlock title="水平排列">
          <MMRadio.Group value={value} onChange={setValue} direction="horizontal">
            <MMRadio value={1}>单选1</MMRadio>
            <MMRadio value={2}>单选2</MMRadio>
            <MMRadio value={3}>单选3</MMRadio>
          </MMRadio.Group>
        </PageDemoBlock>

        <PageDemoBlock title="禁用">
          <MMRadio.Group value={value} onChange={setValue}>
            <MMRadio value={1}>单选1</MMRadio>
            <MMRadio value={2} disabled>
              单选2
            </MMRadio>
            <MMRadio value={3}>单选3</MMRadio>
          </MMRadio.Group>
        </PageDemoBlock>

        <PageDemoBlock title="按钮样式">
          <MMRadio.Group value={value} optionType="button" onChange={setValue}>
            <MMRadio value={1}>单选1</MMRadio>
            <MMRadio value={2} disabled>
              单选2
            </MMRadio>
            <MMRadio value={3}>单选3</MMRadio>
          </MMRadio.Group>
        </PageDemoBlock>
      </View>
    </View>
  )
}
