import Taro from '@tarojs/taro'
import { FC, memo, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IToastProps } from './const'
import MMNavigation from '~/components/navigation'
import PageDemoBlock from '~/components/pageComponents/pageDemoBlock'
import MMToast from '~/components/toast'
import { IToastRef } from '~/components/toast/const'
import MMCell from '~/components/cell'
import MMIconFontName from '~/components/icon-font/const'
import category from './category.png'

const Component: FC<IToastProps> = () => {
  const toastRef = useRef<IToastRef>(null)

  const [count, setCount] = useState(0)

  const dynamicUpdate = () => {
    const toast = toastRef.current!.message({ message: '倒计时10s', icon: MMIconFontName.Smile })
    // eslint-disable-next-line no-shadow
    function update(count = 10) {
      // eslint-disable-next-line no-param-reassign
      --count
      toast.setMessage(`${count}s`)
      if (count > 0) {
        setTimeout(() => {
          update(count)
        }, 1000)
      }
    }

    update()
  }

  function countDown(time = 3) {
    setCount(time)
    if (time > 0) {
      setTimeout(() => {
        countDown(time - 1)
      }, 1000)
    } else {
      // 手动控制调用hide
      toastRef.current!.hideLoading()
    }
  }

  return (
    <View className={styles.toastStyle}>
      <MMNavigation title="toast 轻提示" />

      <MMToast ref={toastRef} />
      <PageDemoBlock title="介绍">在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。</PageDemoBlock>

      <PageDemoBlock title="介绍">
        <MMCell title="文字提示" arrow onClick={() => toastRef.current!.message('文字提示')} />
        <MMCell title="成功提示" arrow onClick={() => toastRef.current!.fail({ message: '失败啦' })} />
        <MMCell title="失败提示" arrow onClick={() => toastRef.current!.success({ message: '成功了' })} />
      </PageDemoBlock>

      <PageDemoBlock title="加载(loading)">
        <View>这个状态相比较上面的特殊之处在于loading在组件级里面只会存在一个</View>
        <View>loading状态下mask强制为true.也就是会阻止一切点击事件。所以你必须手动调用hideLoading方法</View>
        <MMCell
          title={'加载提示' + (count ? `${count}s后关闭` : '')}
          arrow
          onClick={() => {
            toastRef.current!.loading({ message: '加载中' })
            countDown(20)

            setTimeout(() => {
              Taro.navigateBack()
            }, 1000)
          }}
        />
      </PageDemoBlock>

      <PageDemoBlock title="动画模式">
        <MMCell title="淡入/淡出" arrow onClick={() => toastRef.current!.message({ message: 'fade' })} />
        <MMCell title="滑入/滑出" arrow onClick={() => toastRef.current!.message({ message: 'slideup', animationType: 'slideup' })} />
      </PageDemoBlock>

      <PageDemoBlock title="位置">
        <MMCell title="顶部" arrow onClick={() => toastRef.current!.message({ message: 'top', position: 'top' })} />
        <MMCell title="顶部slideup" arrow onClick={() => toastRef.current!.message({ message: 'top', position: 'top', animationType: 'slideup' })} />

        <MMCell title="居中" arrow onClick={() => toastRef.current!.message({ message: 'center', position: 'center' })} />

        <MMCell title="底部" arrow onClick={() => toastRef.current!.message({ message: 'bottom', position: 'bottom' })} />
        <MMCell title="底部slideup" arrow onClick={() => toastRef.current!.message({ message: 'top', position: 'bottom', animationType: 'slideup' })} />
      </PageDemoBlock>

      <PageDemoBlock title="自定义">
        <MMCell title="自定义图标" arrow onClick={() => toastRef.current!.message({ message: '哎嘿～', icon: MMIconFontName.Smile })} />
        <MMCell title="自定义图片" arrow onClick={() => toastRef.current!.message({ message: '哎嘿～', img: category })} />
      </PageDemoBlock>

      <PageDemoBlock title="动态更新">
        <View>调用messag方法之后。会返回一个toast实例。你可以调用setMessage方法更新问题内容</View>
        <MMCell title="动态更新" arrow onClick={dynamicUpdate} />
      </PageDemoBlock>
    </View>
  )
}

const Toast = memo(Component)
export default Toast
