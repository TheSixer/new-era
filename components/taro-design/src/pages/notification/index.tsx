import { useRef } from 'react'
import { View, Image } from '@tarojs/components'
import styles from './index.module.less'
import MMNavigation from '../../components/navigation'
import PageDemoBlock from '../../components/pageComponents/pageDemoBlock'
import MMNotification from '../../components/notification'
import { IMMNotificationRef } from '../../components/notification/const'
import MMCell from '../../components/cell'
import category from './category.png'

export default () => {
  const toastRef = useRef<IMMNotificationRef>(null)

  return (
    <View className={styles.toastStyle}>
      <MMNavigation title="notification 消息通知" />

      <MMNotification ref={toastRef} />

      <PageDemoBlock title="介绍">
        全局展示通知提醒信息。
        <View>
          <View>在系统四个角显示通知提醒信息。经常用于以下情况：</View>
          <View>较为复杂的通知内容。</View>
          <View>带有交互的通知，给出用户下一步的行动点。</View>
          <View>系统主动推送。</View>
        </View>
      </PageDemoBlock>

      <PageDemoBlock title="介绍">
        <MMCell title="文字提示" arrow onClick={() => toastRef.current!.open({ title: '文字提示' })} />
        <MMCell title="带内容" arrow onClick={() => toastRef.current!.open({ title: '新消息', content: '您有一笔新的订单，请及时处理' })} />
        <MMCell title="成功提示" arrow onClick={() => toastRef.current!.success({ title: '成功了', content: '操作成功！' })} />
        <MMCell title="失败提示" arrow onClick={() => toastRef.current!.fail({ title: '失败啦' })} />
      </PageDemoBlock>

      <PageDemoBlock title="持续时间">
        <View>通知默认持续4.5s,如果设置为null则不退出</View>
        <MMCell title="手动关闭" arrow onClick={() => toastRef.current!.fail({ title: '需要手动关闭', duration: null })} />
      </PageDemoBlock>

      <PageDemoBlock title="动画模式">
        <MMCell title="淡入/淡出" arrow onClick={() => toastRef.current!.open({ title: 'fade', animationType: 'fade' })} />
        <MMCell title="滑入/滑出" arrow onClick={() => toastRef.current!.open({ title: 'slideup', animationType: 'slideup' })} />
      </PageDemoBlock>

      <PageDemoBlock title="位置">
        <MMCell title="顶部" arrow onClick={() => toastRef.current!.open({ title: 'top', position: 'top' })} />
        <MMCell title="顶部slideup" arrow onClick={() => toastRef.current!.open({ title: 'top', position: 'top', animationType: 'slideup' })} />

        <MMCell title="居中" arrow onClick={() => toastRef.current!.open({ title: 'center', position: 'center' })} />

        <MMCell title="底部" arrow onClick={() => toastRef.current!.open({ title: 'bottom', position: 'bottom' })} />
        <MMCell title="底部slideup" arrow onClick={() => toastRef.current!.open({ title: 'top', position: 'bottom', animationType: 'slideup' })} />
      </PageDemoBlock>

      <PageDemoBlock title="自定义">
        <MMCell
          title="自定义icon"
          arrow
          onClick={() =>
            toastRef.current!.open({
              icon: <Image src={category} style={{ width: 30, height: 30 }}></Image>,
              title: '哎嘿～',
              content: '这是自定义的图标'
            })
          }
        />
      </PageDemoBlock>
    </View>
  )
}
