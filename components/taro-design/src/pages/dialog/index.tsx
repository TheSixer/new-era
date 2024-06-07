import { memo, useState, FC } from 'react'
import { View } from '@tarojs/components'
import { IDialogProps } from './const'
import MMDialog from '~/components/dialog'
import MMNavigation from '~/components/navigation'
import MMButton from '~/components/button'
import PageDemoBlock from '~/components/pageComponents/pageDemoBlock'

const Component: FC<IDialogProps> = props => {
  const [visible, setVisible] = useState(false)
  const [cusVisible, setCusVisible] = useState(false)
  const [asyVisible, setAsyVisible] = useState(false)
  const [cancelisible, setCancelVisible] = useState(false)
  const [customVisible, setCustomVisible] = useState(false)

  return (
    <View>
      <MMNavigation>对话框</MMNavigation>

      <PageDemoBlock title="对话框">
        <MMButton onClick={() => setVisible(true)}>点击显示</MMButton>
        <MMDialog visible={visible} title="确认加入团队?" onOk={() => setVisible(false)} onCancel={() => setVisible(false)} />
      </PageDemoBlock>

      <PageDemoBlock title="自定义">
        <View>标题、按钮和按钮文本样式都可以修改</View>
        <MMButton onClick={() => setCusVisible(true)}>点击显示</MMButton>
        <MMDialog
          visible={cusVisible}
          title={
            <View>
              <View>一旦加入后不可解绑，</View>
              <View>确认同意该团队邀请？</View>
            </View>
          }
          okText="欣然接受"
          okColor="#F18300"
          cancelText="狠心拒绝"
          cancelColor="red"
          onOk={() => setCusVisible(false)}
          onCancel={() => setCusVisible(false)}
        />
      </PageDemoBlock>

      <PageDemoBlock title="异步关闭">
        <View>可以在点击确定时设置为异步处理</View>
        <MMButton onClick={() => setAsyVisible(true)}>点击显示</MMButton>
        <MMDialog
          visible={asyVisible}
          title="是否加入收藏"
          okLoading
          onOk={async () => {
            await new Promise<void>(resolve => {
              setTimeout(() => {
                resolve()
                setAsyVisible(false)
              }, 1000)
            })
          }}
          onCancel={() => setAsyVisible(false)}
        >
          生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。
        </MMDialog>
      </PageDemoBlock>

      <PageDemoBlock title="不显示取消">
        <MMButton onClick={() => setCancelVisible(true)}>点击显示</MMButton>
        <MMDialog
          visible={cancelisible}
          title="这个弹窗不显示取消"
          cancel={false}
          onOk={() => setCancelVisible(false)}
          onCancel={() => setCancelVisible(false)}
        />
      </PageDemoBlock>

      <PageDemoBlock title="自定义底部">
        <MMButton onClick={() => setCustomVisible(true)}>点击显示</MMButton>
        <MMDialog
          visible={customVisible}
          title="这个弹窗不显示取消"
          footer={
            <MMButton block onClick={() => setCustomVisible(false)}>
              点击确定
            </MMButton>
          }
        />
      </PageDemoBlock>
    </View>
  )
}

const MMDialogPage = memo(Component)
export default MMDialogPage
